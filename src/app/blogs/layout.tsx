import { Footer, Header } from "@/components/common";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header isBlog={true} />
      <main className="min-h-screen relative">{children}</main>
      <Footer />
    </>
  );
}
