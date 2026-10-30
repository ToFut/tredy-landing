import Link from "next/link";
import { offerings, site } from "@/lib/content";
import { industryPages } from "@/lib/industries";

const studio = [
  { href: "/pricing", label: "Pricing" },
  { href: "/get-started", label: "Live demo" },
  { href: "/about", label: "About" },
  { href: "/#how", label: "How we work" },
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">Futurix</p>
          <p className="footer-blurb">
            AI voice receptionists for local businesses. We answer every call, book the appointment, and follow up.
            Automations and custom software when the desk needs more than a voice.
          </p>
          <p className="footer-meta">
            Futurix
            <br />
            {site.address}
            <br />
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
          <p className="type-small">Platforms we build with. Not clients. Names belong to their owners.</p>
        </div>
        <div>
          <p className="kicker">Offerings</p>
          <ul className="footer-links">
            {offerings.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker">Industries</p>
          <ul className="footer-links">
            {industryPages.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>{item.crumbs[item.crumbs.length - 1]?.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker">Studio</p>
          <ul className="footer-links">
            {studio.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap">
        <p className="wordmark">Futurix</p>
        <p className="footer-end">Futurix, {site.address}.</p>
      </div>
    </footer>
  );
}
