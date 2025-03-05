import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const features = [
  {
    icon: "/icons/ai-search-engine.svg",
    title: "Estimate your Cost",
    description:
      "Chat with our dedicated AI assistant for a comprehensive treatment cost overview",
    link: "#estimate-cost",
  },
  {
    icon: "/icons/price-tool.svg",
    title: "Search for Care",
    description:
      "Explore pricing data from all Californian hospitals effortlessly with our free and easy-to-use tool",
    link: "/price-tool",
  },
  {
    icon: "/icons/medical-bill.svg",
    title: "Analyze your Medical Bill",
    description:
      "Upload your medical bills or documents to understand them and spot costly billing errors.",
    link: "#analyze-bill",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="how-it-works"
      className="bg-elliptical-pattern bg-center bg-cover bg-no-repeat w-full scroll-mt-20"
    >
      <div className="container px-4 md:px-0 mx-auto pt-10 md:pt-[100px] pb-6 md:pb-[80px] 2xl:px-36">
        <h2
          className={`text-2xl md:text-[37px]/[48px] max-w-3xl font-bold mb-9 md:mb-[90px] ${plusJakartaSans.className}`}
        >
          Empowering you with the right tools to make informed medical decisions
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10 ">
          {features.map((feature, index) => (
            <div key={index}>
              <Image
                alt=""
                src={feature.icon}
                height={48}
                width={48}
                className="h-12 w-12 mb-3"
              />
              <h3 className="text-foreground text-lg md:text-2xl font-semibold mb-4">
                {feature.title}
              </h3>
              <p className="text-base text-muted-foreground mb-6">
                {feature.description}
              </p>
              <a
                href={feature.link}
                className="flex items-center gap-2 w-max text-primary-foreground font-semibold text-base hover:text-primary-dashboard"
              >
                See more
                <Image
                  alt="arrow"
                  src="/icons/arrow-right.svg"
                  height={24}
                  className="hover:text-primary-dashboard"
                  width={24}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
