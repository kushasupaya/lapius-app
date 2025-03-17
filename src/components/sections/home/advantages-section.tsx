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
    {
      heading: "Search for Fair Prices",
      content:
        "Our platform leverages data from hospitals and other patients to give you a transparent view of fair costs, helping you understand and compare the charges on your itemized bill.",
    },
    {
      heading: "Expert Insights",
      content:
        "We analyze your bill and compare it against crowdsourced data, flagging suspicious or inflated charges and providing guidance on the next steps for potential reductions.",
    },
    {
      heading: "Automated Negotiations",
      content:
        "Our automated agents negotiate directly with billing departments on your behalf, keeping you updated every step of the way to ensure you secure the best possible outcome.",
    },
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
          Why <span className="text-primary">Lapius AI</span>
        </motion.h2>
        <motion.p
          className="text-base md:text-lg max-w-[622px] text-center mx-auto mb-12 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Amet minim mollit non deserunt ullamco est site aliqua dolor. velit
          amet suiget officia. Exercitation veniam consequat sit. */}
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
              <h2 className="text-2xl font-bold text-center block mb-4">
                {item.heading}
              </h2>
              <span dangerouslySetInnerHTML={{ __html: item.content }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
