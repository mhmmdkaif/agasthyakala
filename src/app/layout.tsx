import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import { SITE_URL, GALLERY_ITEMS } from "@/lib/constants";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Custom Paintings & Portrait Artist Kerala | AgasthyaKala",
  description:
    "Commission custom paintings, portraits from photo, mythological art & pencil drawings from AgasthyaKala, Payyannur Kerala. Hand-painted artwork delivered across India. WhatsApp: +91 99477 10054",
  keywords: [
    "custom painting Kerala",
    "portrait artist Kerala",
    "commission painting India",
    "custom portrait from photo",
    "pencil portrait drawing Kerala",
    "mythological painting Kerala",
    "art commission India",
    "personalized art gift Kerala",
    "handmade portrait India",
    "custom artwork online India",
    "painting commission Payyannur",
    "art studio Payyannur",
    "AgasthyaKala",
    "portrait painting Kannur",
    "cultural art Kerala",
    "custom pencil drawing India",
    "painting from photo India",
    "buy custom artwork online",
    "gift painting Kerala",
    "couple portrait painting India",
    "family portrait artist Kerala",
  ],
  authors: [{ name: "AgasthyaKala" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Custom Paintings & Portrait Artist in Kerala | AgasthyaKala",
    description:
      "Commission handcrafted portraits from photo, mythological paintings & personalized artworks. Hand-painted and delivered across India.",
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "AgasthyaKala",
    images: [
      {
        url: "/artworks/radha-krishna-mythological-painting-commission.jpg",
        width: 1200,
        height: 630,
        alt: "AgasthyaKala — Custom Paintings & Portrait Art Studio in Payyannur, Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Paintings & Portraits from Photo | AgasthyaKala Kerala",
    description:
      "Commission handcrafted portraits, mythological paintings & personalized art. Hand-painted in Payyannur, Kerala. Delivered all over India.",
    images: ["/artworks/radha-krishna-mythological-painting-commission.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cinzel.variable} ${cormorant.variable} ${inter.variable}`}>
      <head>
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Payyannur, Kerala, India" />
        <meta name="geo.position" content="12.0983;75.2036" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": `${SITE_URL}/#business`,
                name: "AgasthyaKala",
                description:
                  "Custom painting, portrait from photo and art commission studio in Payyannur, Kerala. Specialising in mythological paintings, pencil portraits, cultural illustrations and personalized handcrafted artworks delivered across India.",
                url: SITE_URL,
                image: `${SITE_URL}/artworks/radha-krishna-mythological-painting-commission.jpg`,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Edat, Near Malara Oil Mill",
                  addressLocality: "Payyannur",
                  addressRegion: "Kerala",
                  postalCode: "670327",
                  addressCountry: "IN",
                },
                telephone: "+91-9947710054",
                sameAs: [
                  "https://www.instagram.com/_agasthya_kala_/",
                  "https://www.facebook.com/AgasthyaKala",
                ],
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: "12.0983",
                  longitude: "75.2036",
                },
                priceRange: "₹₹",
                openingHours: "Mo-Su 08:00-22:00",
                areaServed: {
                  "@type": "Country",
                  name: "India",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": `${SITE_URL}/#artist`,
                name: "AgasthyaKala",
                jobTitle: "Portrait Artist & Custom Painter",
                url: SITE_URL,
                image: `${SITE_URL}/artworks/custom-portrait-painting-kerala-agasthyakala.jpg`,
                sameAs: [
                  "https://www.instagram.com/_agasthya_kala_/",
                  "https://www.facebook.com/AgasthyaKala",
                ],
                worksFor: {
                  "@id": `${SITE_URL}/#business`,
                },
                knowsAbout: [
                  "Custom Paintings",
                  "Portrait from Photo",
                  "Pencil Drawing",
                  "Mythological Paintings",
                  "Cultural Art",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "Product",
                name: "Custom Painting Commission",
                description:
                  "Commission a handcrafted custom painting or portrait from photo. Personalized artwork hand-painted by AgasthyaKala, delivered across India.",
                image: `${SITE_URL}/artworks/radha-krishna-mythological-painting-commission.jpg`,
                brand: {
                  "@type": "Brand",
                  name: "AgasthyaKala",
                },
                offers: {
                  "@type": "Offer",
                  url: SITE_URL,
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                  seller: {
                    "@id": `${SITE_URL}/#business`,
                  },
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "5",
                  reviewCount: "50",
                  bestRating: "5",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "ImageGallery",
                name: "AgasthyaKala Art Gallery",
                description:
                  "Gallery of custom paintings, portraits from photo, mythological art and cultural illustrations by AgasthyaKala, Payyannur Kerala.",
                url: `${SITE_URL}/#gallery`,
                image: GALLERY_ITEMS.map((item) => `${SITE_URL}${item.src}`),
              },
            ]),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
