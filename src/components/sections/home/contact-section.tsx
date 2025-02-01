import ContactForm from "@/components/forms/contact-form";
import { MessageCircleIcon } from "lucide-react"

const ContactSection = () => {
  return (
    <section className="w-full bg-[#F2F8F3]">
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:block w-full max-w-xl bg-rectangular-pattern bg-center bg-cover bg-no-repeat bg-[#F2F8F3] h-full">
          <div className="pt-[221px] pb-[380px] px-4 flex justify-center">
            <div>
              <div className="bg-primary-dashboard/25 rounded-full w-max p-5">
                <MessageCircleIcon size={48} className="fill-green-400 stroke-green-400" />
              </div>
              <h2 className="text-[43px]/[54px] font-bold mt-6 mb-3">Get in touch with us!</h2>
              <p className="text-xl text-muted-foreground mb-6">
                We'll be happy to answer you
              </p>
            </div>
          </div>
        </div>
        <div className="w-full pb-[123px] lg:pb-0 lg:pt-[123px] lg:px-[92px]">
          <div className="lg:hidden pt-[121px] pb-[50px] px-4 flex justify-center">
            <div>
              <div className="bg-primary-dashboard/25 rounded-full w-max p-5">
                <MessageCircleIcon size={48} className="fill-primary-dashboard stroke-primary-dashboard" />
              </div>
              <h2 className="text-[43px]/[54px] font-bold mt-6 mb-3">Get in touch with us!</h2>
              <p className="text-xl text-muted-foreground mb-6">
                We'll be happy to answer you
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

export default ContactSection;
