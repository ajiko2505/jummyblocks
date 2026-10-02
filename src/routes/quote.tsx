import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { products } from "@/lib/products";

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
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid grid-cols-2 gap-4">
              <label className="col-span-2"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Full name</span><input required className={field} /></label>
              <label className="col-span-2 sm:col-span-1"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Phone</span><input required type="tel" className={field} /></label>
              <label className="col-span-2 sm:col-span-1"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Location</span><input required placeholder="Lekki, Lagos" className={field} /></label>
              <label className="col-span-2"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Product</span>
                <select defaultValue={product ?? products[0]?.id} className={field}>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </label>
              <label className="col-span-2"><span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Quantity</span><input required placeholder="e.g. 1,000 blocks or 200 m²" className={field} /></label>
              <button className="col-span-2 mt-1 rounded-sm bg-ink py-3 font-semibold text-ink-foreground hover:bg-safety">Send quote request</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
