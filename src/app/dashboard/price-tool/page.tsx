"use client";
import {
  EmptyContent,
  MedicalServicesTable,
  SearchCard,
  SearchHistory,
} from "@/components/sections/dashboard/components";
import { MedicalSearchBar } from "@/components/sections/dashboard/components/price-tool";
import { MedicalService } from "@/types/medical-service";
import { useState } from "react";

export default function Home() {
  const showTable = true;
  const [tableData, setTableData] = useState<MedicalService[]>();
  return (
    <div>
      <div className="rounded-lg p-4">
        <span className="mb-2 block text-base font-semibold">Price tool</span>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-4">
            <div>
              <MedicalSearchBar setTableData={setTableData} />
              {/* <SearchCard setTableData={setTableData} /> */}
              {/* <SearchHistory /> */}
            </div>
            <div className="flex-grow h-screen">
              {!tableData ? (
                <EmptyContent />
              ) : (
                <MedicalServicesTable tableData={tableData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
