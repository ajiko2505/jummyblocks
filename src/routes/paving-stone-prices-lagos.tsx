import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, guideHead } from "@/components/GuidePage";
import { products } from "@/lib/products";

const rows = ["interlock-60", "bone-60", "interlock-80", "bone-80", "hex-80", "decor-slab", "kerb-road", "hollow-9"]
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is (typeof products)[number] => !!p);

export const Route = createFileRoute("/paving-stone-prices-lagos")({
  staticData: { sitemap: true },
  head: () => guideHead(
    "/paving-stone-prices-lagos",
    "Interlocking & Paving Stone Prices in Lagos (2026) | Jummy Blocks",
    "Current indicative prices for interlocking stones, paving stones and kerbs in Lagos, per m² and per piece. See what affects cost, then get a free quote.",
  ),
  component: () => (
    <GuidePage
      current="/paving-stone-prices-lagos"
      eyebrow="Guide · Lagos prices"
      title="Interlocking and paving stone prices in Lagos"
      intro="Here are indicative Jummy Blocks prices for common paving products in Lagos, plus what makes a quote go up or down. Prices are a guide — send us your measurements for an exact figure."
      productIds={["interlock-60", "interlock-80"]}
      sections={[
        { h: "Price list (indicative)", body: (
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-foreground"><tr><th className="p-3">Product</th><th className="p-3">Best for</th><th className="p-3">Price</th></tr></thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-t"><td className="p-3 font-medium text-foreground">{p.name}</td><td className="p-3">{p.bestFor}</td><td className="p-3 font-mono whitespace-nowrap">{p.price}/{p.unit}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ) },
        { h: "What affects the price of paving in Lagos?", body: <>
          <p><strong>Thickness:</strong> 80mm costs more than 60mm because it uses more cement and carries heavier loads.</p>
          <p><strong>Colour:</strong> grey is cheapest; red, charcoal and ivory add a little per m².</p>
          <p><strong>Quantity:</strong> larger orders usually get a better rate per m².</p>
          <p><strong>Delivery:</strong> distance from Ikoyi and site access (Island, Lekki, Ajah, Mainland) affect transport cost.</p>
          <p><strong>Laying:</strong> labour, sharp sand, base material and kerbs are separate from the stone price.</p>
        </> },
        { h: "How to estimate your cost", body: <p>Measure length × width of the area in metres to get m². Add about 5% for cutting and breakage. Multiply by the price per m², then add kerbs for the edges. Example: a 10m × 6m driveway is 60m² — with 5% extra, order about 63m² of 80mm interlock.</p> },
        { h: "Avoid cheap stones that fail", body: <p>A very low price often means too little cement or stones sold before curing. They look fine on delivery and crumble after one rainy season. Always ask for the strength rating and inspect a sample before paying.</p> },
      ]}
    />
  ),
});
