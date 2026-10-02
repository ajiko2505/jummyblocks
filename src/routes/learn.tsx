import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/learn")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Learn Hub — Jummy Blocks" },
      { name: "description", content: "Plain-language guides to paving stones, interlocks, sandcrete blocks, kerbs and heavy-duty paving." },
      { property: "og:title", content: "Learn Hub — Jummy Blocks" },
      { property: "og:description", content: "Understand paving stones and blocks before you buy." },
    ],
  }),
  component: Learn,
});

const guides = [
  { t: "What are paving stones?", b: "Paving stones are factory-made concrete units pressed and vibrated into shape, then cured. They sit on a compacted sand bed so the surface can flex without cracking — unlike poured concrete." },
  { t: "Interlock vs ordinary paving", b: "Interlocks have shaped edges that lock into neighbours. Loads spread across many stones, so they resist shifting under car and truck tyres. Use 60mm for foot traffic and 80mm+ for vehicles." },
  { t: "Hollow vs solid blocks", b: "Hollow blocks are lighter and cheaper per wall area, ideal for most walls. Solid blocks are denser and stronger — used where heavy point loads, security or soundproofing matter." },
  { t: '6" vs 9" sandcrete blocks', b: '9" blocks are standard for external and load-bearing walls. 6" blocks suit internal partitions. Never use 6" where the structural drawing specifies 9".' },
  { t: "How to spot a weak block", b: "Press a coin edge into the face — a good block barely scratches. Dropped from waist height onto sand, it should not break. Crumbly edges or lots of sand on your hands means too little cement." },
  { t: "Kerbs and drainage", b: "Kerbs hold paving edges in place and guide water. Without edge restraint, interlocks drift apart. Pair kerbs with channel drains in estates where rainy-season runoff is heavy." },
  { t: "Installation basics", b: "Excavate, compact a 150–250mm laterite or stone base, lay 30mm of sharp sand, place stones, compact with a plate compactor, then brush in joint sand." },
  { t: "Maintenance", b: "Sweep regularly, top up joint sand yearly, and replace single damaged stones — one benefit of paving over poured concrete is easy repair." },
];

function Learn() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Learn hub</p>
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Everything you should know before buying blocks.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">Short, honest guides for homeowners, builders and engineers.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {guides.map((g, i) => (
          <article key={g.t} className="rounded-md border bg-card p-6">
            <span className="font-mono text-xs text-safety">GUIDE {String(i + 1).padStart(2, "0")}</span>
            <h2 className="mt-2 text-xl font-bold">{g.t}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{g.b}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/compare" className="rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground hover:bg-safety">Compare products</Link>
        <Link to="/catalogue" className="rounded-sm border border-foreground px-6 py-3 text-sm font-semibold hover:bg-ink hover:text-ink-foreground">See catalogue</Link>
      </div>
    </div>
  );
}
