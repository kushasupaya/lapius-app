"use client";
import React, { useEffect } from "react";
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
  toggleColumnVisibility: (
    column: keyof ColumnVisibility,
    forceOff?: boolean
  ) => void;
  insurance: string;
}

const ColumnFilter = ({
  columnVisibility,
  toggleColumnVisibility,
  insurance,
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
      "standard_charge_algorithm",
      "standard_charge_dollar",
      "estimated_amount",
      "list_price",
      "cash_rate",
      "minimum",
      "maximum",
    ],
    Hospital: ["hospital_name", "setting"],
    Payer: ["payer", "plan_name"],
    Additional: ["additional_notes", "methodology"],
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
    methodology: "Methodology",
  };

  const disabledColumns: (keyof ColumnVisibility)[] = [
    "plan_name",
    "payer",
    "standard_charge_percentage",
    "standard_charge_algorithm",
    "standard_charge_dollar",
  ];
  useEffect(() => {
    if (!insurance || insurance === "Not using insurance") {
      // Force uncheck (hide) disabled columns
      disabledColumns.forEach((key) => {
        if (columnVisibility[key]) {
          toggleColumnVisibility(key, true); // Force uncheck
        }
      });
    } else {
      // Force check (show) disabled columns
      disabledColumns.forEach((key) => {
        if (!columnVisibility[key]) {
          toggleColumnVisibility(key, false); // Force check (show)
        }
      });
    }
  }, [insurance]);
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
                    disabled={
                      disabledColumns.includes(key) &&
                      (!insurance || insurance === "Not using insurance")
                    }
                  />
                  <label
                    htmlFor={key}
                    className={`text-sm ${
                      disabledColumns.includes(key) &&
                      (!insurance || insurance === "Not using insurance")
                        ? "text-gray-400 cursor-not-allowed"
                        : ""
                    }`}
                  >
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
