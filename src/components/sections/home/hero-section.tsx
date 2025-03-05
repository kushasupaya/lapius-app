import Image from "next/image";
import MedicalSearchForm from "@/components/forms/medical-search-form";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const HeroSection = () => {
  return (
    <section className="bg-landingpage-pattern bg-center  bg-cover bg-no-repeat w-full scroll-mt-56 rounded-b-[54px]">
      <div className="flex flex-col justify-between">
        <div className="container mx-auto px-4 md:px-0 mt-24 md:mt-52 mb-2">
          <div className="mb-1 mt-2">
            <h1
              className={`font-bold text-3xl md:text-[56px]/[62px] text-center ${plusJakartaSans.className}`}
            >
              Take Control of your
            </h1>
            <div
              className={`flex flex-col md:flex-row md:flex-wrap justify-center items-center md:items-start text-center w-full ${plusJakartaSans.className}`}
            >
              <h1 className="font-bold text-3xl md:text-[56px]/[62px] mr-2">
                Healthcare costs with
              </h1>
              <div>
                <h1 className="font-bold text-3xl md:text-[56px]/[62px] text-center flex-1">
                  the AI
                </h1>
                {/* <Image
                  alt=""
                  src="/images/sign.svg"
                  height={24}
                  width={207}
                  className="w-[207px] h-6 text-end ml-auto"
                /> */}
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-center text-sm md:text-lg mb-5 mt-2">
            Easily analyze your medical bills, compare prices, and estimate
            upcoming <br className="md:block hidden" />
            healthcare costs—all in one platform.
          </p>
          <div>
            <MedicalSearchForm />
          </div>
        </div>
        <div className="hidden md:block mx-auto overflow-hidden mt-6">
          <Image
            src="/images/hero-background.png"
            alt="Lapius AI"
            width={1240}
            height={342}
            className="object-cover h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
