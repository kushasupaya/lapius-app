"use client";

import { FullScreenVideoDialog } from "@/components/common";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { motion } from "framer-motion";

const CtaDemoSection = () => {
  return (
    <section className="bg-tertiary w-full">
      <div className="container px-4 xl:px-0 mx-auto">
        <div className="grid grid-cols-1 items-end xl:grid-cols-2 gap-11 w-full">
          <div className="w-full pt-12 xl:py-28">
            <Image
              alt=""
              src="/images/dont-spend.svg"
              height={424}
              width={536}
              className="xl:ml-auto w-full"
            />
          </div>
          <div className="w-full pb-12 xl:py-28">
            <motion.h2
              className="text-4xl md:text-7xl text-tertiary-foreground max-w-[554px] font-medium mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Don&apos;t spend 60 days doing it yourself
            </motion.h2>
            <motion.p
              className="text-[#BCBDBF] text-base md:text-2xl max-w-[527px] mb-10 md:mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Our AI has a Karen mode—so you don&apos;t have to unleash yours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <FullScreenVideoDialog
                title="Lapius Platform Demo"
                triggerComponent={
                  <Button
                    size="default"
                    variant="default"
                    type="submit"
                    className="bg-primary text-white text-base w-max p-4 h-14 rounded-lg hover:bg-primary focus:outline-none transition duration-300"
                  >
                    <div className="flex items-center w-full justify-between">
                      View Demo
                      <Image
                        alt=""
                        src="/icons/arrow-top-right.svg"
                        height={24}
                        width={24}
                        className="ml-2 md:ml-4"
                      />
                    </div>
                  </Button>
                }
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaDemoSection;
