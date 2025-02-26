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
import { motion } from "framer-motion";

export default function Home() {
  const showTable = true;
  const [tableData, setTableData] = useState<MedicalService[]>();
  const [loading, setLoading] = useState(false);
  const [insuranceValue, setInsuranceValue] = useState<string>("");
  return (
    // <div className="max-w-screen-xl w-full mx-auto md:p-4 2xl:p-2">
    //   <div>
    //     <span className="mb-2 block text-base font-semibold">Price tool</span>
    //     <div className="flex flex-col gap-4 relative">
    //       <motion.div
    //         initial={{ y: "50vh", opacity: 0, scale: 1.1 }}
    //         animate={{
    //           y: tableData ? 0 : "50vh",
    //           opacity: 1,
    //           scale: 1,
    //         }}
    //         transition={{
    //           duration: 0.6,
    //           ease: "easeInOut",
    //         }}
    //         className="flex justify-center"
    //       >
    //         <MedicalSearchBar setTableData={setTableData} />
    //       </motion.div>
    //       <div className="flex-grow h-screen">
    //         {tableData && <MedicalServicesTable tableData={tableData} />}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // {Old}
    <div className="max-w-screen-xl w-full mx-auto md:p-4 2xl:p-2">
      <div>
        <span className="mb-2 block text-base font-semibold">Price tool</span>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-4">
            <div>
              <MedicalSearchBar
                setTableData={setTableData}
                setIsLoading={setLoading}
                setInsuranceValue={setInsuranceValue}
              />
              {/* <SearchCard setTableData={setTableData} /> */}
              {/* <SearchHistory /> */}
            </div>
            <div className="flex-grow h-screen">
              {!tableData ? (
                <EmptyContent />
              ) : (
                <MedicalServicesTable
                  tableData={tableData}
                  loading={loading}
                  insuranceValue={insuranceValue}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
