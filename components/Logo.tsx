import Link from "next/link";

export function Logo({ href = "/", tone = "onDark" }: { href?: string; tone?: "onDark" | "onLight" }) {
  return (
    <Link href={href} className={tone === "onLight" ? "logo logo-on-light" : "logo logo-on-dark"}>
      <img className="logo-cloud" src="/brand/cloud-f-icon.svg" alt="" width={36} height={36} />
      <span className="logo-word">Futurix</span>
    </Link>
  );
}
