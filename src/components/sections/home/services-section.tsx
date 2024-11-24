import { SectionTitle, StatsCard } from "./components";

const ServicesSection = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto p-4 lg:px-0 md:pt-20 md:pb-5">
        <div className="flex flex-col items-center w-full mb-10">
          <SectionTitle title="About Lapius" />
          <h2 className="max-w-[607px] mt-2.5 text-black text-[40px] font-semibold text-center">Excepteur sint occaecat cupidatat non proident </h2>
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row gap-6">
          <StatsCard icon="/icons/home.svg" stats="6,000+" title="Hospitals mapped" description="Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc." />
          <StatsCard icon="/icons/file.svg" stats="12.2%" title="Dispute their bills" description="Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc." />
          <StatsCard icon="/icons/warning.svg" stats="80%" title="Medical bills contain errors" description="Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc." />
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
