"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { motion } from "framer-motion";

const FeatureHighlightSection = () => {
  const parentVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="w-full">
      <div className="container px-4 xl:px-0 py-14 lg:py-28 mx-auto">
        <div className="flex flex-row  justify-between gap-11">
          <div>
            <motion.div 
              className="flex items-center w-full mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                alt=""
                src="/icons/annotation.svg"
                height={20}
                width={20}
              />
              <p className="ml-3 text-base md:text-lg text-secondary font-medium">AI MedBill Assistant</p>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-6xl font-medium mb-6 max-w-[625px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Spot Overcharges in Seconds
            </motion.h2>
            <motion.p
              className="text-base md:text-lg max-w-[684px] mb-7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Upload your latest medical bill and see how much you could be saving. Our AI-assistant will analyse it by identifying the most common medical codes (CPT/HCPCS/ICD-10) and identifying potential errors. 
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
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
            </motion.div>
            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-11 md:gap-4"
              variants={parentVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                "Understand the medical codes used",
                "View potential risks of unbundling and upcoding",
                "Find out how much you could save",
              ].map((text, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2 max-w-[250px]"
                  variants={childVariants}
                >
                  <Image
                    alt=""
                    src="/icons/circle-check.svg"
                    height={30}
                    width={30}
                  />
                  <p className="text-base md:text-lg font-medium">{text}</p>
                </motion.div>
              ))}
            </motion.div>
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
