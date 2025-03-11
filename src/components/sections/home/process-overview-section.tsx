import Image from "next/image";

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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 xl:gap-32 w-full">
          <div className="hidden xl:block w-full">
            <Image
              alt=""
              src="/images/let-lapius.svg"
              height={700}
              width={535}
              className="xl:ml-auto w-full"
            />
          </div>
          <div className="w-full border-t-2 border-tertiary pt-6">
            <div className="border-b-2 border-[#BCBDBF]">
              <h4 className="text-base md:text-xl font-semibold mb-6">We Analyze & Detect Billing Errors</h4>
              <p className="text-sm md:text-base mb-6">
                Lapius AI thoroughly examine your itemized bill, medical records, and EOB to pinpoint mistakes, then craft a negotiation letter for your approval.
              </p>
            </div>
            <div className="border-b-2 border-[#BCBDBF] pt-6">
              <h4 className="text-base md:text-xl font-semibold text-[#7E8083] mb-6">Voice & Written Dispute on Your Behalf</h4>
              <p className="text-sm md:text-base text-[#7E8083] mb-6">
                Lapius AI submits your dispute and automates phone conversations to negotiate directly with your hospital.
              </p>
            </div>
            <div className="border-b-2 border-[#BCBDBF] pt-6">
              <h4 className="text-base md:text-xl font-semibold text-[#7E8083] mb-6">Track & Resolve</h4>
              <p className="text-sm md:text-base text-[#7E8083] mb-6">
                Relax while our AI-Agent handles all the complexities of contesting any incorrect charges. You can monitor progress and communications from your personal dashboard. We'll provide regular updates along the way.
              </p>
            </div>
            <div className="pt-6">
              <h4 className="text-base md:text-xl font-semibold text-[#7E8083] mb-6">Upload your medical bill</h4>
              <p className="text-sm md:text-base text-[#7E8083] mb-6">
                Our AI-solution examines your bill for potential issues. If anything looks off, we automatically request a fully itemized statement and your medical record from the hospital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessOverviewSection;
