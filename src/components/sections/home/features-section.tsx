import Image from "next/image";

const features = [
  {
    icon: "/icons/ai-search-engine.svg",
    title: "Estimate your Cost",
    description: "Chat with our dedicated AI assistant for a comprehensive treatment cost overview",
    link: "#"
  },
  {
    icon: "/icons/price-tool.svg",
    title: "Search for Care",
    description: "Explore pricing data from all Californian hospitals effortlessly with our free and easy-to-use tool",
    link: "#"
  },
  {
    icon: "/icons/medical-bill.svg",
    title: "Analyze your Medical Bill",
    description: "Upload your medical bills or documents to understand them and spot costly billing errors.",
    link: "#"
  }
]

const FeaturesSection = () => {
  return (
    <section className="bg-elliptical-pattern bg-center bg-cover bg-no-repeat w-full">
      <div className="container px-4 md:px-0 mx-auto pt-[100px] pb-[85px]">
        <h2 className="text-[43px]/[54px] font-bold mb-[111px]">Empowering you with the right tools to<br />make informed medical decisions</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {
            features.map((feature, index) => (
              <div key={index}>
                <Image
                  alt=""
                  src={feature.icon}
                  height={48}
                  width={48}
                  className="h-12 w-12 mb-3"
                />
                <h3 className="text-foreground text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-base text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <a href={feature.link} className="flex items-center gap-2 w-max text-primary-foreground font-semibold text-base hover:text-primary-foreground-hover">
                  See more
                  <Image
                    alt="arrow"
                    src="/icons/arrow-right.svg"
                    height={24}
                    width={24}
                  />
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection;
