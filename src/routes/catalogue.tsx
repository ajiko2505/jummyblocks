import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products, categories } from "@/lib/products";

export const Route = createFileRoute("/catalogue")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Buy Interlocking Stones, Paving Stones & Blocks in Lagos | Jummy Blocks" },
      { name: "description", content: "Shop 60mm and 80mm interlocks, hex pavers, slabs, 6\" and 9\" sandcrete blocks and kerbs with full specs and Naira prices. Delivery across Lagos." },
      { property: "og:title", content: "Interlocking Stones, Paving Stones & Blocks — Lagos Prices" },
      { property: "og:description", content: "Full specs and Naira prices for interlocks, pavers, blocks and kerbs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalogue,
});

const cats = categories;

function Catalogue() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Catalogue</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Every block, graded.</h1>
      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-sm border px-4 py-2 text-sm font-semibold ${cat === c ? "border-ink bg-ink text-ink-foreground" : "hover:bg-card"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <div key={p.id} className="flex flex-col overflow-hidden rounded-md border bg-card">
            <Link to="/products/$id" params={{ id: p.id }}><img src={p.image} alt={p.name} loading="lazy" width={944} height={704} className="aspect-[4/3] w-full object-cover" /></Link>
            <div className="flex flex-1 flex-col p-5">
              <p className="font-mono text-xs text-muted-foreground">{p.category}</p>
              <div className="mt-1 flex items-start justify-between gap-3">
                <Link to="/products/$id" params={{ id: p.id }} className="font-bold hover:text-safety">{p.name}</Link>
                <span className="shrink-0 font-mono text-sm font-semibold">{p.price}<span className="text-muted-foreground">/{p.unit}</span></span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-y-1 border-t pt-4 font-mono text-xs">
                <dt className="text-muted-foreground">Size</dt><dd className="text-right">{p.size}</dd>
                <dt className="text-muted-foreground">Strength</dt><dd className="text-right">{p.strength}</dd>
                <dt className="text-muted-foreground">Best for</dt><dd className="text-right">{p.bestFor}</dd>
              </dl>
              <Link to="/products/$id" params={{ id: p.id }} className="mt-5 rounded-sm border border-foreground py-2.5 text-center text-sm font-semibold hover:bg-ink hover:text-ink-foreground">View product &amp; buy</Link>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-xs text-muted-foreground">* Prices are indicative, ex-delivery. Final quote confirms volume and site access.</p>
    </div>
  );
}
