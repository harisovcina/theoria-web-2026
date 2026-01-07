import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "theoria — Product Design Studio",
  description: "We turn complex products into simple interfaces. Product design studio, Sarajevo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
