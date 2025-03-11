import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Sans } from "next/font/google"
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "./providers";

const font = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700"],
});

export const metadata: Metadata = {
  title: "Lapius: Take Control of your Healthcare Costs",
  description:
    "Take Control of Your Healthcare Costs with the AI. We help patients save money by detecting errors and verifying medical bill accuracy.",
  openGraph: {
    title: "Lapius: Take Control of your Healthcare Costs",
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
        className={`${font.className} antialiased`}
      >
        <PostHogProvider>{children}</PostHogProvider>
        <SpeedInsights />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
