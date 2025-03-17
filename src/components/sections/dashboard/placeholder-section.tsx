import Image from "next/image";

interface Props {
  isLoading: boolean;
}
const PlaceholderSection = ({ isLoading }: Props) => {
  return (
    <div className="bg-white border-2 border-tertiary rounded-[32px] p-4 md:p-6 w-full xl:max-w-[463px] 2xl:max-w-[578px] text-center h-[610px]">
      {isLoading ? (
        <div>
          <Image
            alt="placeholder"
            src="/images/placeholder.gif"
            height={370}
            width={370}
            unoptimized
            className="mt-9 mx-auto"
          />
          <h3 className="font-semibold text-foreground mb-1">Processing</h3>
          <p className="text-subtitle-dashboard text-opacity-80">
            Your bill is getting processed please be patient!!
          </p>
        </div>
      ) : (
        <div className="font-semibold mt-4">
          Upload your image and see your results here!!
          <Image
            alt="placeholder"
            src="/images/result.png"
            height={370}
            width={370}
            unoptimized
            className="mt-9 mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default PlaceholderSection;
