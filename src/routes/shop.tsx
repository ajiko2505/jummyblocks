import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories, type Product } from "@/lib/products";
import { site, waLink } from "@/lib/site";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Products — Jummy Blocks" },
      { name: "description", content: "Browse every interlock, paver, slab, block and kerb Jummy Blocks sells, with photos, key specs and Naira prices." },
      { property: "og:title", content: "Shop All Products — Jummy Blocks" },
      { property: "og:description", content: "Every product with photos, specs and prices. Order on WhatsApp or online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const num = (price: string) => Number(price.replace(/[^\d]/g, "")) || 0;
const sorts = { featured: "Featured", low: "Price: low to high", high: "Price: high to low", name: "Name A–Z" } as const;

function Shop() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<keyof typeof sorts>("featured");

  const list = useMemo(() => {
    let l = products.filter((p) => (cat === "All" || p.category === cat) &&
      `${p.name} ${p.bestFor} ${p.category}`.toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") l = [...l].sort((a, b) => num(a.price) - num(b.price));
    if (sort === "high") l = [...l].sort((a, b) => num(b.price) - num(a.price));
    if (sort === "name") l = [...l].sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [cat, q, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-3">Shop</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Everything we sell.</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Browse photos, specs and prices. Not sure which fits? <Link to="/advisor" className="font-semibold text-foreground underline underline-offset-4 hover:text-safety">Ask the Advisor</Link>.</p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">{list.length} of {products.length} products</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search e.g. driveway, kerb, 9 inch…" aria-label="Search products"
          className="h-11 flex-1 rounded-sm border bg-card px-4 text-sm outline-none focus:border-ink" />
        <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} aria-label="Sort products"
          className="h-11 rounded-sm border bg-card px-3 text-sm">
          {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-sm border px-4 py-2 text-sm font-semibold ${cat === c ? "border-ink bg-ink text-ink-foreground" : "hover:bg-card"}`}>{c}</button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No products match. Try another search.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ShopCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}

function ShopCard({ p }: { p: Product }) {
  const buy = p.buyUrl || site.shopUrl;
  const msg = `Hello Jummy Blocks, I'd like to order ${p.name} (${p.price}/${p.unit}). Please share availability and delivery cost.`;
  const specs: [string, string][] = [["Size", p.size], ["Strength", p.strength], ["Traffic", p.traffic], ["Best for", p.bestFor]];
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border bg-card transition-shadow hover:shadow-lg">
      <Link to="/products/$id" params={{ id: p.id }} className="relative overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" width={944} height={704} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-sm bg-ink px-2 py-1 font-mono text-[11px] text-ink-foreground">{p.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <Link to="/products/$id" params={{ id: p.id }} className="font-bold leading-snug hover:text-safety">{p.name}</Link>
          <p className="shrink-0 text-right font-mono text-base font-bold">{p.price}<span className="block text-xs font-normal text-muted-foreground">per {p.unit}</span></p>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t pt-4 text-sm">
          {specs.map(([k, v]) => (
            <div key={k}><dt className="font-mono text-[11px] uppercase text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
          ))}
        </dl>
        <div className="mt-5 flex gap-2 pt-1">
          {buy ? (
            <a href={buy} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-sm bg-safety px-4 py-2.5 text-center text-sm font-semibold text-safety-foreground hover:bg-safety/85">Buy now</a>
          ) : (
            <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-sm bg-safety px-4 py-2.5 text-center text-sm font-semibold text-safety-foreground hover:bg-safety/85">Order on WhatsApp</a>
          )}
          <Link to="/products/$id" params={{ id: p.id }} className="rounded-sm border px-4 py-2.5 text-sm font-semibold hover:bg-background">Details</Link>
        </div>
      </div>
    </article>
  );
}
