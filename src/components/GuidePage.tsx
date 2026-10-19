import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { products } from "@/lib/products";

export type GuideSection = { h: string; body: ReactNode };

export const guideLinks = [
  { to: "/interlocking-stones", label: "Interlocking stones guide" },
  { to: "/paving-stones", label: "Paving stones guide" },
  { to: "/paving-stone-prices-lagos", label: "Paving stone prices in Lagos" },
] as const;

export function GuidePage({ eyebrow, title, intro, sections, productIds, current }: {
  eyebrow: string; title: string; intro: string; sections: GuideSection[]; productIds: string[]; current: string;
}) {
  const picks = productIds.map((id) => products.find((p) => p.id === id)).filter((p): p is (typeof products)[number] => !!p);
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>

      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-2xl font-bold tracking-tight">{s.h}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{s.body}</div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Products mentioned in this guide</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {picks.map((p) => (
            <Link key={p.id} to="/products/$id" params={{ id: p.id }} className="flex gap-4 rounded-md border bg-card p-4 hover:border-safety">
              <img src={p.image} alt={p.name} loading="lazy" className="h-20 w-20 rounded-sm object-cover" />
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.bestFor}</p>
                <p className="mt-1 font-mono text-sm text-safety">from {p.price}/{p.unit}*</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">*Indicative Lagos prices. Your final quote depends on quantity, colour and delivery location.</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/quote" className="rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground hover:bg-safety">Get a free quote</Link>
        <Link to="/book" className="rounded-sm border border-foreground px-6 py-3 text-sm font-semibold hover:bg-ink hover:text-ink-foreground">Book a site visit call</Link>
        <Link to="/catalogue" className="rounded-sm border border-foreground px-6 py-3 text-sm font-semibold hover:bg-ink hover:text-ink-foreground">See all products</Link>
      </div>

      <nav className="mt-12 border-t pt-6" aria-label="More guides">
        <p className="eyebrow mb-3">More guides</p>
        <ul className="flex flex-wrap gap-4 text-sm font-semibold">
          {guideLinks.filter((g) => g.to !== current).map((g) => (
            <li key={g.to}><Link to={g.to} className="underline underline-offset-4 hover:text-safety">{g.label}</Link></li>
          ))}
          <li><Link to="/learn" className="underline underline-offset-4 hover:text-safety">All Learn guides</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export function guideHead(path: string, title: string, description: string) {
  const url = `https://jummyblocks.lovable.app${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
