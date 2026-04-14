import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://daytonrelo.com"),
  title: {
    default: "Dayton Relo | Chris Jurgens – Dayton Ohio Realtor",
    template: "%s | Dayton Relo"
  },
  description: "Relocating to Dayton, Ohio? Chris Jurgens is a licensed Ohio Realtor specializing in military PCS, WPAFB, and corporate relocation. Free tools: mortgage calculator, BAH calculator, neighborhood guide, and more.",
  keywords: [
    "Dayton Ohio realtor", "PCS Dayton Ohio", "WPAFB relocation", "relocating to Dayton",
    "Dayton homes for sale", "corporate relocation Dayton", "VA loan Dayton Ohio",
    "BAH calculator WPAFB", "Dayton neighborhood guide", "military PCS realtor",
    "Wright Patterson AFB housing", "Dayton Ohio mortgage calculator",
    "Beavercreek homes for sale", "Centerville Ohio realtor", "Kettering Ohio homes"
  ],
  authors: [{ name: "Chris Jurgens", url: "https://daytonrelo.com/about" }],
  creator: "Chris Jurgens",
  publisher: "Dayton Relo",
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website", locale: "en_US", url: "https://daytonrelo.com",
    siteName: "Dayton Relo",
    title: "All things Dayton Ohio",
    description: "Military PCS, corporate relocation, or buying local — Chris Jurgens is Dayton's go-to realtor. Free tools, neighborhood guides, and MLS search.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Dayton Relo — All things Dayton Ohio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All things Dayton Ohio",
    description: "Military PCS, corporate relocation, or buying local in Dayton Ohio. Free tools, neighborhood guides, MLS search.",
    images: ["/opengraph-image"],
  },
  verification: {
    google: "GOOGLE_VERIFICATION_TOKEN",
  },
  alternates: {
    canonical: "https://daytonrelo.com",
  },
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#1F2937",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://daytonrelo.com/#agent",
      "name": "Chris Jurgens",
      "url": "https://daytonrelo.com",
      "telephone": "+19372413484",
      "email": "Chris@cjohio.com",
      "description": "Licensed Ohio Realtor specializing in military PCS moves, corporate relocation, and Dayton area home buying. Team Flory · eXp Realty.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dayton",
        "addressRegion": "OH",
        "addressCountry": "US"
      },
      "areaServed": [
        "Dayton, OH", "Beavercreek, OH", "Centerville, OH", "Kettering, OH",
        "Springboro, OH", "Fairborn, OH", "Miamisburg, OH", "Huber Heights, OH",
        "Xenia, OH", "Oakwood, OH"
      ],
      "knowsAbout": ["Military PCS", "VA Loans", "WPAFB", "Corporate Relocation", "Ohio Real Estate"],
      "sameAs": [
        "https://instagram.com/daytonrelo",
        "https://facebook.com/daytonrelo"
      ],
      "image": "https://daytonrelo.com/headshot.jpg",
      "priceRange": "$$",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Real Estate Services",
        "itemListElement": [
          { "@type": "Offer", "name": "Military PCS Relocation" },
          { "@type": "Offer", "name": "Corporate Relocation" },
          { "@type": "Offer", "name": "Home Buying" },
          { "@type": "Offer", "name": "VA Loan Guidance" }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://daytonrelo.com/#website",
      "url": "https://daytonrelo.com",
      "name": "Dayton Relo",
      "description": "Dayton Ohio Real Estate — Military PCS, Corporate Relocation, Free Tools",
      "publisher": { "@id": "https://daytonrelo.com/#agent" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://daytonrelo.com/listings?q={search_term_string}" },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
