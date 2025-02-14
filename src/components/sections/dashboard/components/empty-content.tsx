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
    <div className="border rounded-lg h-full flex flex-col justify-between bg-white">
      {/* Centered image */}
      <div className="flex flex-col justify-center items-center flex-grow gap-y-4">
        <div>
          <Image
            src="/images/overview/emptyframe.svg"
            alt="Medical Billing Lapius"
            width={150}
            height={150}
          />
        </div>
        <div>
          <h2 className="text-base font-semibold text-center max-w-[450px] mx-auto">
            Start by entering a medical issue, symptom, or procedure to explore
            available pricing options.
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
            <p className="text-gray-600">4. Click "Search" to view results.</p>
          </div>
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
