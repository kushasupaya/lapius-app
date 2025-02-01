import { Button } from "@/components/ui/button";
import Image from "next/image";

const PriceInfoSection = () => {
  return (
    <section>
      <div className="bg-rectangular-pattern bg-[#F2F8F3] bg-center bg-cover bg-no-repeat w-full">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:justify-between">
            <div className="relative pt-[30px] pb-[30px] lg:pb-[357px]">
              <h2 className="text-[43px]/[54px] font-bold max-w-lg mb-4">Shop for healthcare the same way you shop for everything else</h2>
              <p className="text-base text-muted-foreground max-w-lg mb-4">Healthcare costs can be overwhelming. We streamline vast and complex healthcare datasets, providing you with the insights needed to navigate healthcare costs with confidence. Explore hospital prices for all medical procedures according to your payer.</p>
              <div className="lg:absolute z-10 -bottom-[275px]">
                <div className="relative">
                  <Image
                    alt=""
                    src="/images/compare-1.svg"
                    width={520}
                    height={600}
                  />
                  <div className="absolute bottom-4 right-4 z-20">
                    <Button
                      className="w-full max-w-md h-auto p-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl transition-colors"
                      variant="ghost"
                    >
                      <div className="h-9 w-9 rounded-full bg-emerald-200 flex items-center justify-center">
                        <Image
                          alt=""
                          src="/icons/cash.svg"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-base font-semibold text-white">Compare Prices</span>
                        <span className="text-xs text-white/80">Check the right price for you.</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="lg:absolute z-10 -bottom-[113px]">
                <div className="relative pb-[30px] lg:pb-0">
                  <Image
                    alt=""
                    src="/images/compare-2.svg"
                    width={520}
                    height={600}
                  />
                  <div className="absolute bottom-4 right-4 z-20">
                    <Button
                      className="w-full max-w-md h-auto p-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl transition-colors"
                      variant="ghost"
                    >
                      <div className="h-9 w-9 rounded-full bg-emerald-200 flex items-center justify-center">
                        <Image
                          alt=""
                          src="/icons/cash.svg"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-base font-semibold text-white">Compare Prices</span>
                        <span className="text-xs text-white/80">Check the right price for you.</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:pb-[275px]" />
    </section>
  )
}

export default PriceInfoSection;
