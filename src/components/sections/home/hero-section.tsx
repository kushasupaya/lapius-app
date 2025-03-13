"use client";

import Image from "next/image";
import SubscribeForm from "@/components/forms/subscribe-form";

import { motion } from "framer-motion";

const HeroSection = () => {

  return (
    <section className="bg-hero-section-pattern bg-center bg-cover bg-no-repeat w-full transition duration-200 ease-out">
      <div className="container px-4 xl:px-0 mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 w-full">
          <div className="w-full pt-24 md:pt-40 xl:pt-[243px]">
            <motion.h1
              className="text-4xl md:text-7xl font-medium mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Don&apos;t pay your<br /><mark className="bg-gradient-to-r from-[#DE4DFF] to-[#5F37FC] inline-block text-transparent bg-clip-text">Hospital Bill</mark>
            </motion.h1>
            <motion.p
              className="text-base md:text-xl mb-8 max-w-[530px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Empowering you with an AI-driven advocate that detects errors, negotiates on your behalf, and ensures you only pay for the care you received.
            </motion.p>
            <motion.div
              className="max-w-[528px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SubscribeForm />
            </motion.div>
          </div>
          <div className="w-full xl:pt-[218px]">
            <Image
              alt=""
              src="/images/hero.svg"
              height={527}
              width={665}
              className="xl:ml-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
