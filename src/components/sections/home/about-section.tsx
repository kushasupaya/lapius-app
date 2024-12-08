import { ScrollableContents, SectionTitle, VideoSlider } from "./components";

const AboutSection = () => {
  return (
    <section id="how-it-works" className="bg-white relative pt-32">
      <div className=" absolute z-40 top-0 w-full text-center p-4 lg:px-0 md:pt-20 md:pb-5">
        <div className="flex flex-col items-center w-full">
          <SectionTitle title="Lapius in Action" />
          <h2 className="max-w-[607px] mt-2.5 text-black text-[40px] font-semibold text-center leading-tight">
            Your ally for catching{" "}
            <span className="text-[#ACDB88]">medical billing errors</span>
          </h2>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:max-w-none lg:px-0">
        {/* <VideoSlider /> */}
        <ScrollableContents />
      </div>
    </section>
  );
};

export default AboutSection;
