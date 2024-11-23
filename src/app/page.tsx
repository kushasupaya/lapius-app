import Image from "next/image";

import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/sections/home";
import AboutCard from "@/components/sections/home/about-card";

export default function Home() {
  return (
    <>
      <div className="bg-secondary w-full">
        <div className="bg-[url('/images/pattern.svg')] h-80 w-full bg-no-repeat bg-center"></div>
        <div className="container mx-auto -mt-28 px-4 md:px-0">
          <h1 className="text-white text-[40px] font-semibold max-w-[600px]">
            Take Control of Your Healthcare Costs with the AI
            <span 
              className="bg-[url('/icons/ai.svg')] bg-contain bg-no-repeat inline-block h-8 w-8 ml-3"
              aria-hidden="true"
            />
          </h1>
          <p className="mt-2 max-w-[550px] text-subtitle-white">Transform your social media strategy with our all-in-one platform designed to help you plan, create, and analyze your content effortlessly.</p>
          <Button variant="primary" size="primary" className="mt-6">Get Started</Button>
          <Image
            src="/images/hero.svg"
            alt="Lapius AI"
            width={700}
            height={700}
            className="h-full w-full mt-6"
          />
        </div>
      </div>
      <div className="bg-white pt-20">
        <div className="flex flex-col items-center w-full mb-10">
          <SectionTitle title="Lapius in Action" />
          <h2 className="max-w-[607px] mt-2.5 text-black text-[40px] font-semibold text-center">One-stop suite for all your Medical Coding Stuff.</h2>
        </div>
      </div>
      <div className="bg-white pt-24 pb-24">
        <div className="flex flex-col items-center w-full mb-10">
          <SectionTitle title="About Lapius" />
          <h2 className="max-w-[607px] mt-2.5 text-black text-[40px] font-semibold text-center">Excepteur sint occaecat cupidatat non proident </h2>
        </div>
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col justify-center items-center md:flex-row gap-6">
            <AboutCard icon="/icons/home.svg" stats="6,000+" title="Hospitals mapped" description="Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc." />
            <AboutCard icon="/icons/file.svg" stats="12.2%" title="Dispute their bills" description="Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc." />
            <AboutCard icon="/icons/warning.svg" stats="80%" title="Medical bills contain errors" description="Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc." />
          </div>
        </div>
      </div>
    </>
  );
}
