import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { postLeadToSlack } from "./slack.server";

const s = (max: number) => z.string().trim().max(max).optional();

const LeadInput = z.object({
  kind: z.enum(["quote", "advisor"]),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(30),
  email: s(255),
  location: s(150),
  product: s(120),
  quantity: s(120),
  budget: s(60),
  timeline: s(60),
  project: s(2000),
  suggested: s(500),
});

// Public: notifies the owner in Slack when a visitor submits a lead form.
export const notifyLead = createServerFn({ method: "POST" })
  .inputValidator((d) => LeadInput.parse(d))
  .handler(async ({ data }) => {
    await postLeadToSlack(data.kind === "quote" ? "New quote request" : "New Advisor enquiry", {
      Name: data.name,
      Phone: data.phone,
      Email: data.email,
      Location: data.location,
      Product: data.product,
      Quantity: data.quantity,
      Budget: data.budget,
      Timeline: data.timeline,
      Project: data.project,
      "Advisor suggested": data.suggested,
    });
    return { ok: true };
  });
