'use client';

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/common";
import { ImageUploadSection, PlaceholderSection } from "@/components/sections/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserProfile } from "@/components/sections/dashboard/components";
import { BillingCodesSection, SummarySection, UnbundingSection, UpcodingSection } from "@/components/sections/dashboard/tab-sections";

const AppHome = () => {
  const [files, setFiles] = useState<Array<File | Blob | string>>([]);

  const summary = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  const upcoding = [
    {
      id: "upcoding-1",
      title: "H02.401: Unspecified ptosis of right eyelid",
      description: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.",
      severity: "good"
    },
    {
      id: "upcoding-2",
      title: "HC ER OB Level IV (99284)",
      description: "This code is for high-complexity emergency obstetric services. If the medical documentation does not justify the high complexity level (e.g., the patient did not require extensive resources or time), this could be considered upcoding.",
      severity: "warning"
    },
  ];

  const onConfirm = (id: string) => {
    console.log("Confirmed", id);
  }

  const onDismiss = (id: string) => {
    console.log("Confirmed", id);
  }

  const tabs = [
    {
      id: "summary",
      label: "Summary",
      content: <SummarySection summary={summary} />,
    },
    {
      id: "billing-codes",
      label: "Billing Codes",
      content: <BillingCodesSection />,
    },
    {
      id: "upcoding",
      label: "Upcoding",
      content: <UpcodingSection data={upcoding} onConfirm={onConfirm} onDismiss={onDismiss} />,
    },
    {
      id: "unbunding",
      label: "Unbunding",
      content: <UnbundingSection />,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-secondary p-4 md:py-10 md:px-28">
      <header className="flex flex-row justify-between items-center w-full p-6 mb-4">
        <div className="w-28">
          <Logo variant="default" size="large" />
        </div>
        <UserProfile />
      </header>
      <main className="p-6">
        <div className="flex flex-col gap-4 md:gap-10 xl:flex-row">
          <ImageUploadSection files={files} setFiles={setFiles} />
          {
            files.length > 0
            ? <div className="bg-white rounded-[32px] pt-0 w-full xl:max-w-[451px] text-center h-[610px] overflow-x-hidden overflow-y-auto">
                <Tabs defaultValue="summary" className="rounded-t-[32px] rounded-b-0">
                  <TabsList className="p-0 m-0 bg-white h-16 rounded-t-[32px] border-b">
                    {
                      tabs.map((tab, index) => (
                        <TabsTrigger
                          key={tab.id}
                          value={tab.id}
                          className={cn(
                            "py-6 px-auto sm:px-4.5 h-[62px] text-base text-subtitle-dashboard text-opacity-80 font-medium rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-secondary data-[state=active]:text-secondary",
                            index === 0 && "rounded-tl-[32px] rounded-bl-none pl-6",
                            index === tabs.length - 1 && "rounded-tr-[32px] rounded-br-none pr-6",
                          )}
                        >
                          {tab.label}
                        </TabsTrigger>
                      ))
                    }
                  </TabsList>
                  {
                    tabs.map(tab => (
                      <TabsContent value={tab.id} key={tab.id}>
                        {tab.content}
                      </TabsContent>
                    ))
                  }
                </Tabs>
              </div>
            : <PlaceholderSection />
          }
        </div>
      </main>
    </div>
  )
};

export default AppHome;
