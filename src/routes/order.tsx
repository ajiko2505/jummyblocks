import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { waLink } from "@/lib/site";
import { useServerFn } from "@tanstack/react-start";
import { saveWhatsAppOrder } from "@/lib/orders.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/order")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Order on WhatsApp — Jummy Blocks" },
      { name: "description", content: "Send your Jummy Blocks order on WhatsApp: pick products, quantities and delivery address." },
      { property: "og:title", content: "Order on WhatsApp — Jummy Blocks" },
      { property: "og:description", content: "Pick your blocks and pavers and send the order straight to us on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderPage,
});

const field = "w-full rounded-sm border bg-background px-3 py-2.5 text-sm";

function OrderPage() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const chosen = products.filter((p) => (qty[p.id] ?? 0) > 0);

  const save = useServerFn(saveWhatsAppOrder);
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    save({ data: { customer_name: name, phone, address, notes: notes || undefined, items: chosen.map((p) => ({ id: p.id, name: p.name, quantity: qty[p.id], unit: p.unit, price: p.price })) } }).catch(() => toast.error("Order not saved, but WhatsApp will still open"));
    const lines = chosen.map((p) => `• ${p.name} × ${qty[p.id]} ${p.unit} (${p.price}/${p.unit})`).join("\n");
    const msg = `Hello Jummy Blocks, I'd like to place an order:\n\n${lines}\n\nName: ${name}\nPhone: ${phone}\nDelivery address: ${address}${notes ? `\nNotes: ${notes}` : ""}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">WhatsApp orders</p>
      <h1 className="text-4xl font-extrabold tracking-tight">Order on WhatsApp</h1>
      <p className="mt-3 text-muted-foreground">Enter quantities, add your details, and we'll confirm price and delivery on WhatsApp.</p>
      <form onSubmit={send} className="mt-8 space-y-6">
        <div className="divide-y rounded-md border bg-card">
          {products.map((p) => (
            <label key={p.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <span><span className="font-semibold">{p.name}</span><span className="block font-mono text-xs text-muted-foreground">{p.price}/{p.unit}</span></span>
              <input type="number" min={0} aria-label={`Quantity of ${p.name}`} value={qty[p.id] ?? ""} onChange={(e) => setQty({ ...qty, [p.id]: Math.max(0, Number(e.target.value)) })} className={`${field} w-24`} placeholder="0" />
            </label>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">Full name<input required value={name} onChange={(e) => setName(e.target.value)} className={`${field} mt-1`} /></label>
          <label className="text-sm font-semibold">Phone<input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={`${field} mt-1`} /></label>
        </div>
        <label className="block text-sm font-semibold">Delivery address<input required value={address} onChange={(e) => setAddress(e.target.value)} className={`${field} mt-1`} /></label>
        <label className="block text-sm font-semibold">Notes (optional)<textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={`${field} mt-1`} /></label>
        <button disabled={chosen.length === 0} className="w-full rounded-sm bg-safety px-6 py-3 font-semibold text-safety-foreground hover:bg-safety/85 disabled:opacity-50">Send order on WhatsApp</button>
      </form>
    </div>
  );
}
