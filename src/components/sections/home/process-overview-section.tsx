import Image from "next/image";
import { ProcessSelection } from "./components";

const ProcessOverviewSection = () => {
  return (
    <section className="w-full border-b">
      <div className="container px-4 xl:px-0 pt-12 pb-16 lg:pb-28 mx-auto">
        <h2 className="text-4xl md:text-6xl font-medium mb-6 text-center max-w-[635px] mx-auto">
          Let <mark className="bg-gradient-to-r from-[#DE4DFF] to-[#5F37FC] inline-block text-transparent bg-clip-text">Lapius AI</mark> handle everything
        </h2>
        <p className="text-base md:text-lg max-w-[684px] text-center mx-auto mb-6">
          Medical bills can be confusing and often include mistakes. Lapius AI automatically checks your hospital bills against your insurance coverage and medical records. If something isn’t right, it disputes the charges for you.
        </p>
        <div className="flex items-center justify-end w-full mb-11">
          <Image
            alt=""
            src="/icons/credit-card.svg"
            height={20}
            width={20}
          />
          <p className="ml-3 text-base md:text-lg text-secondary font-medium">Our Solution</p>
        </div>
        <ProcessSelection />
      </div>
    </section>
  )
}

export default ProcessOverviewSection;
