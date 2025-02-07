"use client";
import { ComingSoon } from "@/components/sections/dashboard/components";
import {
  BillingCode,
  BillSummary,
  ChatSystem,
  DocumentList,
  PriceCode,
} from "@/components/sections/dashboard/components/chatbot";
import { useState } from "react";

export default function Home() {
  const [activeDocumentId, setActiveDocumentId] = useState<string>();

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-4xl mx-auto py-4 px-28">
        <ComingSoon />
        {/* <ChatSystem chatType="cost" /> */}
      </div>
    </div>

    // <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-2 lg:gap-4">
    //   <div className="md:col-span-1">
    //     <DocumentList
    //       onSelectDocument={(doc) => setActiveDocumentId(doc.id)}
    //       activeDocumentId={activeDocumentId}
    //     />
    //   </div>

    //   <div className="md:col-span-2">
    //     <ChatSystem />
    //   </div>

    //   <div className="md:col-span-1 space-y-4">
    //     <BillSummary />
    //     <BillingCode />
    //     <PriceCode />
    //   </div>
    // </div>
  );
}
