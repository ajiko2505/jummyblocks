import interlock from "@/assets/interlock.jpg";
import hollow from "@/assets/hollow.jpg";
import kerb from "@/assets/kerb.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  size: string;
  strength: string;
  weight: string;
  absorption: string;
  bestFor: string;
  traffic: string;
  price: string;
  unit: string;
};

export const products: Product[] = [
  { id: "interlock-60", name: "Interlock Paver 60mm", category: "Interlocks", image: interlock, size: "225×112×60mm", strength: "30 N/mm²", weight: "~130 kg/m²", absorption: "≤ 6%", bestFor: "Walkways, gardens, patios", traffic: "Pedestrian / light", price: "₦4,800", unit: "m²" },
  { id: "interlock-80", name: "Heavy-Duty Interlock 80mm", category: "Interlocks", image: interlock, size: "225×112×80mm", strength: "45 N/mm²", weight: "~175 kg/m²", absorption: "≤ 6%", bestFor: "Driveways, estates, parking", traffic: "Cars & trucks", price: "₦6,500", unit: "m²" },
  { id: "hollow-9", name: '9" Hollow Sandcrete', category: "Blocks", image: hollow, size: "450×225×225mm", strength: "3.5 N/mm²", weight: "~23 kg", absorption: "≤ 12%", bestFor: "Load-bearing walls, fences", traffic: "—", price: "₦650", unit: "block" },
  { id: "hollow-6", name: '6" Hollow Sandcrete', category: "Blocks", image: hollow, size: "450×225×150mm", strength: "2.5 N/mm²", weight: "~17 kg", absorption: "≤ 12%", bestFor: "Partitions, internal walls", traffic: "—", price: "₦520", unit: "block" },
  { id: "kerb-road", name: "Road Kerb", category: "Kerbs & Drainage", image: kerb, size: "1000×300×150mm", strength: "40 N/mm²", weight: "~105 kg", absorption: "≤ 6%", bestFor: "Road edges, estates", traffic: "Edge restraint", price: "₦3,900", unit: "piece" },
  { id: "kerb-garden", name: "Garden Kerb", category: "Kerbs & Drainage", image: kerb, size: "500×200×100mm", strength: "30 N/mm²", weight: "~22 kg", absorption: "≤ 6%", bestFor: "Garden beds, walkways", traffic: "Edge restraint", price: "₦1,200", unit: "piece" },
];

export const specRows: { key: keyof Product; label: string }[] = [
  { key: "size", label: "Size" },
  { key: "strength", label: "Compressive strength" },
  { key: "weight", label: "Weight" },
  { key: "absorption", label: "Water absorption" },
  { key: "traffic", label: "Traffic rating" },
  { key: "bestFor", label: "Best for" },
];
