import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getFreeSlots, bookSlot } from "@/lib/booking.functions";

const slotsQuery = queryOptions({ queryKey: ["free-slots"], queryFn: () => getFreeSlots(), staleTime: 60_000 });

export const Route = createFileRoute("/book")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Book a Time — Jummy Blocks" },
      { name: "description", content: "Pick a free time for a site visit, delivery or video consultation with Jummy Blocks. A Google Meet link comes with your invite." },
      { property: "og:title", content: "Book a Time — Jummy Blocks" },
      { property: "og:description", content: "Book a site visit, delivery or video consultation in Lagos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(slotsQuery),
  component: Book,
});

const tz = "Africa/Lagos";
const dayKey = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: tz });
const dayLabel = (iso: string) => new Date(iso).toLocaleDateString("en-NG", { timeZone: tz, weekday: "short", day: "numeric", month: "short" });
const timeLabel = (iso: string) => new Date(iso).toLocaleTimeString("en-NG", { timeZone: tz, hour: "numeric", minute: "2-digit" });

const inp = "mt-1 h-11 w-full rounded-sm border bg-background px-3 text-sm outline-none focus:border-safety";
const lbl = "font-mono text-xs uppercase tracking-wider text-muted-foreground";

function Book() {
  const { data } = useSuspenseQuery(slotsQuery);
  const qc = useQueryClient();
  const book = useServerFn(bookSlot);
  const days = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const s of data.slots) m.set(dayKey(s), [...(m.get(dayKey(s)) ?? []), s]);
    return [...m.entries()];
  }, [data.slots]);
  const [day, setDay] = useState(days[0]?.[0] ?? "");
  const [slot, setSlot] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState<{ meet: string | null; when: string } | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    setBusy(true); setErr("");
    try {
      const r = await book({ data: { start: slot, type: g("type") as "Site visit", name: g("name"), email: g("email"), phone: g("phone"), notes: g("notes") || undefined } });
      if (!r.ok) { setErr(r.error); setSlot(""); qc.invalidateQueries({ queryKey: ["free-slots"] }); }
      else setDone({ meet: r.meet, when: `${dayLabel(slot)}, ${timeLabel(slot)}` });
    } catch {
      setErr("Sorry, the booking didn't go through. Please try again or message us on WhatsApp.");
    } finally { setBusy(false); }
  }

  const daySlots = days.find(([k]) => k === day)?.[1] ?? [];

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Book a time</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Pick a free slot.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">Site visits, deliveries or a video call — Monday to Saturday, 8am to 5pm (Lagos time). You'll get a calendar invite with a Google Meet link.</p>

      {done ? (
        <div className="mt-10 rounded-md bg-blueprint p-6 text-blueprint-foreground">
          <p className="eyebrow mb-1">Booked</p>
          <h2 className="text-2xl font-extrabold">You're booked for {done.when}.</h2>
          <p className="mt-2 text-sm text-blueprint-foreground/80">Check your email for the calendar invite.</p>
          {done.meet && <a href={done.meet} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-sm bg-safety px-5 py-3 text-sm font-semibold text-safety-foreground">Open Google Meet link</a>}
        </div>
      ) : data.error || days.length === 0 ? (
        <p className="mt-10 rounded-sm border p-5 text-sm">{data.error ? "Booking is unavailable right now." : "No free times in the next two weeks."} Please message us on WhatsApp instead.</p>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {days.map(([k, s]) => (
                <button key={k} type="button" onClick={() => { setDay(k); setSlot(""); }}
                  className={`shrink-0 rounded-sm border px-4 py-3 text-sm font-semibold ${k === day ? "border-safety bg-safety text-safety-foreground" : "bg-card hover:bg-background"}`}>
                  {dayLabel(s[0]!)}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {daySlots.map((s) => (
                <button key={s} type="button" onClick={() => setSlot(s)} aria-pressed={s === slot}
                  className={`rounded-sm border py-3 font-mono text-sm ${s === slot ? "border-ink bg-ink text-ink-foreground" : "bg-card hover:border-safety"}`}>
                  {timeLabel(s)}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4 rounded-md border bg-card p-5">
            <p className="font-bold">{slot ? `${dayLabel(slot)}, ${timeLabel(slot)}` : "Choose a time first"}</p>
            <label className="block"><span className={lbl}>What for *</span>
              <select name="type" className={inp}><option>Site visit</option><option>Delivery</option><option>Consultation</option></select>
            </label>
            <label className="block"><span className={lbl}>Full name *</span><input name="name" required maxLength={120} className={inp} /></label>
            <label className="block"><span className={lbl}>Email (for the invite) *</span><input name="email" type="email" required maxLength={255} className={inp} /></label>
            <label className="block"><span className={lbl}>Phone *</span><input name="phone" type="tel" required maxLength={30} className={inp} /></label>
            <label className="block"><span className={lbl}>Site address / notes</span><textarea name="notes" rows={3} maxLength={1000} className="mt-1 w-full resize-none rounded-sm border bg-background p-3 text-sm outline-none focus:border-safety" /></label>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <button disabled={!slot || busy} className="w-full rounded-sm bg-ink py-3 font-semibold text-ink-foreground hover:bg-safety disabled:opacity-50">{busy ? "Booking…" : "Confirm booking"}</button>
          </form>
        </div>
      )}
    </div>
  );
}
