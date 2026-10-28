"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { bookCallHref } from "@/lib/content";

const offerings = [
  { href: "/voice-agents", label: "Voice Agents" },
  { href: "/ai-assistants", label: "AI Assistants" },
  { href: "/custom-projects", label: "Custom Projects" },
  { href: "/ai-enablement", label: "AI Enablement" },
];

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#demo", label: "Live demo" },
  { href: "/about", label: "About" },
];

const industries = [
  { href: "/industries/roofing", label: "Roofing" },
  { href: "/industries/home-services", label: "Home Services" },
  { href: "/industries/real-estate", label: "Real Estate" },
  { href: "/industries/property-management", label: "Property Management" },
  { href: "/industries/insurance", label: "Insurance" },
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
          <Link href="/#work" aria-current={pathname === "/#work" ? "page" : undefined}>
            Work
          </Link>
          <div className="nav-drop">
            <button type="button" className="nav-drop-btn" aria-haspopup="true">
              Offerings
            </button>
            <div className="nav-menu">
              {offerings.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {links.slice(1).map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
          <div className="nav-drop">
            <button type="button" className="nav-drop-btn" aria-haspopup="true">
              Industries
            </button>
            <div className="nav-menu">
              {industries.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <Link className="btn btn-solid header-cta" href={bookCallHref}>
          Book a call
        </Link>
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
            <Link href="/#work" onClick={() => setOpen(false)}>
              Work
            </Link>
            <p className="kicker">Offerings</p>
            {offerings.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/#demo" onClick={() => setOpen(false)}>
              Live demo
            </Link>
            <p className="kicker">Industries</p>
            {industries.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link className="btn btn-solid" href={bookCallHref} onClick={() => setOpen(false)}>
              Book a call
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
