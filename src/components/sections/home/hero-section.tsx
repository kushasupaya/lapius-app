import Image from "next/image";
import { GetStartedButton } from "./components";

const HeroSection = () => {
  return (
    <div className="bg-secondary w-full">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col justify-between md:min-h-screen">
          <div>
            <div className="bg-[url('/images/pattern.svg')] h-80 w-full bg-no-repeat bg-center"></div>
            <div className="-mt-32 pb-6">
              <h1 className="text-white text-[52px] font-semibold max-w-[600px]   leading-tight">
                Decode Your Medical Bill with the AI
                <span
                  className="bg-[url('/icons/ai.svg')] bg-contain bg-no-repeat inline-block h-8 w-8 ml-3"
                  aria-hidden="true"
                />
              </h1>
              <p className="mt-2 max-w-[550px] text-subtitle-white text-[24px]">
                Helping you understand and verify your healthcare charges with
                ease.
              </p>
              <GetStartedButton />
            </div>
          </div>
          <div className="hidden md:block overflow-hidden h-[350px] w-full rounded-t-2xl">
            <Image
              src="/images/hero.jpeg"
              alt="Lapius AI"
              width={1200}
              height={1200}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
