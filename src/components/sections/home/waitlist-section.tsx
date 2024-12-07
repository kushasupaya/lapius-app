import WaitListForm from "@/components/forms/waitlist-form";

const WaitlistSection = () => {
  return (
    <section
      id="wait-list-section"
      className="w-full h-80  bg-[url('/images/background.svg')] flex justify-center items-center bg-center bg-cover bg-no-repeat "
    >
      <div className="flex flex-col items-center w-full">
        <h2 className="max-w-[607px]  text-white text-[30px] font-semibold text-center leading-tight">
          Sign up for our <span className="text-[#ACDB88]">Waitlist</span>
        </h2>
        <span className="text-white text-lg mt-1.5 mb-6">
          Our launch is just around the corner.{" "}
        </span>
        <WaitListForm />
      </div>
    </section>
  );
};

export default WaitlistSection;
