import { CalendarCheck, GraduationCap, Inbox, Phone } from "lucide-react";
import Link from "next/link";
import { BookLink } from "@/components/ui/Actions";
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
                {item.id === "receptionist" ? (
                  <p className="price-note">
                    <Link href="/pricing">From $1,495 setup and $349/mo</Link>
                  </p>
                ) : (
                  <p className="price-note">Quoted on the live setup</p>
                )}
                <BookLink location="packages" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
