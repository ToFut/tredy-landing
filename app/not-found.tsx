import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-lead legal">
      <div className="wrap">
        <p className="kicker">404</p>
        <h1>That page is not here.</h1>
        <p>The work lives on the homepage: voice agents, assistants, custom projects, and AI enablement.</p>
        <p>
          <Link className="btn btn-solid" href="/">
            Back to Futurix
          </Link>
        </p>
      </div>
    </section>
  );
}
