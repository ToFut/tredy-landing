"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/voice-agents", label: "Voice Agents" },
  { href: "/ai-assistants", label: "AI Assistants" },
  { href: "/custom-projects", label: "Custom Projects" },
  { href: "/ai-enablement", label: "AI Enablement" },
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
          {links.map((item) => (
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
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>
            About
          </Link>
          <Link href="/blog" aria-current={pathname === "/blog" ? "page" : undefined}>
            Blog
          </Link>
        </nav>
        <Link className="btn btn-solid header-cta" href="/get-started">
          Get started
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
            {links.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
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
            <Link className="btn btn-solid" href="/get-started" onClick={() => setOpen(false)}>
              Get started
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
