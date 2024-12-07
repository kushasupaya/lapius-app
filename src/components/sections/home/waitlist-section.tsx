import WaitListForm from "@/components/forms/waitlist-form";

const WaitlistSection = () => {
  return (
    <div className="w-full h-48  bg-secondary flex justify-center items-center">
      <div className="flex flex-col items-center w-full">
        <h2 className="max-w-[607px]  text-white text-[30px] font-semibold text-center leading-tight">
          Sign up for our <span className="text-[#ACDB88]">Waitlist</span>
        </h2>
        <span className="text-white text-lg mt-1.5">
          Our launch is just around the corner.{" "}
        </span>
        <WaitListForm />
      </div>
    </div>
  );
};

export default WaitlistSection;
