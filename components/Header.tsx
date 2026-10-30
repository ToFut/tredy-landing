"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { BookLink } from "@/components/ui/Actions";

const offerings = [
  { href: "/voice-agents", label: "Voice Agents" },
  { href: "/ai-assistants", label: "AI Assistants" },
  { href: "/custom-projects", label: "Custom Projects" },
  { href: "/ai-enablement", label: "AI Enablement" },
  { href: "/industries/roofing", label: "Roofing" },
  { href: "/industries/home-services", label: "Home services" },
  { href: "/industries/real-estate", label: "Real estate" },
  { href: "/industries/property-management", label: "Property management" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-bar">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary">
          <div className="nav-drop">
            <button
              type="button"
              className="nav-drop-btn"
              aria-haspopup="true"
              aria-current={offerings.some((item) => pathname === item.href) ? "page" : undefined}
            >
              Services
            </button>
            <div className="nav-menu">
              {offerings.map((item) => (
                <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/pricing" aria-current={pathname === "/pricing" ? "page" : undefined}>
            Pricing
          </Link>
          <Link href="/#demo">Live demo</Link>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>
            About
          </Link>
        </nav>
        <BookLink className="btn btn-primary header-cta" location="nav" />
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="mobile-nav">
          <nav aria-label="Mobile">
            <p className="kicker">Services</p>
            {offerings.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/pricing" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link href="/#demo" onClick={() => setOpen(false)}>
              Live demo
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <BookLink onClick={() => setOpen(false)} />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
