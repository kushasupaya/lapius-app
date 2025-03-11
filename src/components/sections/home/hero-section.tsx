import Image from "next/image";
import MedicalSearchForm from "@/components/forms/medical-search-form";
import { Plus_Jakarta_Sans } from "next/font/google";
import SubscribeForm from "@/components/forms/subscribe-form";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const HeroSection = () => {
  return (
    <section className="bg-hero-section-pattern bg-center bg-cover bg-no-repeat w-full">
      <div className="container px-4 xl:px-0 mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 w-full">
          <div className="w-full pt-24 md:pt-40 xl:pt-[243px]">
            <h1 className="text-4xl md:text-7xl font-medium mb-6">
              Don&apos;t pay your<br /><mark className="bg-gradient-to-r from-[#DE4DFF] to-[#5F37FC] inline-block text-transparent bg-clip-text">Hospital Bill</mark>
            </h1>
            <p className="text-base md:text-xl mb-8 max-w-[530px]">
              Empowering you with an AI-driven advocate that detects errors, negotiates on your behalf, and ensures you only pay for the care you received.
            </p>
            <div className="max-w-[528px]">
              <SubscribeForm />
            </div>
          </div>
          <div className="w-full xl:pt-[218px]">
            <Image
              alt=""
              src="/images/hero.svg"
              height={527}
              width={665}
              className="xl:ml-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
