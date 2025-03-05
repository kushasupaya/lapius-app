import { Button } from "@/components/ui/button";
import Image from "next/image";

const EstimateCostSection = () => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="pt-[57px]">
            <h2 className="text-[43px]/[54px] font-bold mb-6">
              Estimate your costs upfront
            </h2>
            <p className="text-xl mb-6">
              With{" "}
              <mark className="text-primary-dashboard bg-transparent font-bold">
                Lapius Copilot
              </mark>{" "}
              you can finally estimate how much each medical service will cost
              you. Using hospital datasets and millions of medical claims, we
              have developed a personal tool that will guide you in a realistic
              estimation of medical costs according to the service you need to
              perform or the symptoms you have.
            </p>
            <p className="text-xl mb-9">
              The easy-to-use interface will allow you to answer your personal
              questions about different procedures and their costs.
            </p>
            <Button
              type="button"
              variant="default"
              size="lg"
              className="px-5 py-3 h-[60px] rounded-lg text-lg font-bold bg-primary-dashboard"
            >
              Try it for free
              <Image
                alt="arrow"
                src="/icons/arrow-right.svg"
                height={24}
                width={24}
              />
            </Button>
          </div>
          <div className="py-7 lg:pt-0 lg:pb-6">
            <Image
              alt=""
              src="/images/estimate-cost.svg"
              width={520}
              height={670}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimateCostSection;
