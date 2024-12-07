import { FaqSlider, FaqTabs, SectionTitle } from "./components";

const FaqSection = () => {
    return (
        <section id="faq" className="bg-white">
            <div className="container mx-auto p-4 lg:px-0 md:pt-20 md:pb-24">
                <div className="flex flex-col mb-4 lg:mb-0 lg:flex-row lg:items-end gap-6">
                    <div className="flex flex-col">
                        <SectionTitle title="faq" />
                        <h2 className="max-w-[607px] mt-2.5 text-black text-[32px] font-semibold text-left lg:mb-10 leading-tight">
                            Frequently Asked
                            <br /> Questions
                        </h2>
                        <div className="relative hidden lg:block">
                            <FaqSlider />
                        </div>
                    </div>
                    <div className="w-full">
                        <FaqTabs />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
