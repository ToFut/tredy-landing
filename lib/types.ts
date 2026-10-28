export type FaqItem = {
  question: string;
  answer: string;
};

export type Block = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type RelatedLink = {
  href: string;
  label: string;
  note: string;
};

export type TopicPageData = {
  path: string;
  title: string;
  description: string;
  h1: string;
  lede: string[];
  sections: Block[];
  faqs: FaqItem[];
  crumbs: { name: string; path: string }[];
  related: RelatedLink[];
  kind: "service" | "industry" | "about";
  serviceType?: string;
};

export type PostSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  date: string;
  dateLabel: string;
  author: string;
  lede: string[];
  sections: PostSection[];
  faqs: FaqItem[];
};
