import { Footer, Header } from "@/components/common";
import {
  AboutSection,
  FaqSection,
  HeroSection,
  ServicesSection,
  WaitListSection,
} from "@/components/sections/home";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WaitListSection />
      <FaqSection />
      <Footer />
    </>
  );
}
