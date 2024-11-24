import { Footer, Header } from "@/components/common";
import { AboutSection, FaqSection, HeroSection, ServicesSection } from "@/components/sections/home";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FaqSection />
      <Footer />
    </>
  );
}
