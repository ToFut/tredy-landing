import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/content";
import "./globals.css";
import "./apple.css";
import "./screens.css";
import "./system.css";
import "./redesign.css";
import { BookModal, StickyBook } from "@/components/ui/Actions";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Futurix",
  },
  description: site.description,
  applicationName: "Futurix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: "Futurix",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_GSC_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#07090d",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBook />
        <BookModal />
        <Analytics />
      </body>
    </html>
  );
}
