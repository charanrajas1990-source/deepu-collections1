import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Script from "next/script";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  display: "swap",
});

const siteUrl = "https://deepuscollection.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Deepu's Collection | Premium Luxury Sarees",
    template: "%s | Deepu's Collection",
  },
  description:
    "Shop premium handcrafted sarees — Banarasi, Kanjeevaram, Organza & Chanderi — at Deepu's Collection. Timeless elegance woven into every yard.",
  keywords: [
    "sarees online",
    "Georgette sarees",
    "Pattu sarees",
    "Fancy sarees",
    "Chinon sarees",
    "Chiffon sarees",
    "Matka Crepe sarees",
    "Digital sarees",
    "Tussore sarees",
    "Instagram trending sarees",
    "luxury sarees Andhra Pradesh",
    "sarees near Rajahmundry",
    "East Godavari sarees",
    "handcrafted sarees",
    "buy sarees online India",
    "Deepu's Collection",
  ],
  authors: [{ name: "Deepu's Collection" }],
  creator: "Deepu's Collection",
  publisher: "Deepu's Collection",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Deepu's Collection",
    title: "Deepu's Collection | Premium Luxury Sarees",
    description:
      "Shop premium handcrafted sarees — Banarasi, Kanjeevaram, Organza & Chanderi. Timeless elegance woven into every yard.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Deepu's Collection — Premium Luxury Sarees",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepu's Collection | Premium Luxury Sarees",
    description:
      "Shop premium handcrafted sarees — Banarasi, Kanjeevaram, Organza & Chanderi. Timeless elegance woven into every yard.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Deepu's Collection",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/deepus-logo-new.webp`,
      },
      sameAs: ["https://www.instagram.com/deepuscollection"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Deepu's Collection",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${lato.variable} font-sans antialiased min-h-screen flex flex-col bg-[#0D0612] text-[#FAF9F6]`}
      >
        <main className="flex-grow">{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  );
}
