"use client";
import {
  EmptyContent,
  MedicalServicesTable,
  SearchCard,
  SearchHistory,
} from "@/components/sections/dashboard/components";
import { MedicalService } from "@/types/medical-service";
import { useState } from "react";

export default function Home() {
  const showTable = true;
  const [tableData, setTableData] = useState<MedicalService[]>();
  return (
    <div>
      <div className="rounded-lg p-4">
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-row gap-4">
            <div className="space-y-4">
              <SearchCard setTableData={setTableData} />
              <SearchHistory />
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
