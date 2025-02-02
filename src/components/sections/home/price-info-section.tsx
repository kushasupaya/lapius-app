import { Button } from "@/components/ui/button";
import Image from "next/image";

const PriceInfoSection = () => {
  return (
    <section>
      <div className="container mx-auto p-4 lg:px-0 lg:pb-[100px]">
        <div className="grid gap-16 grid-cols-1 lg:grid-cols-2">
          <div className="mt-[84px]">
            <h2 className="text-[43px]/[54px] font-bold max-w-lg mb-4">
              Shop for healthcare the same way you shop for everything else
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mb-6">
              Healthcare costs can be overwhelming. We streamline vast and
              complex healthcare datasets, providing you with the insights
              needed to navigate healthcare costs with confidence. Explore
              hospital prices for all medical procedures according to your
              payer.
            </p>
            <Button
              type="button"
              variant="default"
              size="lg"
              className="px-5 py-3 h-[60px] rounded-lg text-lg font-bold bg-primary-dashboard"
            >
              Try the platform for free
              <Image
                alt="arrow"
                src="/icons/arrow-right.svg"
                height={24}
                width={24}
              />
            </Button>
          </div>
          <div>
            <Image
              alt=""
              src="/images/shophc.svg"
              height={1200}
              width={1200}
              className="h-auto w-full aspect-square"
            />
          </div>
        </div>
        <div className="grid gap-16 grid-cols-1 lg:grid-cols-2">
          <div>
            <Image
              alt=""
              src="/images/img1.svg"
              style={{ objectFit: "cover" }}
              height={1200}
              width={1200}
              className="h-auto w-full aspect-square"
            />
          </div>
          <div className="mt-[80px]">
            <h2 className="text-[43px]/[54px] font-bold max-w-lg mb-4">
              Estimate your costs upfront
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mb-4">
              With Lapius Copilot you can finally estimate how much each medical
              service will cost you. Using hospital datasets and millions of
              medical claims, we have developed a personal tool that will guide
              you in a realistic estimation of medical costs according to the
              service you need to perform or the symptoms you have.
            </p>
            <p className="text-base text-muted-foreground max-w-lg mb-6">
              The easy-to-use interface will allow you to answer your personal
              questions about different procedures and their costs.{" "}
            </p>
            <Button
              type="button"
              variant="default"
              size="lg"
              className="px-5 py-3 h-[60px] rounded-lg text-lg font-bold bg-primary-dashboard"
            >
              Try the platform for free
              <Image
                alt="arrow"
                src="/icons/arrow-right.svg"
                height={24}
                width={24}
              />
            </Button>
          </div>
        </div>
        <div className="grid gap-16 grid-cols-1 lg:grid-cols-2">
          <div className="mt-[70px]">
            <h2 className="text-[43px]/[54px] font-bold max-w-lg mb-4">
              AI Agents to Simplify Your Medical Health
            </h2>
            <p className="text-base font-bold max-w-lg mb-4">
              Easily find the best treatments, trusted providers, and
              cost-effective options tailored to your unique healthcare needs
              using our intelligent AI-powered search engine.
            </p>
            <p className="text-base text-muted-foreground max-w-lg mb-4">
              Compare prices effortlessly and discover savings.
            </p>
            <p className="text-base text-muted-foreground max-w-lg mb-4">
              Decode and understand your medical bills with ease
            </p>
            <p className="text-base text-muted-foreground max-w-lg mb-6">
              Spot errors and ensure you’re not overpaying.
            </p>
            <Button
              type="button"
              variant="default"
              size="lg"
              className="px-5 py-3 h-[60px] rounded-lg text-lg font-bold bg-primary-dashboard"
            >
              Try the platform for free
              <Image
                alt="arrow"
                src="/icons/arrow-right.svg"
                height={24}
                width={24}
              />
            </Button>
          </div>
          <div>
            <Image
              alt=""
              src="/images/aiagent.svg"
              height={1200}
              width={1200}
              style={{ objectFit: "fill" }}
              className="h-auto w-full  aspect-square"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceInfoSection;
