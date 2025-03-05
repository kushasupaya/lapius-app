"use client";
import {
  MedicalPricingCard,
  SearchHeader,
} from "@/components/sections/dashboard/components/price-tool";
import { MedicalService } from "@/types/medical-service";
import { useState } from "react";

export default function Home() {
  const [tableData, setTableData] = useState<MedicalService[]>();
  const [loading, setLoading] = useState(false);
  const [insuranceValue, setInsuranceValue] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  return (
    <main>
      <SearchHeader
        setTableData={setTableData}
        setInsuranceValue={setInsuranceValue}
        setIsLoading={setLoading}
        setZipCode={setZipCode}
      />
      {tableData && (
        <MedicalPricingCard
          services={tableData}
          loading={loading}
          insuranceValue={insuranceValue}
          userZipCode={zipCode}
        />
      )}
    </main>
  );
}
