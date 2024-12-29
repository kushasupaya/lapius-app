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
  title: "Lapius: AI-Powered Medical Bill Review Tool",
  description:
    "Take Control of Your Healthcare Costs with the AI. We help patients save money by detecting errors and verifying medical bill accuracy.",
  openGraph: {
    title: "Lapius: AI-Powered Medical Bill Review Tool",
    description:
      "Take Control of Your Healthcare Costs with the AI. We help patients save money by detecting errors and verifying medical bill accuracy.",
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
  alternates: {
    canonical: "https://lapiusai.com",
  },
  keywords: [
    "medical bill decoding",
    "AI healthcare billing",
    "medical billing errors",
    "healthcare price comparison",
    "transparent healthcare",
    "medical bill discrepancies",
    "healthcare expenses",
    "AI medical cost review",
    "medical bills",
    "healthcare costs",
    "medical bill errors",
    "healthcare billing",
    "medical billing",
    "healthcare",
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
