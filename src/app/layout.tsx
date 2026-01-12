import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "theoria — Product Design Studio",
  description: "We turn complex products into simple interfaces. Product design studio, Sarajevo.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${instrumentSerif.variable}`} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
