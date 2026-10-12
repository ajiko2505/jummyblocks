import { createFileRoute, Link } from "@tanstack/react-router";
import estate from "@/assets/project-estate-driveway.jpg";
import warehouse from "@/assets/project-warehouse-yard.jpg";
import blockHome from "@/assets/project-block-home.jpg";
import garden from "@/assets/project-garden-walkway.jpg";
import ongoingRoad from "@/assets/project-ongoing-road.jpg";
import ongoingDuplex from "@/assets/project-ongoing-duplex.jpg";

export const Route = createFileRoute("/projects")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Our Projects — Jummy Blocks, Lagos" },
      { name: "description", content: "See Jummy Blocks products at work: estate driveways, warehouse yards, block homes and landscaped walkways across Lagos and Nigeria." },
      { property: "og:title", content: "Projects built with Jummy Blocks" },
      { property: "og:description", content: "Estate paving, heavy-duty yards, sandcrete block homes and garden walkways — built with Jummy Blocks products." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

const projects = [
  {
    img: estate,
    title: "Estate internal roads & driveways",
    location: "Residential estate, Lagos",
    products: ["80mm I-Type interlocks", "Road kerbs"],
    text: "Full estate road network and private driveways paved in 80mm interlock, laid in herringbone for vehicle loads, edged with precast road kerbs.",
    tag: "Paving",
  },
  {
    img: warehouse,
    title: "Logistics warehouse truck yard",
    location: "Industrial site, Lagos",
    products: ["80mm heavy-duty interlocks", "U-drains", "Parking kerbs"],
    text: "A hard-standing yard built for daily articulated-truck traffic, with heavy-duty pavers, channel drainage and kerbed parking bays.",
    tag: "Heavy duty",
  },
  {
    img: blockHome,
    title: "Duplex shell & boundary wall",
    location: "Private residence, Lagos",
    products: ['9" hollow blocks', '6" hollow blocks'],
    text: "Load-bearing external walls in 9-inch hollow sandcrete blocks with 6-inch partitions — cured, strength-tested and delivered in phased batches.",
    tag: "Blocks",
  },
  {
    img: garden,
    title: "Landscaped garden walkway",
    location: "Private residence, Lagos",
    products: ["Decorative slabs", "Garden kerbs"],
    text: "A decorative-slab walkway with precast garden kerbs edging the lawn — a clean, low-maintenance finish for a family garden.",
    tag: "Landscaping",
  },
];

const ongoing = [
  {
    img: ongoingRoad,
    title: "Estate access road repaving",
    location: "Lagos",
    products: ["80mm I-Type interlocks", "Road kerbs"],
    text: "Crews are relaying a failed asphalt stretch with 80mm interlock on a compacted base — about two-thirds of the carriageway is down, with kerbing and jointing to follow.",
    progress: "65% complete",
  },
  {
    img: ongoingDuplex,
    title: "Two-storey family home",
    location: "Lagos",
    products: ['9" hollow blocks', '6" hollow blocks'],
    text: "Blockwork is rising on a two-storey home: 9-inch hollow blocks for the external walls, 6-inch for partitions. We deliver blocks in phased batches as each floor goes up.",
    progress: "First-floor walls underway",
  },
];

const stats = [
  ["16", "Product lines in production"],
  ["4", "Project categories served"],
  ["Lagos+", "Delivery across Lagos & neighbouring states"],
];

function Projects() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Our work</p>
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Projects built with Jummy Blocks.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        From estate roads to warehouse yards and family homes, our blocks, pavers and kerbs are at work across Lagos and beyond. Here is a selection of what they become on site.
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-3">
        {stats.map(([n, l]) => (
          <div key={l} className="bg-card p-6">
            <p className="font-mono text-3xl font-bold text-safety">{n}</p>
            <p className="mt-1 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <article key={p.title} className="group overflow-hidden rounded-md border bg-card">
            <div className="relative overflow-hidden">
              <img src={p.img} alt={p.title} loading={i === 0 ? "eager" : "lazy"} width={1024} height={768}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <span className="absolute left-4 top-4 rounded-sm bg-ink px-3 py-1 font-mono text-xs uppercase tracking-wider text-ink-foreground">{p.tag}</span>
            </div>
            <div className="p-6">
              <p className="font-mono text-xs text-muted-foreground">{p.location}</p>
              <h2 className="mt-2 text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.products.map((prod) => (
                  <span key={prod} className="rounded-sm border px-2.5 py-1 font-mono text-xs">{prod}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="blueprint-grid mt-16 rounded-md bg-blueprint text-blueprint-foreground">
        <div className="grid items-center gap-6 px-6 py-12 md:grid-cols-2 md:px-10">
          <div>
            <p className="eyebrow mb-3">Your project next</p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight">Planning something similar?</h2>
            <p className="mt-3 max-w-md text-blueprint-foreground/70">Tell us the site, the load and the finish you want. The Block Advisor can suggest the right products, or send us a quote request directly.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/advisor" className="rounded-sm bg-safety px-6 py-3 text-sm font-semibold text-safety-foreground hover:bg-safety/85">Ask the Block Advisor</Link>
            <Link to="/quote" className="rounded-sm border border-blueprint-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-blueprint-foreground/10">Request a quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
