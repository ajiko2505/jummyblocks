import { createFileRoute, Link } from "@tanstack/react-router";
import { site, waLink, defaultWaMessage } from "@/lib/site";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`;
const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&z=16&output=embed`;

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Contact Us — Jummy Blocks, Ikoyi Lagos" },
      { name: "description", content: "Call, WhatsApp, email or visit Jummy Blocks at No 11 Jubril Aminu, Parkview Estate, Ikoyi, Lagos. Get directions to our Ikoyi yard." },
      { property: "og:title", content: "Contact Jummy Blocks" },
      { property: "og:description", content: "Reach us by phone, WhatsApp or email, or visit us in Ikoyi, Lagos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, telephone: "+2348066278073", email: site.email, url: "https://jummyblocks.lovable.app", address: { "@type": "PostalAddress", streetAddress: "No 11 Jubril Aminu, Parkview Estate", addressLocality: "Ikoyi", addressRegion: "Lagos", addressCountry: "NG" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "17:00" }], sameAs: [site.facebook, site.instagram, site.tiktok] }) }],
  }),
  component: Contact,
});

function Contact() {
  const items: { label: string; value: string; href?: string }[] = [
    { label: "Visit", value: site.address, href: directionsUrl },
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
            <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-safety">TikTok</a>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-md border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4">
          <div>
            <p className="font-mono text-xs uppercase text-muted-foreground">Find us</p>
            <p className="mt-1 text-lg font-bold">{site.address}</p>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-safety">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 11 21 3l-8 18-2-7-8-3Z"/></svg>
            Get directions
          </a>
        </div>
        {embedUrl ? (
          <iframe
            title={`Google map showing Jummy Blocks at ${site.address}`}
            src={embedUrl}
            className="h-[320px] w-full border-0 sm:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="grid h-[220px] place-items-center px-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground">The map is not available right now.</p>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block rounded-sm border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Open in Google Maps</a>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/book" className="rounded-sm bg-safety px-6 py-3 text-sm font-semibold text-safety-foreground">Book a time</Link>
        <a href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer" className="rounded-sm bg-whatsapp px-6 py-3 text-sm font-semibold text-whatsapp-foreground">Chat on WhatsApp</a>
        <Link to="/quote" className="rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground hover:bg-safety">Request a quote</Link>
      </div>
    </div>
  );
}
