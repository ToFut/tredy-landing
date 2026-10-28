"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalEmbed } from "@/components/book/CalEmbed";
import { bookCallHref, demoLabel, planLabel } from "@/lib/content";
import { track } from "@/lib/track";

const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

export function BookLink({
  className = "btn btn-primary",
  onClick,
  location = "section",
  hero = false,
}: {
  className?: string;
  onClick?: () => void;
  location?: string;
  hero?: boolean;
}) {
  function open(event: { preventDefault: () => void }) {
    track("cta_click", { location });
    onClick?.();
    if (calLink) {
      event.preventDefault();
      window.dispatchEvent(new Event("open-cal"));
    }
  }

  return (
    <Link className={className} href={bookCallHref} data-hero-cta={hero ? "" : undefined} onClick={open}>
      {planLabel}
    </Link>
  );
}

export function Actions({
  demoHref,
  demoText,
  location = "section",
  hero = false,
}: {
  demoHref?: string;
  demoText?: string;
  location?: string;
  hero?: boolean;
}) {
  return (
    <div className="actions">
      <BookLink location={location} hero={hero} />
      {demoHref ? (
        <Link className="btn btn-secondary" href={demoHref}>
          {demoText || demoLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function StickyBook() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const target = document.querySelector("[data-hero-cta]");
    if (!target) {
      setOn(true);
      return;
    }
    const watch = new IntersectionObserver(([entry]) => {
      setOn(!entry?.isIntersecting);
    });
    watch.observe(target);
    return () => watch.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("sticky-on", on);
    return () => document.body.classList.remove("sticky-on");
  }, [on]);

  return <BookLink className={on ? "sticky-cta btn btn-primary is-on" : "sticky-cta btn btn-primary"} location="sticky" />;
}

export function BookModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("open-cal", onOpen);
    return () => window.removeEventListener("open-cal", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!calLink || !open) return null;

  return (
    <div className="cal-modal" role="presentation" onClick={() => setOpen(false)}>
      <div
        className="cal-modal-card"
        role="dialog"
        aria-modal="true"
        aria-label="Book a free 15-min call"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="btn btn-secondary" type="button" onClick={() => setOpen(false)}>
          Close
        </button>
        <CalEmbed link={calLink} />
      </div>
    </div>
  );
}
