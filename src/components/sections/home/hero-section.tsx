import Image from "next/image";
import MedicalSearchForm from "@/components/forms/medical-search-form";

const HeroSection = () => {
  return (
    <section className="bg-rectangular-pattern bg-center bg-cover bg-no-repeat w-full scroll-mt-56 rounded-b-[54px]">
      <div className="flex flex-col justify-between md:min-h-screen">
        <div className="container mx-auto px-4 md:px-0 mt-52 mb-2">
          <div className="mb-1">
            <h1 className="font-bold text-[68px]/[68px] text-center">Take control of your</h1>
            <div className="flex flex-row flex-wrap justify-center items-start text-center w-full">
              <h1 className="font-bold text-[68px]/[68px] mr-2">Healthcare costs with</h1>
              <div>
                <h1 className="font-bold text-[68px]/[68px] text-center flex-1">the AI</h1>
                <Image
                  alt=""
                  src="/images/sign.svg"
                  height={24}
                  width={207}
                  className="w-[207px] h-6 text-end ml-auto"
                />
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-center text-xl mb-5">Easily analyze your medical bills, compare prices, and estimate upcoming<br />healthcare costs—all in one platform.</p>
          <div>
            <MedicalSearchForm />
          </div>
        </div>
        <div className="hidden md:block overflow-hidden w-full">
          <Image
            src="/images/hero-background.png"
            alt="Lapius AI"
            width={1440}
            height={342}
            className="object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
