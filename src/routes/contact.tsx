import { createFileRoute, Link } from "@tanstack/react-router";
import { site, waLink, defaultWaMessage } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Contact Us — Jummy Blocks, Ikoyi Lagos" },
      { name: "description", content: "Call, WhatsApp, email or visit Jummy Blocks at No 11 Jubril Aminu, Parkview Estate, Ikoyi, Lagos." },
      { property: "og:title", content: "Contact Jummy Blocks" },
      { property: "og:description", content: "Reach us by phone, WhatsApp or email, or visit us in Ikoyi, Lagos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, telephone: "+2348066278073", email: site.email, url: "https://pixel-perfect-paint-949.lovable.app", address: { "@type": "PostalAddress", streetAddress: "No 11 Jubril Aminu, Parkview Estate", addressLocality: "Ikoyi", addressRegion: "Lagos", addressCountry: "NG" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "17:00" }], sameAs: [site.facebook, site.instagram] }) }],
  }),
  component: Contact,
});

function Contact() {
  const items: { label: string; value: string; href?: string }[] = [
    { label: "Visit", value: site.address, href: `https://maps.google.com/?q=${encodeURIComponent(site.address)}` },
    { label: "Call", value: site.phoneDisplay, href: `tel:+${site.whatsapp}` },
    { label: "WhatsApp", value: site.phoneDisplay, href: waLink(defaultWaMessage) },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Hours", value: site.hours },
  ];
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Contact us</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Let's talk about your project.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">The fastest way to reach us is WhatsApp. For a detailed price, send a quote request.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <div key={i.label} className="rounded-md border bg-card p-6">
            <p className="font-mono text-xs uppercase text-muted-foreground">{i.label}</p>
            {i.href ? (
              <a href={i.href} target={i.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-2 block text-lg font-bold hover:text-safety">{i.value}</a>
            ) : <p className="mt-2 text-lg font-bold">{i.value}</p>}
          </div>
        ))}
        <div className="rounded-md border bg-card p-6">
          <p className="font-mono text-xs uppercase text-muted-foreground">Follow us</p>
          <div className="mt-2 flex gap-4 text-lg font-bold">
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-safety">Facebook</a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-safety">Instagram</a>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer" className="rounded-sm bg-whatsapp px-6 py-3 text-sm font-semibold text-whatsapp-foreground">Chat on WhatsApp</a>
        <Link to="/quote" className="rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground hover:bg-safety">Request a quote</Link>
      </div>
    </div>
  );
}
