import { SectionTitle, VideoSlider } from "./components"

const AboutSection = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto p-4 lg:px-0 md:pt-20 md:pb-5">
        <div className="flex flex-col items-center w-full mb-10">
          <SectionTitle title="Lapius in Action" />
          <h2 className="max-w-[607px] mt-2.5 text-black text-[40px] font-semibold text-center">One-stop suite for all your Medical Coding Stuff.</h2>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:max-w-none lg:px-0">
        <VideoSlider />
      </div>
    </div>
  );
};

export default AboutSection;
