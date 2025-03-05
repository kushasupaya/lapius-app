import { Footer, Header } from "@/components/common";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function PriceToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header isBlog={true} />
      <main className={`min-h-screen relative ${inter.className} mt-12`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
