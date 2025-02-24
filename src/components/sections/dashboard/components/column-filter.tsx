import React from "react";
import { Plus, Minus } from "lucide-react";
import { ColumnVisibility } from "@/types/medical-service";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnFilterProps {
  columnVisibility: ColumnVisibility;
  toggleColumnVisibility: (column: keyof ColumnVisibility) => void;
}

const ColumnFilter = ({
  columnVisibility,
  toggleColumnVisibility,
}: ColumnFilterProps) => {
  const visibleColumns = Object.entries(columnVisibility)
    .filter(([_, isVisible]) => isVisible)
    .map(([key]) => key as keyof ColumnVisibility);

  const hiddenColumns = Object.entries(columnVisibility)
    .filter(([_, isVisible]) => !isVisible)
    .map(([key]) => key as keyof ColumnVisibility);

  const columnCategories: Record<string, (keyof ColumnVisibility)[]> = {
    Location: ["address", "state"],
    Code: ["code", "code_type", "rev_code"],
    Pricing: [
      "standard_charge_percentage",
      "standard_charge_dollar",
      "estimated_amount",
      "list_price",
      "cash_rate",
      "minimum",
      "maximum",
    ],
    Hospital: ["hospital_name", "setting"],
    Payer: ["payer", "plan_name"],
    Additional: ["standard_charge_algorithm", "additional_notes"],
  };

  const columnLabels: Record<keyof ColumnVisibility, string> = {
    hospital_name: "Hospital Name",
    address: "Address",
    state: "State",
    code: "Code",
    code_type: "Code Type",
    description: "Description",
    payer: "Payer",
    standard_charge_percentage: "Standard Charge Percentage",
    standard_charge_dollar: "Standard Charge Dollar",
    estimated_amount: "Estimated Amount",
    rev_code: "Revenue Code",
    standard_charge_algorithm: "Standard Charge Algorithm",
    minimum: "Minimum",
    maximum: "Maximum",
    list_price: "List Price",
    cash_rate: "Cash Rate",
    additional_notes: "Additional Notes",
    setting: "Setting",
    plan_name: "Plan Name",
  };

  return (
    <div className="rounded-lg w-full max-w-sm pb-4">
      {/* Active Filters */}
      <h3 className="font-bold text-lg pb-2 border-b-2 ">Filter</h3>
      <Accordion type="multiple" className="pt-2">
        {Object.entries(columnCategories).map(([category, columns]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="font-semibold">
              {category}
            </AccordionTrigger>
            <AccordionContent className="space-y-2">
              {columns.map((key) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={columnVisibility[key]}
                    className=" data-[state=checked]:text-white"
                    onCheckedChange={() => toggleColumnVisibility(key)}
                  />
                  <label htmlFor={key} className="text-sm">
                    {columnLabels[key]}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {/* <div className="space-y-2 pt-2">
        {visibleColumns.map((key) => (
          <button
            key={key}
            className="flex text-sm justify-between items-center w-full bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md"
            onClick={() => toggleColumnVisibility(key)}
          >
            {columnLabels[key]}
            <Minus className="w-4 h-4  text-gray-800 border border-gray-500 rounded-full hover:bg-red-500 hover:text-white" />
          </button>
        ))}
      </div> */}

      {/* Hidden Filters */}
      {/* <h3 className="font-bold text-lg pt-4">More</h3>
      <div className="space-y-2 pt-2">
        {hiddenColumns.map((key) => (
          <button
            key={key}
            className="flex text-sm justify-between items-center w-full bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md"
            onClick={() => toggleColumnVisibility(key)}
          >
            {columnLabels[key]}
            <Plus className="w-4 h-4  text-gray-800 border border-gray-500 rounded-full hover:bg-primary hover:text-white" />
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default ColumnFilter;
