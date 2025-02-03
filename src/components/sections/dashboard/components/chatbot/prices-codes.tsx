import { Card } from "@/components/ui/card";
import MedicalCodeAccordion from "../medical-code-accordion";

export interface BillingCodeItem {
  code: string;
  description: string;
  status: "active" | "warning" | "error";
  title: string;
}

const priceCodes: BillingCodeItem[] = [
  {
    code: "R51",
    title: "Outdated medical code",
    description: "This medical code is no longer in use",
    status: "error",
  },
];

const PriceCode = () => {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-2">Prices</h2>
      <MedicalCodeAccordion items={priceCodes} />
    </Card>
  );
};

export default PriceCode;
