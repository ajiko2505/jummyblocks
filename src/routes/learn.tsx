import { createFileRoute, Link } from "@tanstack/react-router";
import { guideLinks } from "@/components/GuidePage";
import installationLaying from "@/assets/installation-laying.jpg";
import productionBlocks from "@/assets/production-blocks.jpg";
import installationFinishing from "@/assets/installation-finishing.jpg";
const processVideo = { url: "/videos/how-blocks-and-pavers-are-made.mp4" };

export const Route = createFileRoute("/learn")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Paving Stones & Interlocks Guide for Nigerian Builders | Jummy Blocks" },
      { name: "description", content: "Simple guides to interlocking stones, paving stones and sandcrete blocks in Nigeria: thickness, strength, laying, how to spot weak blocks and Lagos prices." },
      { property: "og:title", content: "Paving Stones & Interlocks Guide for Nigerian Builders" },
      { property: "og:description", content: "Learn interlocks, paving stones and blocks before you buy — with Lagos prices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guides.map((g) => ({ "@type": "Question", name: g.t, acceptedAnswer: { "@type": "Answer", text: g.b } })),
      }),
    }],
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

const processGallery = [
  {
    image: productionBlocks,
    step: "01",
    title: "Moulded and compacted",
    description: "Measured concrete is vibrated under pressure to form dense, consistent blocks and paving stones.",
    alt: "Workers producing hollow concrete blocks with a block moulding machine",
  },
  {
    image: installationLaying,
    step: "02",
    title: "Laid on a prepared base",
    description: "Installers follow string lines and place each paver on a level bed of compacted sharp sand.",
    alt: "Installers laying grey interlocking paving stones on a prepared sand bed",
  },
  {
    image: installationFinishing,
    step: "03",
    title: "Jointed and finished",
    description: "Joint sand is brushed into the surface before final compaction and edge inspection.",
    alt: "Workers brushing joint sand across a completed red and grey paved driveway",
  },
];

function Learn() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Learn hub</p>
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Everything you should know before buying blocks.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">Short, honest guides for homeowners, builders and engineers.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {guideLinks.map((g) => (
          <Link key={g.to} to={g.to} className="rounded-md border bg-card p-4 font-semibold hover:border-safety">{g.label} →</Link>
        ))}
      </div>


      <section className="mt-12" aria-labelledby="process-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">How it’s done</p>
            <h2 id="process-heading" className="text-3xl font-extrabold tracking-tight">From the mould to a finished site</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">See how quality concrete products are formed, cured and installed on a properly prepared base.</p>
        </div>

        <div className="overflow-hidden rounded-md border bg-ink">
          <video
            className="aspect-video w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={productionBlocks}
            aria-label="How concrete blocks and paving stones are made and installed"
          >
            <source src={processVideo.url} type="video/mp4" />
            Your browser does not support this video.
          </video>
          <div className="flex items-start gap-4 border-t border-ink-foreground/15 px-5 py-4 text-ink-foreground">
            <span className="font-mono text-xs text-safety">PROCESS FILM</span>
            <p className="text-sm text-ink-foreground/70">Mixing, machine moulding, curing, laying and final compaction.</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {processGallery.map((item) => (
            <article key={item.step} className="overflow-hidden rounded-md border bg-card">
              <img src={item.image} alt={item.alt} loading="lazy" width={1408} height={1024} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <span className="font-mono text-xs text-safety">STEP {item.step}</span>
                <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

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
