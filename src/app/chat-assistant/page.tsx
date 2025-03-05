"use client";
import {
  ChatSystem,
  CostEstimator,
} from "@/components/sections/dashboard/components/chatbot";
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
      <CostEstimator />
    </main>
  );
}
