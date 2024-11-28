import Image from "next/image";

const SummarySection = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-[500px] p-5">
      <div className="rounded-full bg-primary mb-5">
        <Image
          alt="no issues"
          src="/images/happy.svg"
          height={108}
          width={108}
          className="h-[108px] w-[108px]"
        />
      </div>
      <h3 className="text-foreground text-xl font-semibold">No Potential<br/>Unbundling Risks</h3>
    </div>
  )
};

export default SummarySection;
