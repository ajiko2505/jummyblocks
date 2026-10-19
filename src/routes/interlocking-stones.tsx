import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, guideHead } from "@/components/GuidePage";

export const Route = createFileRoute("/interlocking-stones")({
  staticData: { sitemap: true },
  head: () => guideHead(
    "/interlocking-stones",
    "Interlocking Stones in Lagos: 60mm vs 80mm Guide | Jummy Blocks",
    "Choosing interlocking stones in Nigeria? Learn I-type vs bone type, 60mm vs 80mm thickness, strength and laying tips, then get a Lagos quote from Jummy Blocks.",
  ),
  component: () => (
    <GuidePage
      current="/interlocking-stones"
      eyebrow="Guide · Interlocking stones"
      title="Interlocking stones: what to buy for your compound, driveway or estate"
      intro="Interlocking stones (interlocks) are the most popular paving in Nigeria because they handle heavy rain, carry cars well and are easy to repair. Here is how to choose the right one before you spend your money."
      productIds={["interlock-60", "interlock-80", "bone-60", "bone-80"]}
      sections={[
        { h: "What are interlocking stones?", body: <p>They are concrete paving units with shaped edges that lock into the stones around them. When a car drives over, the load spreads across many stones instead of one, so the floor does not sink or shift. They are laid on compacted sand, not poured concrete, so rainwater can drain and single stones can be lifted and replaced.</p> },
        { h: "60mm or 80mm — which thickness do I need?", body: <>
          <p><strong>60mm</strong> is for foot traffic and the occasional small car: walkways, patios, gardens and residential compounds.</p>
          <p><strong>80mm</strong> is for regular car and truck traffic: driveways, estate roads, church and school car parks, filling stations and warehouses. If a water tanker or sand tipper will ever enter, choose 80mm.</p>
        </> },
        { h: "I-type vs bone type", body: <p>Both are strong. <strong>I-type</strong> gives the familiar clean pattern seen in many Lagos homes. <strong>Bone type</strong> (dog-bone) locks on all four sides, which helps where vehicles turn and brake. Pick by look and traffic, not by price alone.</p> },
        { h: "How to know you are buying good interlocks", body: <p>Ask for the strength rating — about 30 N/mm² for 60mm and 45 N/mm² for 80mm. Check that edges are sharp, not crumbly, that colour is even, and that stones have been cured for at least 14 days. Weak, rushed stones crack after the first rainy season.</p> },
        { h: "Laying interlocking stones properly", body: <p>Most failures come from the base, not the stone. Excavate, compact a 150–250mm laterite or stone base, spread about 30mm of sharp sand, lay the stones, fix kerbs at the edges, compact with a plate compactor and brush joint sand in. Without kerbs, interlocks slowly drift apart.</p> },
      ]}
    />
  ),
});
