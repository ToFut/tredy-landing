import type { Metadata } from "next";
import { homeFaqs, offerings, site } from "@/lib/content";
import type { FaqItem, Post, TopicPageData } from "@/lib/types";

export function absoluteUrl(path: string) {
  if (path === "/") return site.url;
  return `${site.url}${path}`;
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(input.path);
  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical: input.path },
    robots: { index: true, follow: true },
    openGraph: {
      type: input.type ?? "website",
      url,
      siteName: site.name,
      title: input.title,
      description: input.description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    addressLocality: "Suffern",
    addressRegion: "NY",
    addressCountry: "US",
  };
}

function organization() {
  return {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.contactEmail,
    description: site.description,
    address: postalAddress(),
    areaServed: "US",
    founder: {
      "@type": "Person",
      name: site.founder,
      sameAs: site.founderLinkedIn,
    },
    sameAs: [site.founderLinkedIn],
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      {
        "@type": "ProfessionalService",
        name: site.name,
        url: site.url,
        email: site.contactEmail,
        description: site.description,
        address: postalAddress(),
        areaServed: "US",
        founder: {
          "@type": "Person",
          name: site.founder,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Futurix offerings",
          itemListElement: offerings.map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.title,
              description: item.description,
              url: absoluteUrl(item.path),
            },
          })),
        },
      },
      faqNode(homeFaqs),
    ],
  };
}

export function serviceJsonLd(page: TopicPageData) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.h1,
        serviceType: page.serviceType,
        description: page.description,
        url: absoluteUrl(page.path),
        areaServed: "US",
        provider: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
      },
      faqNode(page.faqs),
      breadcrumbNode(page.crumbs),
    ],
  };
}

export function industryJsonLd(page: TopicPageData) {
  return {
    "@context": "https://schema.org",
    "@graph": [faqNode(page.faqs), breadcrumbNode(page.crumbs)],
  };
}

export function aboutJsonLd(page: TopicPageData) {
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), faqNode(page.faqs), breadcrumbNode(page.crumbs)],
  };
}

export function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.h1,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Person",
          name: post.author,
          url: site.founderLinkedIn,
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        mainEntityOfPage: absoluteUrl(post.path),
        url: absoluteUrl(post.path),
      },
      faqNode(post.faqs),
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.h1, path: post.path },
      ]),
    ],
  };
}

export function breadcrumbOnlyJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    ...breadcrumbNode(crumbs),
  };
}

function faqNode(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function breadcrumbNode(crumbs: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
