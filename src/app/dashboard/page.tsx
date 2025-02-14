"use client";

import { FeatureCard } from "@/components/sections/dashboard/components/overview";
import { MedicalService } from "@/types/medical-service";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const showTable = true;
  const [tableData, setTableData] = useState<MedicalService[]>();
  const [firstName, setFirstName] = useState("user");

  useEffect(() => {
    // Access localStorage on the client-side
    const userData = localStorage.getItem("user");
    if (userData) {
      setFirstName(JSON.parse(userData).firstName);
    }
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col py-2">
        <span className="text-2xl font-bold">Hello, {firstName}.</span>
      </div>
      <div className="flex flex-col md:flex-row gap-4 py-4 w-fill">
        <FeatureCard
          icon={
            <Image
              src="/icons/billupload.svg" // Update with your image path
              alt="Upload Bill"
              width={100}
              height={100}
            />
          }
          link="/dashboard/chatbot"
          description="Analyze with AI your medical bills and detect errors."
          title="Upload Bill"
        />
        <FeatureCard
          icon={
            <Image
              src="/icons/pricetool.svg" // Update with your image path
              alt="Price Tool"
              width={50}
              height={50}
            />
          }
          link="/dashboard/price-tool"
          description="Look up the hospital prices in your area."
          title="Price Tool"
        />
        <FeatureCard
          icon={
            <Image
              src="/icons/costestimator.svg" // Update with your image path
              alt="Cost Estimator"
              width={50}
              height={50}
            />
          }
          link="/dashboard/cost-estimator"
          description="Chat with our AI assistant to estimate the treatment cost."
          title="Cost Estimator"
        />
      </div>
    </div>
  );
}