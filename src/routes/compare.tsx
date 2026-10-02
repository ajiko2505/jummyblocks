import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products, specRows } from "@/lib/products";

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

function Compare() {
  const [sel, setSel] = useState<string[]>(products.slice(0, 3).map((p) => p.id));
  const chosen = products.filter((p) => sel.includes(p.id));
  const toggle = (id: string) =>
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length < 4 ? [...s, id] : s));

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Comparison tool</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Compare up to 4 products.</h1>
      <div className="mt-8 flex flex-wrap gap-2">
        {products.map((p) => (
          <button key={p.id} onClick={() => toggle(p.id)} className={`rounded-sm border px-3 py-2 text-sm font-medium ${sel.includes(p.id) ? "border-safety bg-safety text-safety-foreground" : "hover:bg-card"}`}>
            {sel.includes(p.id) ? "✓ " : "+ "}{p.name}
          </button>
        ))}
      </div>
      {chosen.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Select at least one product to compare.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-md border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-ink text-ink-foreground">
                <th className="p-4 text-left font-mono text-xs uppercase tracking-wider">Spec</th>
                {chosen.map((p) => <th key={p.id} className="p-4 text-left font-bold">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {specRows.map((r) => (
                <tr key={r.key} className="border-t">
                  <td className="p-4 font-medium">{r.label}</td>
                  {chosen.map((p) => <td key={p.id} className="border-l p-4 font-mono">{p[r.key]}</td>)}
                </tr>
              ))}
              <tr className="border-t">
                <td className="p-4 font-medium">Indicative price</td>
                {chosen.map((p) => <td key={p.id} className="border-l p-4 font-mono font-semibold">{p.price} / {p.unit}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
