import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Jummy Blocks" },
      { name: "description", content: "Ordering, pricing, payment, delivery and returns terms for Jummy Blocks products." },
      { property: "og:title", content: "Terms & Conditions — Jummy Blocks" },
      { property: "og:description", content: "How ordering, payment, delivery and returns work at Jummy Blocks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terms,
});

const sections = [
  ["Prices", "Prices on this website are in Nigerian Naira and are a guide. Final prices are confirmed in your quote or invoice and may change with material costs."],
  ["Orders & payment", "An order is confirmed once we receive payment or an agreed deposit. Large or custom orders may require a deposit before production begins."],
  ["Delivery", "Delivery times and costs depend on location and quantity and are agreed before dispatch. Please ensure the site is accessible for offloading."],
  ["Inspection & returns", "Please inspect products on delivery. Report damaged or wrong items within 48 hours. Products cannot be returned once installed."],
  ["Installation", "Product performance depends on correct base preparation and installation. We are not liable for failures caused by poor installation by third parties."],
  ["Advisor & information", "Guides and Advisor recommendations are general advice. For structural work, consult a qualified engineer."],
  ["Contact", `Questions about these terms? Email ${site.email} or call ${site.phoneDisplay}.`],
];

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Legal</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Terms &amp; Conditions</h1>
      <p className="mt-3 font-mono text-xs text-muted-foreground">Last updated: October 2026</p>
      <div className="mt-10 space-y-8">
        {sections.map(([t, d], i) => (
          <section key={t}>
            <h2 className="text-lg font-bold"><span className="mr-2 font-mono text-safety">{i + 1}.</span>{t}</h2>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
