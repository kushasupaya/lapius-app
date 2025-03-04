"use client";
import {
  MedicalPricingCard,
  SearchHeader,
} from "@/components/sections/dashboard/components/price-tool";
import { MedicalService } from "@/types/medical-service";
import { useState } from "react";

export default function Home() {
  const services = [
    {
      hospital_name: "Mh -Ocean Medical Center",
      address: "425 Jack Martin Boulevard",
      state: "NJ",
      code: "29894",
      code_type: "CPT",
      description: "Ankle Repair - Arthroscopic",
      payer: "Cash price",
      rate: "3180.00",
      minimum: "3180.00",
      maximum: "3180.00",
      list_price: "3975.00",
      cash_rate: "3180.00",
      additional_notes:
        "Arthroscopy is a surgical technique used to perform procedures on joints. It involves making several small incisions through which a camera, light, and specialized surgical instruments are inserted to perform the procedure. This minimally invasive approach allows for quicker recovery times and less scarring compared to traditional open surgery. In the case of ankle repair, arthroscopy can be used to treat various conditions such as ankle instability, cartilage damage, or removal of bone spurs.",
      standard_charge_percentage: "80%",
      standard_charge_dollar: "3180.00",
      estimated_amount: "3180.00",
      rev_code: "",
      standard_charge_algorithm: "",
      plan_name: "",
      setting: "Outpatient",
      methodology: "Percentage of charges",
    },
    {
      hospital_name: "St. Mary's Hospital",
      address: "1500 Forest Glen Road",
      state: "OH",
      code: "29881",
      code_type: "CPT",
      description: "Knee Arthroscopy",
      payer: "Cash price",
      rate: "4200.00",
      minimum: "4200.00",
      maximum: "4200.00",
      list_price: "5250.00",
      cash_rate: "4200.00",
      additional_notes:
        "Knee arthroscopy is a minimally invasive surgical procedure used to diagnose and treat various knee problems. A small camera is inserted into the knee joint, allowing the surgeon to view the inside of the knee on a screen. This technique can be used to repair torn cartilage, remove loose bodies, reconstruct torn ligaments, or treat other knee conditions. The procedure typically results in less pain and faster recovery compared to traditional open knee surgery.",
      standard_charge_percentage: "80%",
      standard_charge_dollar: "4200.00",
      estimated_amount: "4200.00",
      rev_code: "",
      standard_charge_algorithm: "",
      plan_name: "",
      setting: "Outpatient",
      methodology: "Percentage of charges",
    },
  ];

  const [tableData, setTableData] = useState<MedicalService[]>();
  const [loading, setLoading] = useState(false);
  const [insuranceValue, setInsuranceValue] = useState<string>("");

  return (
    <main>
      <SearchHeader
        setTableData={setTableData}
        setInsuranceValue={setInsuranceValue}
        setIsLoading={setLoading}
      />
      {tableData && (
        <MedicalPricingCard
          services={tableData}
          loading={loading}
          insuranceValue={insuranceValue}
        />
      )}
    </main>
  );
}
