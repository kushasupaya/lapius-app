import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Severity = "good" | "warning";

interface Props {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  onConfirm?: (id: string) => void;
  onDismiss?: (id: string) => void;
}


const variants = {
  good:
    "bg-success text-success-foreground border-t-success-border",
  warning:
    "bg-warning text-warning-foreground border-t-warning-border border-opacity-5"
};

const SeverityAccordion = ({ id, title, description, severity, onConfirm, onDismiss }: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={id} className={cn("border-none rounded-lg", variants[severity])}>
        <AccordionTrigger className={cn("p-4 rounded-lg border-none font-bold hover:no-underline", variants[severity])}>
          <div className="flex items-center text-base gap-2">
            {
              severity === "warning" &&
              <Image alt="icon" src="/icons/severity-warning.svg" height={24} width={24} className="h-6 w-6" />
            }
            {title}
          </div>
        </AccordionTrigger>
        <AccordionContent className={cn("p-4 rounded-b-lg border-t", variants[severity])}>
          <p className={cn("font-medium text-left text-base mb-4", variants[severity])}>{description}</p>
          <div className="flex justify-end items-center gap-3">
            {
              onDismiss &&
              <Button className={cn("py-2 px-4 text-base font-medium shadow-none border border-opacity-100", variants[severity], severity === "warning" ? "border-warning-border border-opacity-10" : "border-success-border")} onClick={() => onDismiss?.(id)}>Dismiss</Button>
            }
            {
              onConfirm &&
              <Button className={cn("py-2 px-4 text-base font-semibold shadow-none border", variants[severity], severity === "warning" ? "border-warning-foreground" : "border-success-foreground")} onClick={() => onConfirm(id)}>Confirm</Button>
            }
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export default SeverityAccordion;
