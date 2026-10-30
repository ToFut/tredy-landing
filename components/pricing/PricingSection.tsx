import Link from "next/link";
import { Actions } from "@/components/ui/Actions";
import { pricingAddons, pricingHeadline, pricingIntro, pricingNotes, receptionistTiers } from "@/lib/pricing";

export function PricingSection({
  id = "pricing",
  showIntro = true,
  showAddons = false,
}: {
  id?: string;
  showIntro?: boolean;
  showAddons?: boolean;
}) {
  return (
    <section className="band fx-pricing tone-b" id={id}>
      <div className="wrap">
        {showIntro ? (
          <>
            <p className="kicker">Pricing</p>
            <h2 className="fx-title">{pricingHeadline}</h2>
            <p className="fx-lede">{pricingIntro}</p>
          </>
        ) : (
          <h2 className="fx-title">Three receptionist packages</h2>
        )}
        <div className="fx-prices">
          {receptionistTiers.map((tier) => (
            <article key={tier.id} className={tier.featured ? "fx-tier is-featured" : "fx-tier"}>
              {tier.badge ? <p className="fx-badge">{tier.badge}</p> : <p className="fx-badge fx-badge-quiet">Package</p>}
              <h3>{tier.name}</h3>
              <p className="fx-best">{tier.bestFor}</p>
              <p className="fx-cost">
                <strong>{tier.setup}</strong>
                <span>{tier.monthly}</span>
              </p>
              <p className="fx-minutes">{tier.minutes}</p>
              <p>{tier.summary}</p>
              <ul>
                {tier.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="fx-when">{tier.timeline}</p>
            </article>
          ))}
        </div>
        {showAddons ? (
          <div className="fx-addons">
            <h3>Add-ons, quoted separately</h3>
            <ul>
              {pricingAddons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="fx-notes">
          {pricingNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
        <Actions demoHref="/#demo" location="pricing" />
        <p className="fx-mail">
          Or email <a href="mailto:segev@futurixs.com">segev@futurixs.com</a>
          {id === "packages" ? null : (
            <>
              {" "}
              · <Link href="/pricing">Full pricing page</Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
