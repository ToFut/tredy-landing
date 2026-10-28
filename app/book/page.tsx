import type { Metadata } from "next";
import { BookFlow } from "@/components/book/BookFlow";
import { CalEmbed } from "@/components/book/CalEmbed";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a free 15-min call | Futurix",
  description: "Tell us your name and how to reach you. Pick a day and time. We will call you within 1 business day.",
  path: "/book",
});

export default function BookPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
  return (
    <section className="book-page">
      <div className={calLink ? "book-card book-card-wide" : "book-card"}>
        <p className="eyebrow">Book a call</p>
        <h1 className="type-h1">Book a free 15-min call</h1>
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
