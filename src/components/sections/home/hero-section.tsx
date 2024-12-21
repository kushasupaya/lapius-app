import Image from "next/image";
import { GetStartedButton } from "./components";

const HeroSection = () => {
  return (
    <section className="bg-secondary w-full scroll-mt-20">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col justify-between md:min-h-screen">
          <div>
            <div className="bg-[url('/images/pattern.svg')] h-80 w-full bg-no-repeat bg-center"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between -mt-32">
              <div className="p-6 pb-10 my-auto">
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
              <div className="w-full h-full md:w-auto flex justify-center items-center  p-4">
                <div className="flex justify-center items-center max-h-[600px] max-w-[600px] h-full w-full sm:max-h-[400px] sm:max-w-[400px] md:max-h-[500px] md:max-w-[500px] lg:max-h-[600px] lg:max-w-[600px]">
                  <Image
                    alt="Lapius AI"
                    src="/images/homepage.png"
                    height={600}
                    width={600}
                    style={{ objectFit: "cover" }}
                    priority
                    layout="responsive"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="hidden md:block overflow-hidden h-[350px] w-full rounded-t-2xl">
            <Image
              src="/images/hero.jpeg"
              alt="Lapius AI"
              width={1200}
              height={1200}
              className="object-cover w-full h-auto"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
