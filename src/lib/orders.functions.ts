import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { postLeadToSlack } from "./slack.server";

const OrderInput = z.object({
  customer_name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(30),
  address: z.string().trim().min(1).max(300),
  notes: z.string().trim().max(1000).optional(),
  items: z.array(z.object({ id: z.string().max(60), name: z.string().max(120), quantity: z.number().int().positive().max(1_000_000), unit: z.string().max(20), price: z.string().max(30) })).min(1).max(30),
});

// Public: saves a WhatsApp order so it appears in the owner's order list.
export const saveWhatsAppOrder = createServerFn({ method: "POST" })
  .inputValidator((d) => OrderInput.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("orders").insert({ ...data, notes: data.notes ?? null, source: "whatsapp" });
    if (error) throw new Error("Could not save order");
    await postLeadToSlack("New WhatsApp order", {
      Name: data.customer_name,
      Phone: data.phone,
      Address: data.address,
      Items: data.items.map((i) => `${i.quantity} ${i.unit} ${i.name}`).join(", "),
      Notes: data.notes,
    });
    return { ok: true };
  });
