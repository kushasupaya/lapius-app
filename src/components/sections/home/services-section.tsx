import { SectionTitle, StatsCard } from "./components";

const ServicesSection = () => {
  return (
    <section id="about" className="bg-white scroll-mt-28">
      <div className="container mx-auto p-4 lg:px-0 md:pt-0 md:pb-24">
        <div className="flex flex-col items-center w-full mb-10">
          <SectionTitle title="About Lapius" />
          <h2 className="max-w-[607px] mt-2.5 text-black text-[40px] font-semibold text-center leading-tight">
            Join the Movement Toward{" "}
            <span className="text-[#ACDB88]">
              Transparent Healthcare Billing
            </span>{" "}
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row gap-12">
          <StatsCard
            icon="/icons/home.svg"
            stats="80%"
            // title="Hospitals mapped"
            description="Medical bills contain errors."
          />
          <StatsCard
            icon="/icons/file.svg"
            stats="40%"
            // title="Dispute their bills"
            description="Americans are confused by their medical bills."
          />
          <StatsCard
            icon="/icons/warning.svg"
            stats="66.5%"
            // title="Medical bills contain errors"
            description="Bankruptcies were tied to medical issues."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
