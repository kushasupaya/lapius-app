import { Footer, Header } from "@/components/common";
import {
  ContactSection,
  CtaSection,
  DiscoverSection,
  EstimateCostSection,
  FaqSection,
  FeaturesSection,
  HeroSection,
  PriceInfoSection,
  SliderSection,
} from "@/components/sections/home";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PriceInfoSection />
        <DiscoverSection />
        {/* <SliderSection /> */}
        <ContactSection />
        <FaqSection />
        {/* <CtaSection /> */}
      </main>
      <Footer />
    </>
  );
}
