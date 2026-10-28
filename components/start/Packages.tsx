import { CalendarCheck, GraduationCap, Inbox, Phone } from "lucide-react";
import Link from "next/link";
import { packages } from "@/lib/start";

const packageIcons = [Phone, CalendarCheck, Inbox, GraduationCap];

export function Packages() {
  return (
    <section id="packages" className="section home-block">
      <div className="wrap">
        <p className="kicker">Starter setups</p>
        <h2>Pick a setup. Pricing on a quick call.</h2>
        <p className="one-line">Set up in days, not months.</p>
        <div className="package-grid">
          {packages.map((item, index) => {
            const Icon = packageIcons[index] ?? Phone;
            return (
              <article key={item.id} className="package-card">
                <Icon aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.line}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <p className="price-note">Pricing on a quick call</p>
                <Link className="btn btn-solid btn-lg" href="/get-started">
                  Start setup
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
