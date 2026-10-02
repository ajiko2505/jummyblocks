import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { products } from "@/lib/products";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/advisor")({
  head: () => ({
    meta: [
      { title: "Block Advisor — Jummy Blocks" },
      { name: "description", content: "Describe your project and get matching paving stones, blocks and kerbs with clear reasons." },
      { property: "og:title", content: "Block Advisor — Jummy Blocks" },
      { property: "og:description", content: "AI-powered product recommendations for your construction project." },
    ],
  }),
  component: Advisor,
});

const examples = [
  "Driveway for 2 SUVs in Lekki, about 120 m²",
  "Boundary fence wall for a 600 sqm plot in Abuja",
  "Garden walkway with neat edges behind my house",
];

function parse(text: string) {
  const recs: { id: string; reason: string }[] = [];
  let tip = "";
  for (const line of text.split("\n")) {
    const m = line.match(/^PRODUCT:\s*([\w-]+)\s*\|\s*(.*)$/);
    if (m) recs.push({ id: m[1]!, reason: m[2]! });
    else if (line.startsWith("TIP:")) tip = line.slice(4).trim();
  }
  return { recs, tip };
}

function Advisor() {
  const [req, setReq] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abort = useRef<AbortController | null>(null);

  async function run(e?: React.FormEvent) {
    e?.preventDefault();
    if (req.trim().length < 5 || loading) return;
    setOut(""); setError(""); setLoading(true);
    const ac = new AbortController();
    abort.current = ac;
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ requirements: req }),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        throw new Error(res.status === 402 ? "The advisor is temporarily unavailable. Please try later." : res.status === 429 ? "Too many requests — please wait a moment." : (j.error ?? "Something went wrong."));
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setOut(acc);
      }
      if (!acc.trim()) setError("No recommendation came back. Try describing your project differently.");
    } catch (err) {
      if ((err as Error).name !== "AbortError") setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const { recs, tip } = parse(out);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Block advisor</p>
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Describe your project. Get the right blocks.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">Tell us what you're building, where, and roughly how big. We'll match products from our catalogue and explain why.</p>

      <form onSubmit={run} className="mt-8 rounded-md border bg-card p-5">
        <textarea value={req} onChange={(e) => setReq(e.target.value)} rows={4} maxLength={2000}
          placeholder="e.g. Paving for a church car park in Ibadan, around 400 m², buses park there on Sundays"
          className="w-full resize-none rounded-sm border bg-background p-3 text-sm outline-none focus:border-safety" />
        <div className="mt-3 flex flex-wrap gap-2">
          {examples.map((x) => (
            <button type="button" key={x} onClick={() => setReq(x)} className="rounded-sm border px-3 py-1.5 text-xs text-muted-foreground hover:bg-background">{x}</button>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button disabled={loading || req.trim().length < 5} className="rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground hover:bg-safety disabled:opacity-50">
            {loading ? "Thinking…" : "Recommend products"}
          </button>
          {loading && <button type="button" onClick={() => abort.current?.abort()} className="rounded-sm border px-4 py-3 text-sm font-semibold">Stop</button>}
        </div>
      </form>

      {error && <p className="mt-6 rounded-sm border border-destructive p-4 text-sm text-destructive">{error}</p>}

      {loading && recs.length === 0 && !error && (
        <p className="mt-8 font-mono text-sm text-muted-foreground">Matching your project against the catalogue…</p>
      )}

      {recs.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Recommended for you</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {recs.map((r, i) => {
              const p = products.find((x) => x.id === r.id);
              if (!p) return null;
              return (
                <div key={r.id + i} className="rise flex flex-col overflow-hidden rounded-md border bg-card">
                  <img src={p.image} alt={p.name} loading="lazy" width={944} height={704} className="aspect-[16/10] w-full object-cover" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-xs text-safety">{i === 0 ? "BEST MATCH" : `OPTION 0${i + 1}`}</p>
                    <div className="mt-1 flex items-start justify-between gap-3">
                      <h3 className="font-bold">{p.name}</h3>
                      <span className="shrink-0 font-mono text-sm font-semibold">{p.price}/{p.unit}</span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.reason}</p>
                    <Link to="/products/$id" params={{ id: p.id }} className="mt-4 rounded-sm border border-foreground py-2.5 text-center text-sm font-semibold hover:bg-ink hover:text-ink-foreground">View product &amp; buy</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {tip && (
        <div className="mt-6 rounded-md bg-blueprint p-5 text-blueprint-foreground">
          <p className="eyebrow mb-1">Pro tip</p>
          <p className="text-sm">{tip}</p>
        </div>
      )}
      {!loading && out && recs.length === 0 && !tip && <p className="mt-6 whitespace-pre-wrap text-sm">{out}</p>}
      <EnquiryForm project={req} suggested={recs.map((r) => products.find((x) => x.id === r.id)?.name).filter(Boolean).join(", ")} />
    </div>
  );
}

const inp = "mt-1 h-11 w-full rounded-sm border bg-background px-3 text-sm outline-none focus:border-safety";
const lbl = "font-mono text-xs uppercase tracking-wider text-muted-foreground";

function EnquiryForm({ project, suggested }: { project: string; suggested: string }) {
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    const msg = [
      "New enquiry from the Jummy Blocks website",
      `Name: ${g("name")}`,
      `Phone: ${g("phone")}`,
      g("email") && `Email: ${g("email")}`,
      `Site location: ${g("location")}`,
      g("budget") && `Budget: ${g("budget")}`,
      g("timeline") && `Timeline: ${g("timeline")}`,
      `Project: ${g("project")}`,
      suggested && `Advisor suggested: ${suggested}`,
    ].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }
  return (
    <section className="mt-14 rounded-md border bg-card p-6 md:p-8">
      <p className="eyebrow mb-2">Enquiry</p>
      <h2 className="text-2xl font-extrabold tracking-tight">Send us your project details</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">Our team will reply with availability, a firm price and delivery to your site.</p>
      {sent ? (
        <p className="mt-6 rounded-sm bg-blueprint p-4 text-sm text-blueprint-foreground">Thank you! Your enquiry has opened in WhatsApp — press send there and we'll respond shortly.</p>
      ) : (
        <form key={project} onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label><span className={lbl}>Full name *</span><input name="name" required maxLength={100} className={inp} /></label>
          <label><span className={lbl}>Phone *</span><input name="phone" type="tel" required maxLength={20} className={inp} /></label>
          <label><span className={lbl}>Email</span><input name="email" type="email" maxLength={255} className={inp} /></label>
          <label><span className={lbl}>Site location *</span><input name="location" required maxLength={150} placeholder="e.g. Ikoyi, Lagos" className={inp} /></label>
          <label><span className={lbl}>Budget</span><input name="budget" maxLength={60} placeholder="e.g. ₦1.5m" className={inp} /></label>
          <label><span className={lbl}>Timeline</span><input name="timeline" maxLength={60} placeholder="e.g. Next month" className={inp} /></label>
          <label className="sm:col-span-2"><span className={lbl}>Project details *</span>
            <textarea name="project" required maxLength={2000} rows={4} defaultValue={project} className="mt-1 w-full resize-none rounded-sm border bg-background p-3 text-sm outline-none focus:border-safety" />
          </label>
          <button className="rounded-sm bg-ink py-3 font-semibold text-ink-foreground hover:bg-safety sm:col-span-2">Send enquiry</button>
        </form>
      )}
    </section>
  );
}
