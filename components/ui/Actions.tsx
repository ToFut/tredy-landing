import Link from "next/link";
import { bookCallHref, demoLabel, planLabel } from "@/lib/content";

export function BookLink({
  className = "btn btn-primary",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link className={className} href={bookCallHref} onClick={onClick}>
      {planLabel}
    </Link>
  );
}

export function Actions({ demoHref }: { demoHref?: string }) {
  return (
    <div className="actions">
      <BookLink />
      {demoHref ? (
        <Link className="btn btn-secondary" href={demoHref}>
          {demoLabel}
        </Link>
      ) : null}
    </div>
  );
}
