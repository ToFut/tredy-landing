import Link from "next/link";
import { offerings, site } from "@/lib/content";

const studio = [
  { href: "/#approach", label: "Approach" },
  { href: "/#industries", label: "Industries" },
  { href: "/#work", label: "Work" },
  { href: "/#why", label: "Why Futurix" },
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
            Voice agents, AI assistants, custom projects, and AI enablement for
            businesses that want the work in production.
          </p>
          <p className="footer-meta">
            {site.location}
            <br />
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
        <div>
          <p className="kicker">Offerings</p>
          <ul className="footer-links">
            {offerings.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`}>{item.title}</Link>
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
        <p className="footer-end">Futurix. {site.location}.</p>
      </div>
    </footer>
  );
}
