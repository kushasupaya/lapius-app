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
        "We combine advanced AI technology with actual prices from all California hospitals and millions of medical claims records.",
    },
    {
      question: "Why should I use Lapius?",
      answer:
        "Nine out of ten patients don't know their medical costs in advance, and nearly 80% of medical bills have errors. Lapius provides tools for complete transparency to help you avoid unexpected charges and mistakes.",
    },
    {
      question: "Is Lapius only for people in California?",
      answer:
        "Our platform has access to all California hospital data, and we are working to expand nationwide in the coming months.",
    },
    {
      question: "Is Lapius secure? Where is my data saved?",
      answer:
        "Your privacy is our priority. Your data is encrypted, secure, and fully protected under HIPAA compliance.",
    },
    {
      question: "Do I need medical billing expert to use Lapius?",
      answer:
        "No, but to consult the hospital price search you need to know the name of the medical service or the medical code associated with it. Nonetheless, our Lapius Copilot will guide you through the price search, starting with the symptoms.",
    },
    {
      question: "How much does Lapius cost?",
      answer:
        "Lapius is currently free to use, with enterprise solutions coming soon.",
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
            "border px-8 data-[state=closed]:pb-0 mb-0",
            index === 0 ? "rounded-t-lg" : "rounded-t-none",
            index === faqs.length - 1? "rounded-b-lg" : "rounded-b-none"
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
