import type { Metadata } from "next";
import { BookFlow } from "@/components/book/BookFlow";
import { CalEmbed } from "@/components/book/CalEmbed";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a free 15-minute live setup | Futurix",
  description: "Book a free 15-minute live setup with Futurix. We will look at your phone and tell you the first receptionist to launch.",
  path: "/book",
});

export default function BookPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
  return (
    <section className="book-page">
      <div className={calLink ? "book-card book-card-wide" : "book-card"}>
        <p className="kicker">Live setup</p>
        <h1 className="type-h1">Book a free 15-minute live setup</h1>
        <p className="type-body">We will look at your phone, leads, or tools and tell you the first thing to set up.</p>
        {calLink ? (
          <div className="book-cal">
            <CalEmbed link={calLink} />
          </div>
        ) : (
          <BookFlow />
        )}
      </div>
    </section>
  );
}
