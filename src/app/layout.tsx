import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lapius",
  description: "Take Control of Your Healthcare Costs with the AI",
  openGraph: {
    title: "Lapius",
    description: "Take Control of Your Healthcare Costs with the AI",
    type: "website",
    url: "https://lapiusai.com",
    images: [
      {
        url: "https://lapiusai.com/logo/lapius.svg",
        width: 1200,
        height: 1200,
        alt: "Lapius logo",
      },
    ],
  },
  keywords: [
    "medical billing",
    "healthcare",
    "AI",
    "how to dispute a medical bill",
    "Medical bill",
    "hospital bill",
    "CPT codes",
    "medical bill mistakes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
