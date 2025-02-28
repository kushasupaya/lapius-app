"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import LoginDialog from "@/components/forms/login-dialog-form";
import { useState } from "react";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const PriceInfoSection = () => {
  const [openSignup, setOpenSignup] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  return (
    <section>
      <div className="container mx-auto p-4 pb-6 lg:px-0 lg:pb-[100px] 2xl:px-36">
        <div
          id="search-for-care"
          className="grid gap-8 lg:gap-16 grid-cols-1 lg:grid-cols-2 scroll-mt-20"
        >
          <div className="mt-8 md:mt-[70px] ">
            <h2
              className={`text-2xl md:text-[34px]/[42px] font-bold mb-4 ${plusJakartaSans.className} max-w-[640px]`}
            >
              Shop for healthcare the same way you shop for everything else
            </h2>
            <p className="text-base  text-muted-foreground mb-6 2xl:leading-8 max-w-[640px]">
              Healthcare costs can be overwhelming. We streamline vast and
              complex healthcare datasets, providing you with the insights
              needed to navigate healthcare costs with confidence. Explore
              hospital prices for all medical procedures according to your
              payer.
            </p>
            <LoginDialog
              trigger={
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  className="px-5 py-3  h-12 md:h-[54px] rounded-lg text-base md:text-lg font-bold bg-primary-dashboard hover:text-white"
                >
                  Try the platform for free
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Button>
              }
              onOpenChange={setLoginDialogOpen}
              open={loginDialogOpen}
              onSignUpChange={setOpenSignup}
            />
          </div>
          <div>
            <Image
              alt="Healthcare"
              src="/images/shophc.svg"
              height={1200}
              width={1200}
              className="h-auto w-full aspect-square"
            />
          </div>
        </div>
        <div
          className="grid gap-8 lg:gap-16 grid-cols-1 lg:grid-cols-2 scroll-mt-20"
          id="estimate-cost"
        >
          <div className="order-2 lg:order-1">
            <Image
              alt=""
              src="/images/costestimate.svg"
              height={1200}
              width={1200}
              className="h-auto w-full aspect-square"
              unoptimized
            />
          </div>
          <div className="lg:mt-[70px] mt-8 order-1 lg:order-2">
            <h2
              className={`text-2xl md:text-[34px]/[42px] font-bold mb-4 ${plusJakartaSans.className} max-w-[640px]`}
            >
              Estimate your costs upfront
            </h2>
            <p className="text-base text-muted-foreground mb-6 2xl:leading-8 max-w-[640px]">
              With Lapius Copilot you can finally estimate how much each medical
              service will cost you. Using hospital datasets and millions of
              medical claims, we have developed a personal tool that will guide
              you in a realistic estimation of medical costs according to the
              service you need to perform or the symptoms you have.
            </p>
            <p className="text-base text-muted-foreground mb-6 2xl:leading-8 max-w-[640px]">
              The easy-to-use interface will allow you to answer your personal
              questions about different procedures and their costs.{" "}
            </p>
            <LoginDialog
              trigger={
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  className="px-5 py-3  h-12 md:h-[54px] rounded-lg text-base md:text-lg font-bold bg-primary-dashboard hover:text-white"
                >
                  Try the platform for free
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Button>
              }
              onOpenChange={setLoginDialogOpen}
              open={loginDialogOpen}
              onSignUpChange={setOpenSignup}
            />
            {/* <div className="border border-primary-dashboard px-5 py-3 h-12 md:h-[54px] rounded-lg text-base md:text-lg font-bold bg-white w-1/2 text-center mb-6">
              Coming Soon
            </div> */}
            {/* <Button
              type="button"
              variant="default"
              size="lg"
              className="px-5 py-3 h-12 md:h-[54px] rounded-lg text-base md:text-lg font-bold bg-primary-dashboard"
            >
              Try the platform for free
              <Image
                alt="arrow"
                src="/icons/arrow-right.svg"
                height={24}
                width={24}
              />
            </Button> */}
          </div>
        </div>
        <div
          className="grid gap-8 md:gap-16 grid-cols-1 lg:grid-cols-2 scroll-mt-20"
          id="analyze-bill"
        >
          <div className="mt-8 md:mt-[70px]">
            <h2
              className={`text-2xl md:text-[34px]/[42px] font-bold mb-4 ${plusJakartaSans.className} max-w-[640px]`}
            >
              AI Agents to Simplify Your Medical Health
            </h2>
            <p className="text-base  text-muted-foreground mb-6 2xl:leading-8 max-w-[640px]">
              Almost 80% of medical bills contain errors. Test our AI-Assistant
              to analyse them, always protecting your data.
            </p>
            <p className="text-base  text-muted-foreground mb-6 2xl:leading-8 max-w-[640px]">
              Our tool is trained to understand and explain the meaning of each
              medical code. It spots the risks of upcoding and unbundling. It
              also allows you to verify each procedure and understand how much
              you could save.{" "}
            </p>
            <div className="border border-primary-dashboard px-5 py-3 h-12 md:h-[54px] rounded-lg text-base md:text-lg font-bold bg-white w-1/2 text-center mb-6">
              Coming Soon
            </div>
            {/* <Button
              type="button"
              variant="default"
              size="lg"
              className="px-5 py-3 h-12 md:h-[60px] rounded-lg text-base md:text-lg font-bold bg-primary-dashboard"
            >
              Try the platform for free
              <Image
                alt="arrow"
                src="/icons/arrow-right.svg"
                height={24}
                width={24}
              />
            </Button> */}
          </div>
          <div>
            <Image
              alt=""
              src="/images/aiagent.svg"
              height={1200}
              width={1200}
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
