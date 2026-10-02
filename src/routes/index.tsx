import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products, specRows } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jummy Blocks — Know Your Blocks. Build With Confidence." },
      { name: "description", content: "Learn, compare and choose quality paving stones, interlocks, sandcrete blocks and kerbs for Nigerian construction." },
      { property: "og:title", content: "Jummy Blocks — Know Your Blocks. Build With Confidence." },
      { property: "og:description", content: "The educational hub for paving stones, interlocks, blocks and kerbs in Nigeria." },
    ],
  }),
  component: Index,
});

const topics = [
  { n: "01", t: "Paving stones", d: "Thickness, bedding and colour options explained." },
  { n: "02", t: "Interlocks", d: "Patterns, load spread and why 80mm matters for cars." },
  { n: "03", t: "Hollow & solid blocks", d: '6" vs 9", strength and where each belongs.' },
  { n: "04", t: "Sandcrete blocks", d: "Mix ratios, curing and spotting weak blocks." },
  { n: "05", t: "Kerbs & drainage", d: "Edge restraint and channel drains for estates." },
  { n: "06", t: "Heavy-duty paving", d: "Warehouses, factories and truck yards." },
];

const steps = ["Learn the basics", "Compare products", "Choose with confidence", "Get a fair quote"];

function Index() {
  const featured = [products[1], products[2], products[4]].filter((p): p is (typeof products)[number] => !!p);
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Interlocking paving stone driveway in a Nigerian estate" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-32">
          <div className="rise max-w-2xl text-ink-foreground">
            <p className="eyebrow mb-5">Learn. Compare. Choose Quality.</p>
            <h1 className="text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Know your blocks. Build with confidence.</h1>
            <p className="mt-5 max-w-lg text-lg text-ink-foreground/75">Nigeria's education-first guide to paving stones, interlocks, sandcrete blocks and kerbs — so you buy the right product, at the right strength, for the right job.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalogue" className="rounded-sm bg-safety px-6 py-3 text-sm font-semibold text-safety-foreground hover:bg-safety/85">Shop now</Link>
              <Link to="/learn" className="rounded-sm border border-ink-foreground/40 px-6 py-3 text-sm font-semibold text-ink-foreground hover:bg-ink-foreground/10">Start learning</Link>
              <Link to="/advisor" className="rounded-sm border border-ink-foreground/40 px-6 py-3 text-sm font-semibold text-ink-foreground hover:bg-ink-foreground/10">Ask the Block Advisor</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s} className="border-l py-6 pl-4 first:border-l-0 first:pl-0 md:py-8">
              <p className="font-mono text-xs text-safety">STEP 0{i + 1}</p>
              <p className="mt-1 font-bold">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Learn hub</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Understand before you buy</h2>
          </div>
          <Link to="/learn" className="text-sm font-semibold underline underline-offset-4">All guides</Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link key={t.n} to="/learn" className="group bg-card p-6 transition-colors hover:bg-background">
              <span className="font-mono text-xs text-muted-foreground">{t.n}</span>
              <h3 className="mt-2 text-lg font-bold group-hover:text-safety">{t.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y bg-card/60">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Product catalogue</p>
              <h2 className="text-3xl font-extrabold tracking-tight">Every block, graded and explained</h2>
            </div>
            <Link to="/catalogue" className="text-sm font-semibold underline underline-offset-4">Browse catalogue</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-md border bg-background">
                <img src={p.image} alt={p.name} loading="lazy" width={944} height={704} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold">{p.name}</h3>
                    <span className="shrink-0 font-mono text-sm font-semibold">{p.price}</span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{p.size} · {p.strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <p className="eyebrow mb-2">Comparison tool</p>
        <h2 className="mb-8 text-3xl font-extrabold tracking-tight">Compare specs side by side</h2>
        <div className="overflow-x-auto rounded-md border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-ink text-ink-foreground">
                <th className="p-4 text-left font-mono text-xs uppercase tracking-wider">Spec</th>
                {featured.map((p) => <th key={p.id} className="p-4 text-left font-bold">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {specRows.slice(1, 5).map((r) => (
                <tr key={r.key} className="border-t">
                  <td className="p-4 font-medium">{r.label}</td>
                  {featured.map((p) => <td key={p.id} className="border-l p-4 font-mono">{p[r.key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/compare" className="mt-5 inline-block rounded-sm bg-safety px-6 py-3 text-sm font-semibold text-safety-foreground hover:bg-safety/85">Open comparison tool</Link>
      </section>

      <section className="blueprint-grid bg-blueprint text-blueprint-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Quote request</p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">Know what you need? Get a price in hours.</h2>
            <p className="mt-4 max-w-md text-blueprint-foreground/70">Send your block type, quantity and site location. We confirm stock, delivery and a firm quote.</p>
          </div>
          <div className="md:justify-self-end">
            <Link to="/quote" className="inline-block rounded-sm bg-safety px-8 py-4 font-semibold text-safety-foreground hover:bg-safety/85">Request a quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
