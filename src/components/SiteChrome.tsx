import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { site, waLink, defaultWaMessage } from "@/lib/site";
import { CartDrawer } from "./CartDrawer";

const nav = [
  { to: "/learn", label: "Learn" },
  
  { to: "/catalogue", label: "Catalogue" },
  { to: "/compare", label: "Compare" },
  { to: "/advisor", label: "Advisor" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-sm bg-ink font-mono text-sm font-bold text-ink-foreground">JB</span>
      <span className="text-lg font-extrabold tracking-tight">JUMMY<span className="text-safety">BLOCKS</span></span>
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
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
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
          <p className="text-2xl font-extrabold tracking-tight">JUMMY<span className="text-safety">BLOCKS</span></p>
          <p className="mt-3 text-sm text-ink-foreground/70">Know Your Blocks. Build With Confidence. Quality paving stones, interlocks, blocks and kerbs for Nigerian projects.</p>
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
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center gap-2 rounded-sm border border-ink-foreground/30 px-4 py-2 text-sm hover:border-safety hover:text-safety">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M14 8V6.5c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.6 3.4 10.6 6.1V8H8v3.2h2.6V22H14V11.2h2.7L17 8h-3Z"/></svg>Facebook</a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center gap-2 rounded-sm border border-ink-foreground/30 px-4 py-2 text-sm hover:border-safety hover:text-safety">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" className="fill-current"/></svg>Instagram</a>
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
