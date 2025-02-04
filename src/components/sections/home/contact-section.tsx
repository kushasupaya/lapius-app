import ContactForm from "@/components/forms/contact-form";
import { MessageCircleIcon } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="w-full pb-5 lg:pb-[200px] ">
      <div className="flex flex-col lg:flex-row bg-secondary relative">
        <div className="hidden lg:block h-full flex-1 min-h-[512px] w-full max-w-3xl bg-secondary" />
        <div className="hidden lg:block w-full flex-1 min-h-[512px]" />
        <div className="container py-12 md:py-20 px-4 lg:px-0 lg:py-0 z-10 mx-auto lg:absolute lg:top-[60px] md:left-[calc((100vw-768px)/2)] lg:left-[calc((100vw-1024px)/2)] xl:left-[calc((100vw-1280px)/2)]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="lg:pt-[131px] lg:pb-[150px] px-4 flex justify-center">
              <div>
                <div className="bg-primary-dashboard/25 rounded-full w-max p-3 md:p-5">
                  <MessageCircleIcon
                    size={48}
                    className="fill-green-400 h-10 w-10 md:h-12 md:w-12 stroke-green-400"
                  />
                </div>
                <h2 className="text-3xl md:text-[43px]/[54px] text-white font-bold mt-6 mb-3">
                  Get in touch with us!
                </h2>
                <p className="text-base md:text-xl text-muted-foreground md:mb-6">
                  We&apos;ll be happy to answer you
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
