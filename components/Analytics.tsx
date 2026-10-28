import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const valid = Boolean(id && /^G-[A-Z0-9]+$/i.test(id));

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
      {valid ? (
        <Script id="ga4" strategy="afterInteractive">
          {`var dnt = navigator.doNotTrack || window.doNotTrack;
if (!(dnt === "1" || dnt === "yes")) {
  var s = document.createElement("script");
  s.src = "https://www.googletagmanager.com/gtag/js?id=${id}";
  s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", "${id}");
}`}
        </Script>
      ) : null}
    </>
  );
}
