"use client";

import { useEffect, useId, useRef } from "react";

type CalApi = {
  (...args: unknown[]): void;
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, CalApi>;
};

function installCal() {
  const host = window as Window & { Cal?: CalApi };
  if (host.Cal) return host.Cal;
  const Cal = function calQueue(this: unknown, ...args: unknown[]) {
    const cal = host.Cal as CalApi;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = [];
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.dataset.calEmbed = "true";
      document.head.appendChild(script);
      cal.loaded = true;
    }
    if (args[0] === "init") {
      const api = function namespaced(...inner: unknown[]) {
        api.q.push(inner);
      } as CalApi & { q: unknown[][] };
      api.q = [];
      const namespace = args[1];
      if (typeof namespace === "string") {
        cal.ns = cal.ns || {};
        cal.ns[namespace] = cal.ns[namespace] || (api as CalApi);
        (cal.ns[namespace] as CalApi & { q: unknown[] }).q.push(args);
        cal.q?.push(["initNamespace", namespace]);
      } else {
        cal.q?.push(args);
      }
      return;
    }
    cal.q?.push(args);
  } as CalApi;
  host.Cal = Cal;
  return Cal;
}

export function CalEmbed({ link }: { link: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const namespace = `book${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const cal = installCal();
    cal("init", namespace, { origin: "https://cal.com" });
    cal.ns?.[namespace]?.("inline", {
      elementOrSelector: node,
      calLink: link,
      config: { layout: "month_view", theme: "light" },
    });
    return () => {
      node.replaceChildren();
    };
  }, [link, namespace]);

  return <div className="cal-embed" ref={ref} />;
}
