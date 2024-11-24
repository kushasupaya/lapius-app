import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const FAQAccordion = () => {
  const faqs = [
    {
      question: 'How accurate are DNA testing results, and can they be wrong?',
      answer: 'Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet.',
    },
    {
      question: 'What should I do with my DNA test results?',
      answer: 'Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet.',
    },
    {
      question: 'How does the DNA testing process work from start to finish?',
      answer: 'Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet.',
    },
    {
      question: 'What types of DNA tests are available, and what are their purposes?',
      answer: 'Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet.',
    },
    {
      question: 'What should I do with my DNA test results?',
      answer: 'Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet.',
    },
    {
      question: 'How does the DNA testing process work from start to finish?',
      answer: 'Sit a cursus aliquam sed leo amet nulla at sed nisl at semper ultricies at mattis sit a dignissim amet pretium vitae nunc lacus dapibus scelerisque ultrices tincidunt morbi velit aliquet.',
    },
  ]
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      {
        faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`} className={cn("border rounded-lg px-4 data-[state=closed]:pb-0", (index !== faqs.length - 1) && "mb-4")}>
            <AccordionTrigger className="hover:no-underline text-base font-medium no-icon">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base pr-10">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}

export default FAQAccordion;
