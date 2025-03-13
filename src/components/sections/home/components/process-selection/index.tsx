"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { describe } from "node:test";
import { useState } from "react";

const data = [
  {
    "id": 1,
    "title": "We Analyze & Detect Billing Errors",
    "description": "Lapius AI thoroughly examine your itemized bill, medical records, and EOB to pinpoint mistakes, then craft a negotiation letter for your approval.",
    "image": "/images/process/1.svg"
  },
  {
    "id": 2,
    "title": "Voice & Written Dispute on Your Behalf",
    "description": "Lapius AI submits your dispute and automates phone conversations to negotiate directly with your hospital.",
    "image": "/images/process/2.svg"
  },
  {
    "id": 3,
    "title": "Track & Resolve",
    "description": "Relax while our AI-Agent handles all the complexities of contesting any incorrect charges. You can monitor progress and communications from your personal dashboard. We'll provide regular updates along the way.",
    "image": "/images/process/3.svg"
  },
  {
    "id": 4,
    "title": "Upload your medical bill",
    "description": "Our AI-solution examines your bill for potential issues. If anything looks off, we automatically request a fully itemized statement and your medical record from the hospital.",
    "image": "/images/process/4.svg"
  },
]

const ProcessSelection = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-11 xl:gap-32 w-full">
      <div className="hidden md:block w-full">
        <Image
          alt=""
          src={data.find(i => i.id === active)?.image ?? ""}
          height={700}
          width={535}
          className="xl:ml-auto w-full"
        />
      </div>
      <div className="w-full">
        {
          data.map(item => (
            <div 
              key={item.id}
              className={cn(
                "border-t-2 hover:border-tertiary hover:text-foreground pt-6 cursor-pointer",
                active === item.id ? "border-tertiary text-foreground" : "border-[#BCBDBF] text-muted-foreground" 
              )}
              onClick={() => setActive(item.id)}
            >
              <h4 className="text-base md:text-xl font-semibold mb-6">
                {item.title}
              </h4>
              <p className="text-sm md:text-base mb-6">
                {item.description}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ProcessSelection;
