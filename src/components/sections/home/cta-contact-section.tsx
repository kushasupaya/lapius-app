"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

const CtaContactSection = () => {
  const router = useRouter();

  return (
    <section className="w-full">
      <div className="container px-4 xl:px-0 mx-auto py-20">
        <div className="py-40 bg-[url(/images/try-free.svg)] bg-center bg-no-repeat h-full">
          <motion.h2
            className="text-4xl md:text-7xl text-center font-medium mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Try it for free
          </motion.h2>
          <div className="mx-auto text-center">
            <motion.p
              className="text-base md:text-xl text-center mx-auto mb-9 max-w-[530px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Be one of our first beta testers or contact us to learn more. We look forward to hearing from you!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Button
                size="default"
                variant="default"
                type="submit"
                className="bg-tertiary text-tertiary-foreground text-base w-max p-4 h-14 rounded-lg hover:bg-primary focus:outline-none transition duration-300"
                onClick={() => router.push("/contact")}
              >
                <div className="flex items-center w-full justify-between">
                  Get in touch with us
                  <Image alt="" src="/icons/arrow-top-right.svg" height={24} width={24} className="ml-2 md:ml-4" />
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaContactSection;
