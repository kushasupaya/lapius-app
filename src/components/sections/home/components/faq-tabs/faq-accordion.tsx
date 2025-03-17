import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const FAQAccordion = () => {
  const faqs = [
    {
      question: "Can MedBill handle any type of medical bill?",
      answer:
        "MedBill is specially designed to handle itemized bills in png/jpg format.  Yet, it can work with most types of the medical bills,  including UB-04 forms. Our system automatically extracts all relevant data including revenue codes, procedure codes, and charges - eliminating manual data entry and reducing processing time from hours to seconds.",
    },
    {
      question: "How do you handle data privacy?",
      answer:
        "MedBill assistant processes bills in real-time and does not store any uploaded documents. Your data is analyzed instantly and then automatically deleted from our systems, ensuring maximum privacy and security.",
    },
    {
      question: "Do you support all types of insurance?",
      answer:
        "We support the major insurance companies and payers in California.",
    },
    {
      question: "How much does Lapius cost?",
      answer:
        "Lapius is currently free to use, with enterprise solutions coming soon.",
    },
    {
      question: "How do you provide support?",
      answer:
        "You can contact us by e-mail (support@lapiusai.com) if you have questions or concerns regarding your data and the process.",
    },
  ];
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className={cn(
            "border rounded-lg px-4 data-[state=closed]:pb-0",
            index !== faqs.length - 1 ? "mb-4" : "mb-2"
          )}
        >
          <AccordionTrigger className="hover:no-underline text-base font-medium no-icon">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-base pr-9">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
