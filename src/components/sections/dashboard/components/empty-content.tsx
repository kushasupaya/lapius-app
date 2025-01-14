import Image from "next/image";

const EmptyContent = () => {
  return (
    <div className="border rounded-lg h-full flex flex-col justify-between">
      {/* Centered image */}
      <div className="flex justify-center items-center flex-grow">
        <Image
          src="/images/overview/emptyframe.svg"
          alt="Medical Billing Lapius"
          width={200}
          height={200}
        />
      </div>
      {/* Content at the bottom */}
      <div className="text-center mt-4 border-t p-4">
        <span className="text-muted-foreground italic text-sm">
          Facts: Something
        </span>
      </div>
    </div>
  );
};

export default EmptyContent;
