import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MedicalCodeItem } from "@/types/medical-service";

interface MedicalCodeAccordionProps {
  items: MedicalCodeItem[];
}

const MedicalCodeAccordion = ({ items }: MedicalCodeAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {items.map((item) => (
        <AccordionItem
          value={item.code}
          key={item.code}
          className="border rounded-xl px-2"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2 text-left">
              <span
                className={cn(
                  "w-3 h-3 rounded-full flex-shrink-0",
                  item.status === "active" && "bg-green-500",
                  item.status === "warning" && "bg-yellow-400",
                  item.status === "error" && "hidden"
                )}
              />
              {item.status === "error" && (
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
              <span className="font-medium">
                {item.code}: {item.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">{item.description}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default MedicalCodeAccordion;
