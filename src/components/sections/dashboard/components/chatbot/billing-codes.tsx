import { Card } from "@/components/ui/card";
import MedicalCodeAccordion from "../medical-code-accordion";

export interface BillingCodeItem {
  code: string;
  description: string;
  status: "active" | "warning" | "error";
  title: string;
}

const billingCodes: BillingCodeItem[] = [
  {
    code: "H02.401",
    title: "Unspecified ptosis of ...",
    description:
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: "active",
  },
  {
    code: "T14.8",
    title: "T14.8",
    description: "Other injuries of unspecified body region",
    status: "warning",
  },
  {
    code: "G90.2",
    title: "G90.2",
    description: "Horner's syndrome",
    status: "warning",
  },
  {
    code: "R51",
    title: "Outdated medical code",
    description: "This medical code is no longer in use",
    status: "error",
  },
];

const BillingCode = () => {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-2">Billing Code</h2>
      <MedicalCodeAccordion items={billingCodes} />
    </Card>
  );
};

export default BillingCode;
