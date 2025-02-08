"use client";

import { FeatureCard } from "@/components/sections/dashboard/components/overview";
import { MedicalService } from "@/types/medical-service";
import {
  IconCashBanknote,
  IconFileAlert,
  IconMessageChatbot,
  IconReportMedical,
} from "@tabler/icons-react";
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
      <div className="flex flex-col py-4">
        <span className="text-2xl font-bold">Hello, {firstName}.</span>
        {/* <span className="text-muted-foreground">How can I help you today?</span> */}
      </div>
      <div className="flex gap-4 p-8 border rounded-md bg-white w-fill">
        <FeatureCard
          icon={<IconFileAlert />}
          link="/dashboard/chatbot"
          description="Analyze with AI your medical bills and detect errors."
          title="Upload Bill"
        />
        <FeatureCard
          icon={<IconCashBanknote />}
          link="/dashboard/price-tool"
          description="Look up the hospital prices in your area."
          title="Price Tool"
        />
        <FeatureCard
          icon={<IconMessageChatbot />}
          link="/dashboard/cost-estimator"
          description="Chat with our assistant to estimate the treatment cost."
          title="Cost Estimator"
        />
      </div>
    </div>
  );
}
