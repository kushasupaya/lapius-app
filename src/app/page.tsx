import { Footer, Header } from "@/components/common";
import {
  AdvantagesSection,
  ClientsSection,
  ContactSection,
  CtaContactSection,
  CtaDemoSection,
  CtaSection,
  DiscoverSection,
  EstimateCostSection,
  FaqSection,
  FeatureHighlightSection,
  FeaturesSection,
  HeroSection,
  PriceInfoSection,
  ProcessOverviewSection,
  SliderSection,
} from "@/components/sections/home";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ClientsSection />
        <ProcessOverviewSection />
        <FeatureHighlightSection />
        <CtaDemoSection />
        <AdvantagesSection />
        <CtaContactSection />
      </main>
      <Footer />
    </>
  );
}
