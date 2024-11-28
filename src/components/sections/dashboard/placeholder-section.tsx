import Image from "next/image";

const PlaceholderSection = () => {
  return (
    <div className="bg-white rounded-[32px] p-4 md:p-6 w-full xl:max-w-[463px] text-center h-[610px]">
      <Image
        alt="placeholder"
        src="/images/placeholder.gif"
        height={370}
        width={370}
        unoptimized
        className="mt-9 mx-auto"
      />
      <h3 className="font-semibold text-foreground mb-1">GenAI Output</h3>
      <p className="text-subtitle-dashboard text-opacity-80">Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit.</p>
    </div>
  )
}

export default PlaceholderSection;
