"use client";
import { getRandomHealthcareFact } from "@/utils/tableFakeData";
import Image from "next/image";
import { useEffect, useState } from "react";

const EmptyContent = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    setFact(getRandomHealthcareFact());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20 space-y-4  w-full text-center px-4">
      {/* Centered image */}
      <Image
        src="/images/overview/emptyframe.svg"
        alt="Medical Billing Lapius"
        width={150}
        height={150}
      />
      <div>
        <h2 className="text-base font-semibold text-center max-w-[450px] mb-4 mx-auto">
          Start by entering a CPT/HCPCS/MSDRG code to explore available pricing
          options.
        </h2>

        {/* Steps */}
        <div className="space-y-2 text-left mt-2 text-sm">
          <p className="text-gray-600">
            1. Enter your CPT/HCPCS/MSDRG code in the search bar.
          </p>
          <p className="text-gray-600">
            2. Provide a ZIP code to narrow your search.
          </p>
          <p className="text-gray-600">
            3. Select insurance preferences (if applicable).
          </p>
          <p className="text-gray-600">4. Click Search to view results.</p>
        </div>
      </div>
      {/* Content at the bottom */}
      {/* <div className="text-center mt-4 border-t p-4">
            <span className="text-muted-foreground italic text-sm">
              Facts: {fact}
            </span>
          </div> */}
    </div>
  );
};

export default EmptyContent;
