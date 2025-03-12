import { FaqAccordion } from "./components";

const FaqSection = () => {
  return (
    <section className="pt-12 pb-32">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-medium mb-5">
            Frequently asked questions
          </h2>
          <p className="text-base md:text-lg max-w-[652px] mx-auto text-center">
            Ask everything you need to know about our products and services.
          </p>
        </div>
        <div className="mx-0 xl:mx-24">
          <FaqAccordion />
        </div>
      </div>
    </section>
  )
}

export default FaqSection;
