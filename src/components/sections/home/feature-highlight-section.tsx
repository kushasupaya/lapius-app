import { Button } from "@/components/ui/button";
import Image from "next/image";

const FeatureHighlightSection = () => {
  return (
    <section className="w-full">
      <div className="container px-4 xl:px-0 py-14 lg:py-28 mx-auto">
        <div className="flex flex-row  justify-between gap-11">
          <div>
            <div className="flex items-center w-full mb-6">
              <Image
                alt=""
                src="/icons/annotation.svg"
                height={20}
                width={20}
              />
              <p className="ml-3 text-base md:text-lg text-secondary font-medium">AI MedBill Assistant</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium mb-6 max-w-[625px]">
              Spot Overcharges in Seconds
            </h2>
            <p className="text-base md:text-lg max-w-[684px] mb-7">
              Upload your latest medical bill and see how much you could be saving. Our AI-assistant will analyse it by identifying the most common medical codes (CPT/HCPCS/ICD-10) and identifying potential errors. 
            </p>
            <Button
              size="default"
              variant="default"
              type="submit"
              className="bg-secondary text-white text-base w-max p-4 h-14 rounded-lg hover:bg-secondary focus:outline-none transition duration-300"
            >
              <div className="flex items-center w-full justify-between">
                Upload your hospital bill
                <Image alt="" src="/icons/arrow-top-right.svg" height={24} width={24} className="ml-2 md:ml-4" />
              </div>
            </Button>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-11 md:gap-4">
              <div className="flex items-start gap-2 max-w-[250px]">
                <Image
                  alt=""
                  src="/icons/circle-check.svg"
                  height={30}
                  width={30}
                />
                <p className="text-base md:text-lg font-medium">Understand the medical codes used</p>
              </div>
              <div className="flex items-start gap-2 max-w-[250px]">
                <Image
                  alt=""
                  src="/icons/circle-check.svg"
                  height={30}
                  width={30}
                />
                <p className="text-base md:text-lg font-medium">View potential risks of unbundling and upcoding</p>
              </div>
              <div className="flex items-start gap-2 max-w-[250px]">
                <Image
                  alt=""
                  src="/icons/circle-check.svg"
                  height={30}
                  width={30}
                />
                <p className="text-base md:text-lg font-medium">Find out how much you could save</p>
              </div>
            </div>
          </div>
          <div className="hidden xl:block my-8">
            <Image
              alt=""
              src="/images/spot-overcharge.svg"
              height={550}
              width={522}
              className="xl:ml-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureHighlightSection;
