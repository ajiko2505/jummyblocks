import interlock from "@/assets/interlock.jpg";
import hollow from "@/assets/hollow.jpg";
import kerb from "@/assets/kerb.jpg";
import hex from "@/assets/hex.jpg";
import drainage from "@/assets/drainage.jpg";
import hump from "@/assets/hump.jpg";
import slab from "@/assets/slab.jpg";
import hero from "@/assets/hero.jpg";
import installInterlock60 from "@/assets/install-interlock-60.mp4.asset.json";
import installInterlock80 from "@/assets/install-interlock-80.mp4.asset.json";
import installBone60 from "@/assets/install-bone-60.mp4.asset.json";
import installBone80 from "@/assets/install-bone-80.mp4.asset.json";
import installHex80 from "@/assets/install-hex-80.mp4.asset.json";
import installDecorSlab from "@/assets/install-decor-slab.mp4.asset.json";
import installSquareSlab from "@/assets/install-square-slab.mp4.asset.json";
import installHollow9 from "@/assets/install-hollow-9.mp4.asset.json";
import installHollow6 from "@/assets/install-hollow-6.mp4.asset.json";
import installKerbRoad from "@/assets/install-kerb-road.mp4.asset.json";
import installKerbGarden from "@/assets/install-kerb-garden.mp4.asset.json";
import installKerbParking from "@/assets/install-kerb-parking.mp4.asset.json";
import installUDrain from "@/assets/install-u-drain.mp4.asset.json";
import installBoxCulvert from "@/assets/install-box-culvert.mp4.asset.json";
import installSpeedHump from "@/assets/install-speed-hump.mp4.asset.json";
import installMedianBarrier from "@/assets/install-median-barrier.mp4.asset.json";

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  gallery: string[];
  installationVideo: string;
  description: string;
  size: string;
  strength: string;
  weight: string;
  absorption: string;
  bestFor: string;
  traffic: string;
  colours: string;
  price: string;
  unit: string;
  /** Optional direct link where this product is sold online. Falls back to site.shopUrl. */
  buyUrl?: string;
};

