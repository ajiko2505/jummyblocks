import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { candidateSlots, isFree, isValidSlot } from "./slots";
import { getBusy, calFetch } from "./calendar.server";
import { postLeadToSlack } from "./slack.server";

export const getFreeSlots = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const all = candidateSlots(new Date());
    if (!all.length) return { slots: [] as string[] };
    const busy = await getBusy(all[0]!, new Date(new Date(all[all.length - 1]!).getTime() + 3600_000).toISOString());
    return { slots: all.filter((s) => isFree(s, busy)) };
  } catch {
    return { slots: [] as string[], error: "unavailable" };
  }
});

const BookInput = z.object({
  start: z.string().datetime(),
  type: z.enum(["Site visit", "Delivery", "Consultation"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
  notes: z.string().trim().max(1000).optional(),
});

export const bookSlot = createServerFn({ method: "POST" })
  .inputValidator((d) => BookInput.parse(d))
  .handler(async ({ data }) => {
    if (!isValidSlot(data.start, new Date())) return { ok: false as const, error: "That time isn't available. Please pick another." };
    const end = new Date(new Date(data.start).getTime() + 3600_000).toISOString();
    const busy = await getBusy(data.start, end);
    if (!isFree(data.start, busy)) return { ok: false as const, error: "Someone just booked that time. Please pick another." };
    const ev = await calFetch("/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all", {
      method: "POST",
      body: JSON.stringify({
        summary: `Jummy Blocks — ${data.type} with ${data.name}`,
        description: `Booked on the Jummy Blocks website.\nPhone: ${data.phone}\n${data.notes ? `Notes: ${data.notes}` : ""}`,
        start: { dateTime: data.start, timeZone: "Africa/Lagos" },
        end: { dateTime: end, timeZone: "Africa/Lagos" },
        attendees: [{ email: data.email, displayName: data.name }],
        conferenceData: { createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: "hangoutsMeet" } } },
      }),
    });
    const meet: string | undefined = ev.hangoutLink;
    await postLeadToSlack("New booking", {
      Type: data.type,
      When: new Date(data.start).toLocaleString("en-NG", { timeZone: "Africa/Lagos", dateStyle: "full", timeStyle: "short" }),
      Name: data.name, Phone: data.phone, Email: data.email, Notes: data.notes, "Meet link": meet,
    });
    return { ok: true as const, meet: meet ?? null };
  });
