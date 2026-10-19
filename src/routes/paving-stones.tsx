import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, guideHead } from "@/components/GuidePage";

export const Route = createFileRoute("/paving-stones")({
  staticData: { sitemap: true },
  head: () => guideHead(
    "/paving-stones",
    "Paving Stones in Nigeria: Types, Uses & Buying Tips | Jummy Blocks",
    "A plain guide to paving stones in Nigeria — interlocks, hex pavers, slabs and kerbs. See which paving suits your home, estate or car park, with Lagos delivery.",
  ),
  component: () => (
    <GuidePage
      current="/paving-stones"
      eyebrow="Guide · Paving stones"
      title="Paving stones in Nigeria: types, uses and how to choose"
      intro="Paving stones turn a muddy or dusty compound into a clean, firm floor that survives the rainy season. This guide explains the main types sold in Lagos and where each one works best."
      productIds={["interlock-60", "hex-80", "decor-slab", "kerb-road"]}
      sections={[
        { h: "Why paving stones instead of concrete floor?", body: <p>Poured concrete cracks as the ground moves and is hard to repair. Paving stones sit on sand, so they flex with the ground, let some water drain through the joints and can be lifted for pipe or cable work and laid back the same day.</p> },
        { h: "The main types of paving stones", body: <>
          <p><strong>Interlocks</strong> (I-type and bone type): the everyday choice for compounds, driveways and estate roads.</p>
          <p><strong>Hexagonal pavers</strong>: a distinctive look with good load spread for feature areas and plazas.</p>
          <p><strong>Slabs</strong> (decor and square): for gardens, poolsides, rooftops and stepping paths with foot traffic only.</p>
          <p><strong>Kerbs and drains</strong>: not paving themselves, but they hold paving in place and carry water away — essential in Lagos estates.</p>
        </> },
        { h: "Matching paving to your project", body: <p>Home walkway or patio: 60mm interlock or slabs. Driveway: 80mm interlock or hex. Estate road or car park: 80mm bone type with road kerbs and U-drains. Warehouse or truck yard: 80mm heavy-duty, with a properly engineered base.</p> },
        { h: "Colours and finishing", body: <p>Grey is the cheapest and easiest to match later. Red, charcoal and ivory cost slightly more. Mixing two colours for borders and parking bays makes a compound look neat without much extra spend.</p> },
      ]}
    />
  ),
});
