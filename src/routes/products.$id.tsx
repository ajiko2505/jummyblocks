import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { products, specRows } from "@/lib/products";
import { site, waLink } from "@/lib/site";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { fetchShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

function AddToCart({ handle }: { handle: string }) {
  const { data: sp } = useQuery({ queryKey: ["shopify-product", handle], queryFn: () => fetchShopifyProduct(handle), staleTime: 60_000 });
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = sp?.node.variants.edges[0]?.node;
  if (!sp || !variant) return null;
  return (
    <button
      disabled={isLoading || !variant.availableForSale}
      onClick={async () => {
        await addItem({ product: sp, variantId: variant.id, variantTitle: variant.title, price: variant.price, quantity: 1, selectedOptions: variant.selectedOptions });
        toast.success(`${sp.node.title} added to cart`, { position: "top-center" });
      }}
      className="flex items-center gap-2 rounded-sm bg-safety px-6 py-3 text-sm font-semibold text-safety-foreground hover:bg-safety/85 disabled:opacity-60"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : variant.availableForSale ? "Add to cart" : "Out of stock"}
    </button>
  );
}

export const Route = createFileRoute("/products/$id")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found — Jummy Blocks" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const t = `${p.name} — Jummy Blocks`;
    return { meta: [{ title: t }, { name: "description", content: p.description }, { property: "og:title", content: t }, { property: "og:description", content: p.description }, { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary" }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, category: p.category, image: p.gallery.map((g) => `https://pixel-perfect-paint-949.lovable.app${g}`), brand: { "@type": "Brand", name: "Jummy Blocks" }, offers: { "@type": "Offer", priceCurrency: "NGN", price: p.price.replace(/[^0-9.]/g, ""), availability: "https://schema.org/InStock", url: `https://pixel-perfect-paint-949.lovable.app/products/${p.id}` } }) }] };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
      <h1 className="text-3xl font-extrabold">Product not found</h1>
      <Link to="/catalogue" className="mt-4 inline-block font-semibold underline">Back to catalogue</Link>
    </div>
  );
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const msg = `Hello Jummy Blocks, I'd like to buy ${p.name} (${p.price}/${p.unit}). Please share availability and delivery cost.`;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
      <nav className="mb-6 font-mono text-xs text-muted-foreground">
        <Link to="/catalogue" className="hover:text-foreground">Catalogue</Link> / {p.category}
      </nav>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img src={p.gallery[img] ?? p.image} alt={p.name} width={944} height={704} className="aspect-[4/3] w-full rounded-md border object-cover" />
          {p.gallery.length > 1 && (
            <div className="mt-3 flex gap-2">
              {p.gallery.map((g, i) => (
                <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1} of ${p.name}`} aria-pressed={i === img} className={`overflow-hidden rounded-sm border-2 ${i === img ? "border-safety" : "border-transparent"}`}>
                  <img src={g} alt="" width={944} height={704} loading="lazy" className="h-16 w-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="eyebrow mb-2">{p.category}</p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{p.name}</h1>
          <p className="mt-3 text-muted-foreground">{p.description}</p>
          <p className="mt-5 font-mono text-3xl font-bold">{p.price}<span className="text-base text-muted-foreground"> / {p.unit}</span></p>
          <p className="font-mono text-xs text-muted-foreground">Indicative price, ex-delivery</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCart handle={p.shopifyHandle ?? p.id} />
            <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-safety px-6 py-3 text-sm font-semibold text-foreground hover:bg-safety hover:text-safety-foreground">Buy on WhatsApp</a>
            {(p.buyUrl || site.shopUrl) && <a href={p.buyUrl || site.shopUrl} target="_blank" rel="noopener noreferrer" className="rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground hover:bg-safety">Buy online</a>}
            <Link to="/quote" search={{ product: p.id }} className="rounded-sm border border-foreground px-6 py-3 text-sm font-semibold hover:bg-ink hover:text-ink-foreground">Request a quote</Link>
          </div>
          <dl className="mt-8 divide-y rounded-md border bg-card">
            {[...specRows, { key: "colours" as const, label: "Colours" }].map((r) => (
              <div key={r.key} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-4 py-3 text-sm">
                <dt className="text-muted-foreground">{r.label}</dt>
                <dd className="text-right font-mono">{String(p[r.key])}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <section className="mt-14 border-y py-10" aria-labelledby="installation-video-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-2">Installation video</p>
            <h2 id="installation-video-heading" className="text-2xl font-extrabold tracking-tight">See how {p.name} is installed</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">A short site demonstration showing the correct setting and finishing process.</p>
        </div>
        <div className="overflow-hidden rounded-md border bg-ink">
          <video
            className="aspect-video w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={p.image}
            aria-label={`Installation demonstration for ${p.name}`}
          >
            <source src={p.installationVideo} type="video/mp4" />
            Your browser does not support this video.
          </video>
        </div>
      </section>
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-extrabold">Related products</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} to="/products/$id" params={{ id: r.id }} className="overflow-hidden rounded-md border bg-card hover:border-foreground">
                <img src={r.image} alt={r.name} width={944} height={704} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <p className="p-4 font-bold">{r.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
