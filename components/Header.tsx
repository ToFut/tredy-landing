"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { Logo } from "@/components/Logo";

function target(hash: string, pathname: string) {
  return pathname === "/" ? hash : `/${hash}`;
}

export function Header() {
  const pathname = usePathname();
  return <HeaderBar key={pathname} pathname={pathname} />;
}

function HeaderBar({ pathname }: { pathname: string }) {
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
          {nav.map((item) => (
            <Link key={item.href} href={target(item.href, pathname)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-solid header-cta" href={target("#contact", pathname)}>
          Book a 15-minute call
          <span aria-hidden="true"> →</span>
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
            {nav.map((item) => (
              <Link key={item.href} href={target(item.href, pathname)} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href={target("#approach", pathname)} onClick={() => setOpen(false)}>
              Approach
            </Link>
            <Link className="btn btn-solid" href={target("#contact", pathname)} onClick={() => setOpen(false)}>
              Book a 15-minute call
              <span aria-hidden="true"> →</span>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
