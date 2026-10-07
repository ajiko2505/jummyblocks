import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { site, waLink, defaultWaMessage } from "@/lib/site";
import { CartDrawer } from "./CartDrawer";
import logoAsset from "@/assets/jummy-logo.png.asset.json";

const nav = [
  { to: "/learn", label: "Learn" },
  
  { to: "/catalogue", label: "Catalogue" },
  { to: "/compare", label: "Compare" },
  { to: "/advisor", label: "Advisor" },
  { to: "/contact", label: "Contact Us" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label="Jummy Blocks — home">
      <img src={logoAsset.url} alt="Jummy Blocks" width={180} height={132} className="h-14 w-auto sm:h-16" />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-1.5 font-mono text-xs">
          <span>{site.address}</span>
          <span className="flex gap-5"><span>{site.phoneDisplay}</span><span>{site.hours}</span></span>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground md:flex lg:gap-8">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/quote" className="hidden rounded-sm bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground transition-colors hover:bg-safety sm:inline-block">Request a quote</Link>
          <CartDrawer />
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-sm border md:hidden">
            <span className="font-mono text-sm">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t px-5 py-3 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 font-medium">{n.label}</Link>
          ))}
          <Link to="/quote" onClick={() => setOpen(false)} className="py-2.5 font-medium">Request a quote</Link>
        </nav>
      )}
    </header>
  );
}

export function WhatsAppButton() {
  return (
    <a href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground shadow-xl transition-transform hover:scale-105">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3Z"/></svg>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="eyebrow mb-3">Connect with us</p>
          <img src={logoAsset.url} alt="Jummy Blocks" width={180} height={132} loading="lazy" className="h-16 w-auto" />
          <p className="mt-3 text-sm text-ink-foreground/70">Quality paving stones, interlocks, blocks and kerbs for Nigerian projects.</p>
        </div>
        <div>
          <p className="eyebrow mb-3">Navigation</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-safety">Home</Link></li>
            <li><Link to="/learn" className="hover:text-safety">Learn</Link></li>
            <li><Link to="/catalogue" className="hover:text-safety">Products</Link></li>
            <li><Link to="/compare" className="hover:text-safety">Compare</Link></li>
            <li><Link to="/advisor" className="hover:text-safety">Block Advisor</Link></li>
            
            <li><Link to="/about" className="hover:text-safety">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-safety">Contact Us</Link></li>
            <li><Link to="/terms" className="hover:text-safety">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Contact us</p>
          <address className="space-y-2 text-sm not-italic text-ink-foreground/80">
            <p className="font-semibold text-ink-foreground">Jummy Blocks</p>
            <p>{site.address}</p>
            <p><a href={`tel:+${site.whatsapp}`} className="hover:text-safety">{site.phoneDisplay}</a></p>
            <p><a href={`mailto:${site.email}`} className="hover:text-safety">{site.email}</a></p>
            <p>{site.hours}</p>
          </address>
        </div>
        <div>
          <p className="eyebrow mb-3">Quality assured</p>
          <p className="text-sm text-ink-foreground/80">Products made to Nigerian Industrial Standards and tested for strength before delivery.</p>
          <p className="eyebrow mb-3 mt-6">Follow us</p>
          <a href={waLink("Hello Jummy Blocks!")} target="_blank" rel="noopener noreferrer" className="inline-block rounded-sm border border-ink-foreground/30 px-4 py-2 text-sm hover:border-safety hover:text-safety">WhatsApp</a>
          <div className="mt-2 flex flex-wrap gap-2">
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Jummy Blocks on Facebook" title="Facebook"
              className="grid h-10 w-10 place-items-center rounded-sm border border-ink-foreground/30 text-facebook transition-colors hover:border-facebook">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M14 8V6.5c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.6 3.4 10.6 6.1V8H8v3.2h2.6V22H14V11.2h2.7L17 8h-3Z"/></svg>
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Jummy Blocks on Instagram" title="Instagram"
              className="grid h-10 w-10 place-items-center rounded-sm border border-ink-foreground/30 transition-colors hover:border-instagram">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="url(#jb-ig-grad)" strokeWidth="2" aria-hidden="true">
                <defs>
                  <linearGradient id="jb-ig-grad" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
                    <stop offset="0" style={{ stopColor: "var(--instagram-1)" }} />
                    <stop offset="0.5" style={{ stopColor: "var(--instagram-2)" }} />
                    <stop offset="1" style={{ stopColor: "var(--instagram-3)" }} />
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" style={{ fill: "var(--instagram-3)", stroke: "none" }} />
              </svg>
            </a>
            <a href={site.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Jummy Blocks on TikTok" title="TikTok"
              className="grid h-10 w-10 place-items-center rounded-sm border border-ink-foreground/30 text-tiktok transition-colors hover:border-tiktok">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <g transform="translate(-0.7,-0.5)" style={{ fill: "var(--tiktok-cyan)" }}><path d="M12.53.02C13.84 0 15.14 0 16.44.01c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.58.07-5.36.01-4.03-.01-8.05.02-12.07Z"/></g>
                <g transform="translate(0.7,0.5)" style={{ fill: "var(--tiktok-pink)" }}><path d="M12.53.02C13.84 0 15.14 0 16.44.01c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.58.07-5.36.01-4.03-.01-8.05.02-12.07Z"/></g>
                <path className="fill-current" d="M12.53.02C13.84 0 15.14 0 16.44.01c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.58.07-5.36.01-4.03-.01-8.05.02-12.07Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 font-mono text-xs text-ink-foreground/60 sm:px-6">
          <p>Copyright © 2026 Jummy Blocks. All rights reserved.</p>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-safety">Scroll to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
