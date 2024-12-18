import Image from "next/image";
import { ScrollableContents, SectionTitle, VideoSlider } from "./components";

const AboutSection = () => {
  return (
    <section id="how-it-works" className="bg-white relative pt-32 scroll-mt-20">
      <div className=" absolute z-40 top-0 w-full text-center p-4 lg:px-0 md:pt-14 mt-1.5 md:pb-5">
        <div className="flex flex-col items-center w-full">
          <SectionTitle title="Lapius in Action" />
          <h2 className="max-w-[607px] mt-2.5 text-black text-[40px] font-semibold text-center leading-tight">
            Your ally for catching{" "}
            <span className="text-[#ACDB88]">medical billing errors</span>
          </h2>
        </div>
      </div>
      <div className="container mx-auto px-10 md:px-14 md:py-12 py-2">
        {/* Section 1: Let AI do the work for you */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8 md:mb-16 mt-24">
          <div className="md:px-12 md:mt-0 mt-2">
            <h2 className="text-2xl md:text-3xl font-bold text-black md:mb-4 mb-1">
              Let AI do the work for you
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              <span className="text-[#ACDB88] font-semibold">
                Lapius scans and reviews every line item
              </span>
              , cross-referencing medical codes and checking for common billing
              errors.
            </p>
          </div>

          <div className="relative">
            <Image
              src="images/aboutsection/aiwork.svg"
              alt="Medical Bill Example"
              width={600}
              height={400}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Section 2: Review potential risks for website */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 items-center mb-8 md:mb-16">
          <div className="relative">
            <Image
              src="images/aboutsection/potentialrisks.svg"
              alt="Unbundling Risk"
              width={570}
              height={400}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className="md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black md:mb-4 mb-1">
              Review potential risks
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              Get a clear, detailed report that highlights any discrepancies to
              understand{" "}
              <span className="text-[#ACDB88] font-semibold">
                what’s wrong and why it matters.
              </span>
            </p>
          </div>
        </div>
        {/*section 2 for mobile*/}
        <div className="md:hidden grid md:grid-cols-2 gap-8 items-center mb-8 md:mb-16">
          <div className="md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black md:mb-4 mb-1">
              Review potential risks
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              Get a clear, detailed report that highlights any discrepancies to
              understand{" "}
              <span className="text-[#ACDB88] font-semibold">
                what’s wrong and why it matters.
              </span>
            </p>
          </div>
          <div className="relative">
            <Image
              src="images/aboutsection/potentialrisks.svg"
              alt="Unbundling Risk"
              width={570}
              height={400}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Section 3: Find the right price */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black md:mb-4 mb-1">
              Find the right price
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              Each price is compared with average prices in your area and those
              published by healthcare settings to alert you to any{" "}
              <span className="text-[#ACDB88] font-semibold">
                overpricing problems.
              </span>
            </p>
          </div>

          <div className="relative">
            <Image
              src="images/aboutsection/rightprice.svg"
              alt="Medical Bill Example"
              width={570}
              height={300}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
