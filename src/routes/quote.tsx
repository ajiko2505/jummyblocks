import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { products } from "@/lib/products";
import { useServerFn } from "@tanstack/react-start";
import { notifyLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/quote")({
  staticData: { sitemap: true },
  validateSearch: z.object({ product: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Request a Quote — Jummy Blocks" },
      { name: "description", content: "Send your block type, quantity and site location for a firm quote and delivery estimate." },
      { property: "og:title", content: "Request a Quote — Jummy Blocks" },
      { property: "og:description", content: "Get a firm price on blocks, interlocks and kerbs delivered to your site." },
    ],
  }),
  component: Quote,
});

const field = "mt-1 h-11 w-full rounded-sm border bg-background px-3 text-sm outline-none focus:border-safety";

function Quote() {
  const { product } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const notify = useServerFn(notifyLead);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    setBusy(true); setErr("");
    try {
      await notify({ data: { kind: "quote", name: g("name"), phone: g("phone"), location: g("location"), product: products.find((p) => p.id === g("product"))?.name, quantity: g("quantity") } });
      setSent(true);
    } catch {
      setErr("Sorry, that didn't send. Please try again or message us on WhatsApp.");
    } finally { setBusy(false); }
  }
  return (
    <section className="blueprint-grid bg-blueprint text-blueprint-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">Quote request</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">Tell us your site, get a price in hours.</h1>
          <p className="mt-4 max-w-md text-blueprint-foreground/70">We confirm stock, delivery and a firm quote — usually within 4 working hours.</p>
          <div className="mt-8 flex flex-wrap gap-6 font-mono text-sm text-blueprint-foreground/70">
            <span>✓ Lagos & nationwide</span><span>✓ Graded products</span><span>✓ No obligation</span>
          </div>
        </div>
        <div className="rounded-md bg-card p-6 text-card-foreground shadow-2xl">
          {sent ? (
            <div className="py-10 text-center">
              <p className="eyebrow">Received</p>
              <h2 className="mt-2 text-2xl font-extrabold">Thank you!</h2>
              <p className="mt-2 text-muted-foreground">We'll contact you shortly with your quote.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid grid-cols-2 gap-4">
              <label className="col-span-2"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Full name</span><input name="name" required maxLength={120} className={field} /></label>
              <label className="col-span-2 sm:col-span-1"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Phone</span><input name="phone" required maxLength={30} type="tel" className={field} /></label>
              <label className="col-span-2 sm:col-span-1"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Location</span><input name="location" required maxLength={150} placeholder="Lekki, Lagos" className={field} /></label>
              <label className="col-span-2"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Product</span>
                <select name="product" defaultValue={product ?? products[0]?.id} className={field}>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </label>
              <label className="col-span-2"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Quantity</span><input name="quantity" required maxLength={120} placeholder="e.g. 1,000 blocks or 200 m²" className={field} /></label>
              {err && <p className="col-span-2 text-sm text-destructive">{err}</p>}
              <button disabled={busy} className="col-span-2 mt-1 rounded-sm bg-ink py-3 font-semibold text-ink-foreground hover:bg-safety disabled:opacity-50">{busy ? "Sending…" : "Send quote request"}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
