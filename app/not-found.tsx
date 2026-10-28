import { BookLink } from "@/components/ui/Actions";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="band missing">
      <div className="wrap">
        <p className="kicker">404</p>
        <h1 className="type-h1">That page is not here.</h1>
        <p className="type-body">Try the homepage, a service, or book a call.</p>
        <div className="actions">
          <BookLink location="404" />
          <Link className="btn btn-secondary" href="/">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
