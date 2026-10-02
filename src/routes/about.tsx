import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "About Us — Jummy Blocks, Lagos" },
      { name: "description", content: "Jummy Blocks makes quality interlocks, paving stones, blocks and kerbs in Lagos and helps buyers understand what they're building with." },
      { property: "og:title", content: "About Jummy Blocks" },
      { property: "og:description", content: "Know Your Blocks. Build With Confidence. Learn who we are and how we work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const values = [
  ["Educate first", "We explain strength, thickness and absorption so you can choose with confidence, not guesswork."],
  ["Tested quality", "Every batch is cured properly and checked for strength before it leaves our yard."],
  ["Honest pricing", "Clear Naira prices per m², piece or block, with no hidden charges."],
  ["Reliable delivery", "We deliver across Lagos and neighbouring states, on time and in good condition."],
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">About us</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">About Jummy Blocks: know your blocks, build with confidence.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Jummy Blocks supplies interlocking paving stones, slabs, sandcrete blocks, kerbs and drainage units to homeowners, contractors, developers and government projects across Nigeria. We believe a good build starts with an informed buyer.</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {values.map(([t, d], i) => (
          <div key={t} className="rounded-md border bg-card p-6">
            <p className="font-mono text-xs text-safety">0{i + 1}</p>
            <h2 className="mt-2 text-lg font-bold">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/catalogue" className="rounded-sm bg-safety px-6 py-3 text-sm font-semibold text-safety-foreground hover:bg-safety/85">Browse products</Link>
        <Link to="/contact" className="rounded-sm border px-6 py-3 text-sm font-semibold hover:bg-card">Contact us</Link>
      </div>
    </div>
  );
}
