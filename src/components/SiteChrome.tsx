import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/learn", label: "Learn" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/compare", label: "Compare" },
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/quote" className="rounded-sm bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground transition-colors hover:bg-safety">Request a quote</Link>
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
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-8 sm:px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-mono text-xs text-muted-foreground">· Know Your Blocks. Build With Confidence.</span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">© 2026 Jummy Blocks · Lagos, Nigeria</p>
      </div>
    </footer>
  );
}
