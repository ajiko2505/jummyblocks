import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products, specRows, type Product } from "@/lib/products";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Blocks & Pavers — Jummy Blocks" },
      { name: "description", content: "Compare strength, weight, absorption and best uses of interlocks, sandcrete blocks and kerbs side by side." },
      { property: "og:title", content: "Compare Blocks & Pavers — Jummy Blocks" },
      { property: "og:description", content: "Side-by-side spec comparison for Nigerian construction materials." },
    ],
  }),
  component: Compare,
});

const num = (s: string) => parseFloat(s.replace(/[^\d.]/g, "")) || 0;
// Which value "wins" per row: higher strength is better, lower absorption is better.
const best: Partial<Record<keyof Product, "max" | "min">> = { strength: "max", absorption: "min" };

const rows = [...specRows, { key: "price" as keyof Product, label: "Indicative price" }];

function Compare() {
  const [sel, setSel] = useState<string[]>(products.slice(0, 3).map((p) => p.id));
  const [diffOnly, setDiffOnly] = useState(false);
  const chosen = products.filter((p) => sel.includes(p.id));
  const toggle = (id: string) =>
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length < 4 ? [...s, id] : s));

  const differs = (k: keyof Product) => new Set(chosen.map((p) => p[k])).size > 1;
  const winner = (k: keyof Product) => {
    const mode = best[k];
    if (!mode || !differs(k)) return null;
    const vals = chosen.map((p) => num(String(p[k])));
    const target = mode === "max" ? Math.max(...vals) : Math.min(...vals);
    return chosen.filter((_, i) => vals[i] === target).map((p) => p.id);
  };
  const visible = rows.filter((r) => !diffOnly || differs(r.key));
  const fmt = (p: Product, k: keyof Product) => (k === "price" ? `${p.price} / ${p.unit}` : String(p[k]));

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Comparison tool</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Compare up to 4 products.</h1>
      <p className="mt-3 text-muted-foreground">
        Not sure where to start? <Link to="/advisor" className="font-semibold text-foreground underline underline-offset-4">Ask the Block Advisor</Link>.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {products.map((p) => {
          const on = sel.includes(p.id);
          return (
            <button key={p.id} onClick={() => toggle(p.id)} disabled={!on && sel.length >= 4}
              className={`rounded-sm border px-3 py-2 text-sm font-medium disabled:opacity-40 ${on ? "border-safety bg-safety text-safety-foreground" : "hover:bg-card"}`}>
              {on ? "✓ " : "+ "}{p.name}
            </button>
          );
        })}
      </div>

      {chosen.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Select at least one product to compare.</p>
      ) : (
        <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y py-3">
            <p className="font-mono text-xs text-muted-foreground">
              {chosen.length} selected · <span className="text-safety">●</span> differs · <span className="font-semibold text-foreground">★ best</span>
            </p>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={diffOnly} onChange={(e) => setDiffOnly(e.target.checked)} className="h-4 w-4 accent-[var(--safety)]" />
              Show differences only
            </label>
          </div>

          {/* Desktop / tablet table */}
          <div className="mt-6 hidden overflow-hidden rounded-md border bg-card md:block">
            <table className="w-full table-fixed text-sm">
              <thead>
                <tr className="bg-ink text-ink-foreground">
                  <th className="w-48 p-4 text-left font-mono text-xs uppercase tracking-wider">Spec</th>
                  {chosen.map((p) => (
                    <th key={p.id} className="p-4 text-left align-top">
                      <img src={p.image} alt="" width={944} height={704} loading="lazy" className="mb-3 aspect-[16/10] w-full rounded-sm object-cover" />
                      <span className="font-bold">{p.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => {
                  const d = differs(r.key);
                  const w = winner(r.key);
                  return (
                    <tr key={r.key} className={`border-t ${d ? "bg-safety/5" : ""}`}>
                      <td className="p-4 font-medium">
                        {d && <span className="mr-1.5 text-safety">●</span>}{r.label}
                      </td>
                      {chosen.map((p) => (
                        <td key={p.id} className={`border-l p-4 font-mono ${w?.includes(p.id) ? "font-bold" : d ? "" : "text-muted-foreground"}`}>
                          {w?.includes(p.id) && <span className="mr-1 text-safety">★</span>}{fmt(p, r.key)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile: one block per spec, products stacked inside */}
          <div className="mt-6 space-y-3 md:hidden">
            <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
              {chosen.map((p) => (
                <div key={p.id} className="w-36 shrink-0">
                  <img src={p.image} alt="" width={944} height={704} loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
                  <p className="mt-1.5 text-xs font-bold leading-tight">{p.name}</p>
                </div>
              ))}
            </div>
            {visible.map((r) => {
              const d = differs(r.key);
              const w = winner(r.key);
              return (
                <div key={r.key} className={`rounded-md border ${d ? "border-safety/40 bg-card" : "bg-card/60"}`}>
                  <p className="flex items-center gap-1.5 border-b px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {d && <span className="text-safety">●</span>}{r.label}
                    {!d && <span className="ml-auto normal-case tracking-normal">Same for all</span>}
                  </p>
                  {d ? (
                    <dl className="divide-y">
                      {chosen.map((p) => (
                        <div key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-2.5 text-sm">
                          <dt className="min-w-0 truncate text-muted-foreground">{p.name}</dt>
                          <dd className={`text-right font-mono ${w?.includes(p.id) ? "font-bold" : ""}`}>
                            {w?.includes(p.id) && <span className="mr-1 text-safety">★</span>}{fmt(p, r.key)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="px-4 py-2.5 font-mono text-sm">{fmt(chosen[0]!, r.key)}</p>
                  )}
                </div>
              );
            })}
          </div>

          {diffOnly && visible.length === 0 && <p className="mt-6 text-muted-foreground">These products share the same specs.</p>}
        </>
      )}
    </div>
  );
}
