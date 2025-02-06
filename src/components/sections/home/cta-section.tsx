import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="relative pb-[50px]  min-h-[270px] md:min-h-[380px] lg:min-h-[274px]">
      <div className="absolute z-10 -bottom-10 w-full">
        <div className="container mx-auto px-10 py-6 md:px-[99px] md:py-[48px] bg-primary-dashboard sm:rounded-3xl ">
          <div className="flex flex-col lg:flex-row lg:gap-[100px] lg:items-center">
            <div>
              <h2 className="text-2xl md:text-[34px]/[42px] font-bold mb-4">
                Spot Errors and Save Money
              </h2>
              <p className="text-base md:text-lg mb-4">
                Join us with thousand giant companies and get unexpected
                benefits from us, so you can stop worrying about your old ages
              </p>
            </div>
            <div>
              <Button
                type="button"
                variant="secondary"
                className="px-9 py-3 md:py-4 text-base md:text-lg font-bold text-white rounded-full h-auto"
              >
                Sign up for Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