// Single source of truth for everything Jummy Blocks sells.
// The catalogue, product pages, comparison tool and AI Advisor all read from this list.
export const products: Product[] = [
  { id: "interlock-60", name: "I-Type Interlock 60mm", category: "Interlocks", image: interlock, gallery: [interlock, hero], installationVideo: installInterlock60.url, description: "The classic I-shaped interlock. Ideal for walkways, patios and residential compounds with light vehicle use.", size: "200×165×60mm", strength: "30 N/mm²", weight: "~130 kg/m²", absorption: "≤ 6%", bestFor: "Walkways, gardens, patios", traffic: "Pedestrian / light", colours: "Grey, red, charcoal, ivory", price: "₦4,800", unit: "m²" },
  { id: "interlock-80", name: "I-Type Heavy-Duty Interlock 80mm", category: "Interlocks", image: interlock, gallery: [interlock, hero], installationVideo: installInterlock80.url, description: "Thicker 80mm I-type built for car and truck loads on driveways, estate roads and car parks.", size: "200×165×80mm", strength: "45 N/mm²", weight: "~175 kg/m²", absorption: "≤ 6%", bestFor: "Driveways, estates, parking", traffic: "Cars & trucks", colours: "Grey, red, charcoal", price: "₦6,500", unit: "m²" },
  { id: "bone-60", name: "Bone Type Interlock 60mm", category: "Interlocks", image: hero, gallery: [hero, interlock], installationVideo: installBone60.url, description: "Dog-bone shape with strong four-side interlocking. A popular choice for compounds and walkways.", size: "225×112×60mm", strength: "30 N/mm²", weight: "~130 kg/m²", absorption: "≤ 6%", bestFor: "Compounds, walkways", traffic: "Pedestrian / light", colours: "Grey, red, yellow", price: "₦4,900", unit: "m²" },
  { id: "bone-80", name: "Bone Type Interlock 80mm", category: "Interlocks", image: hero, gallery: [hero, interlock], installationVideo: installBone80.url, description: "Heavy-duty bone type for roads, filling stations and warehouses where vehicles turn and brake.", size: "225×112×80mm", strength: "45 N/mm²", weight: "~175 kg/m²", absorption: "≤ 6%", bestFor: "Roads, filling stations, warehouses", traffic: "Heavy vehicles", colours: "Grey, red, charcoal", price: "₦6,700", unit: "m²" },
  { id: "hex-80", name: "Hex Type Paver 80mm", category: "Paving Stones", image: hex, gallery: [hex], installationVideo: installHex80.url, description: "Hexagonal paver with a distinctive look and good load spread. Great for feature areas and estates.", size: "200×200×80mm (hex)", strength: "40 N/mm²", weight: "~175 kg/m²", absorption: "≤ 6%", bestFor: "Feature areas, estates, plazas", traffic: "Cars", colours: "Grey, red", price: "₦6,800", unit: "m²" },
  { id: "decor-slab", name: "Decor Slab", category: "Slabs", image: slab, gallery: [slab], installationVideo: installDecorSlab.url, description: "Patterned decorative slabs for gardens, poolsides and patios.", size: "400×400×50mm", strength: "25 N/mm²", weight: "~18 kg", absorption: "≤ 8%", bestFor: "Gardens, poolsides, patios", traffic: "Pedestrian", colours: "Grey, charcoal", price: "₦2,500", unit: "piece" },
  { id: "square-slab", name: "Square Slab", category: "Slabs", image: slab, gallery: [slab], installationVideo: installSquareSlab.url, description: "Plain square slabs for stepping paths, rooftops and clean modern patios.", size: "500×500×50mm", strength: "25 N/mm²", weight: "~28 kg", absorption: "≤ 8%", bestFor: "Stepping paths, patios", traffic: "Pedestrian", colours: "Grey", price: "₦3,000", unit: "piece" },
  { id: "hollow-9", name: '9" Hollow Sandcrete Block', category: "Blocks", image: hollow, gallery: [hollow], installationVideo: installHollow9.url, description: "Standard 9-inch block for external and load-bearing walls and fences.", size: "450×225×225mm", strength: "3.5 N/mm²", weight: "~23 kg", absorption: "≤ 12%", bestFor: "Load-bearing walls, fences", traffic: "—", colours: "Natural grey", price: "₦650", unit: "block" },
  { id: "hollow-6", name: '6" Hollow Sandcrete Block', category: "Blocks", image: hollow, gallery: [hollow], installationVideo: installHollow6.url, description: "Lighter 6-inch block for internal partitions and non-load-bearing walls.", size: "450×225×150mm", strength: "2.5 N/mm²", weight: "~17 kg", absorption: "≤ 12%", bestFor: "Partitions, internal walls", traffic: "—", colours: "Natural grey", price: "₦520", unit: "block" },
  { id: "kerb-road", name: "Road Kerb", category: "Kerbs & Drainage", image: kerb, gallery: [kerb, hump], installationVideo: installKerbRoad.url, description: "Precast kerb that holds road paving in place and guides water to drains.", size: "1000×300×150mm", strength: "40 N/mm²", weight: "~105 kg", absorption: "≤ 6%", bestFor: "Road edges, estates", traffic: "Edge restraint", colours: "Grey, black & white", price: "₦3,900", unit: "piece" },
  { id: "kerb-garden", name: "Garden Kerb", category: "Kerbs & Drainage", image: kerb, gallery: [kerb], installationVideo: installKerbGarden.url, description: "Slim kerb for neat edges on garden beds and walkways.", size: "500×200×100mm", strength: "30 N/mm²", weight: "~22 kg", absorption: "≤ 6%", bestFor: "Garden beds, walkways", traffic: "Edge restraint", colours: "Grey", price: "₦1,200", unit: "piece" },
  { id: "kerb-parking", name: "Parking Kerb (Wheel Stop)", category: "Kerbs & Drainage", image: kerb, gallery: [kerb], installationVideo: installKerbParking.url, description: "Wheel stop for car parks so vehicles park neatly without hitting walls.", size: "1800×150×100mm", strength: "35 N/mm²", weight: "~60 kg", absorption: "≤ 6%", bestFor: "Car parks, garages", traffic: "Cars", colours: "Grey, yellow & black", price: "₦8,500", unit: "piece" },
  { id: "u-drain", name: "U-Drain Channel", category: "Kerbs & Drainage", image: drainage, gallery: [drainage], installationVideo: installUDrain.url, description: "Precast open drainage channel for roadsides and estates with heavy rainy-season runoff.", size: "1000×450×450mm", strength: "35 N/mm²", weight: "~210 kg", absorption: "≤ 6%", bestFor: "Roadside drains, estates", traffic: "Drainage", colours: "Natural grey", price: "₦28,000", unit: "piece" },
  { id: "box-culvert", name: "Box Culvert", category: "Kerbs & Drainage", image: drainage, gallery: [drainage], installationVideo: installBoxCulvert.url, description: "Reinforced box section for road crossings and large water channels.", size: "1000×1000×1000mm", strength: "40 N/mm²", weight: "~1,400 kg", absorption: "≤ 6%", bestFor: "Road crossings, large channels", traffic: "Heavy vehicles above", colours: "Natural grey", price: "₦185,000", unit: "piece" },
  { id: "speed-hump", name: "Speed Hump", category: "Road Safety", image: hump, gallery: [hump], installationVideo: installSpeedHump.url, description: "Concrete speed hump section for estates, schools and car parks.", size: "500×300×75mm", strength: "40 N/mm²", weight: "~25 kg", absorption: "≤ 6%", bestFor: "Estates, schools, car parks", traffic: "Traffic calming", colours: "Yellow & black", price: "₦6,000", unit: "piece" },
  { id: "median-barrier", name: "Median Barrier", category: "Road Safety", image: kerb, gallery: [kerb], installationVideo: installMedianBarrier.url, description: "Precast barrier to separate lanes and protect sites.", size: "2000×600×800mm", strength: "40 N/mm²", weight: "~1,200 kg", absorption: "≤ 6%", bestFor: "Roads, site security", traffic: "Lane separation", colours: "Grey, painted", price: "₦145,000", unit: "piece" },
];

export const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

export const specRows: { key: keyof Product; label: string }[] = [
  { key: "size", label: "Size" },
  { key: "strength", label: "Compressive strength" },
  { key: "weight", label: "Weight" },
  { key: "absorption", label: "Water absorption" },
  { key: "traffic", label: "Traffic rating" },
  { key: "bestFor", label: "Best for" },
];
