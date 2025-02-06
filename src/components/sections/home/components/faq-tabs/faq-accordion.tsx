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
      question: "How accurate are Lapius results, and can they be wrong?",
      answer:
        "We combine cutting-edge AI technology with real prices from more than 6,000 healthcare settings. Our solution achieves over 95% accuracy in identifying potential risks.",
    },
    {
      question: "Why should I use Lapius?",
      answer:
        "Medical bills can be confusing, and up to 80% of them contain errors. Lapius helps you understand your bills, identify overcharges, and resolve issues, potentially saving you money and stress.",
    },
    {
      question: "Is Lapius only for people in California?",
      answer: "Early in the coming year.",
    },
    {
      question: "Is Lapius secure? Where is my data saved?",
      answer:
        "Your privacy is our priority. Your data is encrypted, secure, and fully protected under HIPAA compliance.",
    },
    {
      question: "What type of documents can I upload?",
      answer:
        "For the moment you can upload medical bills, itemized statements, and explanation of benefits (EoB) in formats like PDF, JPEG, and PNG.",
    },
    {
      question: "Do I need medical billing expert to use Lapius?",
      answer:
        "For the moment you can upload medical bills, itemized statements, and explanation of benefits (EoB) in formats like PDF, JPEG, and PNG.",
    },
    {
      question: "How much does Lapius cost?",
      answer: "Completely free.",
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
