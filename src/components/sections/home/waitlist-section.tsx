import WaitListForm from "@/components/forms/waitlist-form";

const WaitlistSection = () => {
  return (
    <section
      id="wait-list-section"
      className="w-full h-80  bg-[url('/images/background.svg')] flex justify-center items-center bg-center bg-cover bg-no-repeat "
    >
      <div className="flex flex-col items-center w-full md:p-2 px-6">
        <h2 className="max-w-[607px]  text-white text-[30px] font-semibold text-center leading-tight">
          Sign up for our <span className="text-[#ACDB88]">waitlist</span>
        </h2>
        <span className="text-white text-lg md:mt-1.5 md:mb-6 mb-4">
          Our launch is just around the corner.{" "}
        </span>
        <WaitListForm />
      </div>
    </section>
  );
};

export default WaitlistSection;
