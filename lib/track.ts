export function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const nav = navigator as Navigator & { doNotTrack?: string };
  const win = window as Window & { doNotTrack?: string; gtag?: (...args: unknown[]) => void };
  const dnt = nav.doNotTrack || win.doNotTrack;
  if (dnt === "1" || dnt === "yes") return;
  win.gtag?.("event", event, params);
  void import("@vercel/analytics")
    .then(({ track: vercelTrack }) => vercelTrack(event, params))
    .catch(() => undefined);
}
