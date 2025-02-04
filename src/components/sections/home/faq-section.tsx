import Image from "next/image";
import { FaqSlider, FaqTabs, SectionTitle } from "./components";

const FaqSection = () => {
  return (
    <section id="faq" className="bg-white scroll-mt-20">
      <div className="container mx-auto p-4 lg:px-0 md:pt-16 md:pb-24">
        <div className="flex flex-col mb-4 lg:mb-0 lg:flex-row lg:items-end gap-4 md:gap-12">
          <div className="flex flex-col">
            <h2 className="mt-2.5 flex-1 text-black text-3xl md:text-[43px]/[54px] font-bold text-left lg:mb-10">
              Frequently Asked Questions
            </h2>
            <div className="relative hidden lg:block ">
              <FaqSlider />
            </div>
          </div>
          <div className="w-full">
            <FaqTabs />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
