import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.theoria.co'),
  alternates: {
    canonical: 'https://www.theoria.co',
  },
  title: {
    default: "theoria — Product Design Studio in Sarajevo",
    template: "%s | theoria"
  },
  description: "World-class UX design studio based in Sarajevo. We turn complex products into simple, intuitive interfaces. Specializing in SaaS, healthcare, and fintech.",
  keywords: [
    "product design",
    "UX design",
    "UI design",
    "design studio",
    "Sarajevo",
    "Bosnia",
    "SaaS design",
    "healthcare design",
    "fintech design",
    "user experience",
    "interface design",
    "product design agency"
  ],
  authors: [{ name: "theoria" }],
  creator: "theoria",
  publisher: "theoria",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "theoria — Product Design Studio in Sarajevo",
    description: "World-class UX design studio based in Sarajevo. We turn complex products into simple, intuitive interfaces.",
    url: "https://www.theoria.co",
    siteName: "theoria",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "theoria — Product Design Studio"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "theoria — Product Design Studio in Sarajevo",
    description: "World-class UX design studio based in Sarajevo. We turn complex products into simple, intuitive interfaces.",
    images: ["/img/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    // Add these after setting up:
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
  },
  other: {
    'facebook-domain-verification': 'ho0io7qfnokxb522sdy20p4x0n354n',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <GoogleAnalytics />
      </head>
      <body className={`font-sans ${instrumentSerif.variable}`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
