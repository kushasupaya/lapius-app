import { Footer, FullScreenVideoDialog, Header } from "@/components/common";
import ContactForm from "@/components/forms/contact-form";
import { FaqSection } from "@/components/sections/contact";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ContactPage = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 xl:px-0 pt-40">
          <h1 className="text-4xl md:text-7xl text-center font-medium mb-7">
            Get In Touch
          </h1>
          {/* <p className="text-base text-center md:text-xl mb-16 max-w-[650px] mx-auto">
            We consider all the drivers of change gives you the an blocks &
            components you need to change to create a truly professional website
            - so you can save time and stay focused to it.
          </p> */}
          {/* 
          <div className="p-8 mx-0 xl:mx-44 rounded-lg bg-[url(/images/grow-brand.svg)] bg-cover bg-no-repeat mb-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm text-[#BCBDBF] mb-5 font-semibold">
                  USA OFFICE
                </h4>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  Monday-Friday
                </p>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  8:00 am to 5:00 pm
                </p>
              </div>
              <div>
                <h4 className="text-sm text-[#BCBDBF] mb-5 font-semibold">
                  UK OFFICE
                </h4>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  8502 Preston Rd. Ingle,
                </p>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  Maine 98380, USA
                </p>
              </div>
              <div>
                <h4 className="text-sm text-[#BCBDBF] mb-5 font-semibold">
                  CALL US
                </h4>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  +1-246-888-0653
                </p>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  +1-222-632-0194
                </p>
              </div>
            </div>
          </div> */}

          <div className="mx-0 xl:mx-44 py-8 px-6 md:px-10 md:pt-9 md:pb-11 rounded-lg border-2 border-tertiary mb-12">
            <ContactForm />
          </div>

          <FaqSection />
          {/* 
          <div className="pb-10 pt-0 md:pb-24 md:pt-32">
            <div className="px-14 py-16 rounded-lg bg-[url(/images/grow-brand.svg)] bg-cover bg-no-repeat">
              <div className="flex flex-col gap-11 md:flex-row items-center justify-between">
                <div className="max-w-[490px]">
                  <h2 className="text-4xl md:text-6xl font-medium text-tertiary-foreground mb-4">
                    Don&apos;t pay your hospital bills
                  </h2>
                </div>
                <FullScreenVideoDialog
                  videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  title="Big Buck Bunny"
                  triggerComponent={
                    <Button
                      size="default"
                      variant="default"
                      type="submit"
                      className="bg-secondary text-white text-base w-max p-4 h-14 rounded-lg hover:bg-secondary focus:outline-none transition duration-300"
                    >
                      <div className="flex items-center w-full justify-between">
                        View Demo
                        <Image
                          alt=""
                          src="/icons/arrow-top-right.svg"
                          height={24}
                          width={24}
                          className="ml-2 md:ml-4"
                        />
                      </div>
                    </Button>
                  }
                />
              </div>
            </div>
          </div> */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
