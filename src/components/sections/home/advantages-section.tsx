"use client";

import { motion } from "framer-motion";

const AdvantagesSection = () => {
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

  const infoItems = [
    "Your health information is encrypted and stored securely, meeting strict <strong>HIPAA</strong> standards.",
    "Our technology uses advanced algorithms trained on thousands of medical claims to detect errors in under a minute. By contrast, traditional dispute services take days to uncover the same issues.",
    "We’re transparent about our process, fees, and any next steps—so you know exactly where your dispute stands at all times.",
  ];

  return (
    <section className="bg-muted">
      <div className="container px-4 xl:px-0 py-16 lg:py-28 mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-medium mb-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The Lapius Advantage
        </motion.h2>
        <motion.p
          className="text-base md:text-lg max-w-[622px] text-center mx-auto mb-12 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Amet minim mollit non deserunt ullamco est site aliqua dolor. velit amet suiget officia. Exercitation veniam consequat sit.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={parentVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {infoItems.map((item, index) => (
            <motion.div
              key={index}
              className="w-full h-[395px] bg-background px-9 py-16 border-[3px] border-tertiary rounded-lg text-base md:text-xl"
              variants={childVariants}
            >
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AdvantagesSection;
