"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/common";
import {
  ImageUploadSection,
  PlaceholderSection,
} from "@/components/sections/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserProfile } from "@/components/sections/dashboard/components";
import {
  BillingCodesSection,
  SummarySection,
  UnbundingSection,
  UpcodingSection,
} from "@/components/sections/dashboard/tab-sections";
import { useAppSelector } from "@/store/hook";
import { FileData } from "@/store/file-slice";

const AppHome = () => {
  const { files } = useAppSelector(state => state.files);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
  }, [files]);
  const summary =
    "<span style='font-weight: 600; text-decoration: underline; font-size:20px;'>Visit Date (March 24, 2022)</span>:<br>The patient, John Doe, visited the hospital or medical facility for a same-day service, as the admission and discharge dates are both listed as 03/24/2022.<br><span style='font-weight: 600;'>Blood Draw (Venipuncture)</span>:The first service listed is a venipuncture (blood draw). This indicates that the patient underwent one or more blood tests, suggesting a diagnostic workup or routine health check.<br>Blood Tests Performed:<br>Celiac Screen (Gamma Globulin-IGA): A test to evaluate for celiac disease or immune responses related to gluten intolerance.<br>Comprehensive Metabolic Panel: A broad-spectrum blood test to assess organ function (e.g., liver, kidneys), electrolytes, and overall metabolic health.<br>Vitamin D Test: A specific test to measure the levels of Vitamin D, which could indicate nutritional deficiencies or issues related to bone health.<br>Chest X-Ray:<br>The patient also underwent a chest X-ray (2 views), which is often used to evaluate the lungs, heart, or other structures in the chest. This could indicate that the patient was experiencing symptoms such as chest pain, shortness of breath, or a persistent cough, prompting further investigation.<br>Possible Context or Scenarios:The combination of tests suggests the patient might have presented with generalized symptoms such as fatigue, weakness, gastrointestinal issues, or respiratory concerns.<br>Alternatively, the patient may have been undergoing a routine evaluation or follow-up related to a known condition, such as celiac disease, nutritional deficiency, or respiratory issues.<br>The chest X-ray suggests the provider might have been investigating potential respiratory or cardiac concerns (e.g., pneumonia, heart problems, or a chest injury).<br>The combination of these tests suggests the patient may have been evaluated for:Celiac Disease or Nutritional Deficiencies: The celiac screening and Vitamin D test could point to concerns about malabsorption or deficiencies due to a gastrointestinal condition.<br>Metabolic or Systemic Health Issues: The comprehensive metabolic panel indicates a general health evaluation.<br>Respiratory or Cardiac Conditions: The chest X-ray could suggest investigation into symptoms such as chest pain, shortness of breath, or suspected respiratory infections like pneumonia";

  const billingCode = [
    {
      id: "billing_code",
      title: "HB VENIPUNCTURE (CPT code: 36415)",
      description:
        "Routine venipuncture, which involves collecting blood from a vein using a needle in healthcare settings.",
      severity: "good",
    },
    {
      id: "billing_code1",
      title:
        "HB REF CELIAC SCREEN PANEL, GAMMAGLOBULIN-IGA (Q) (CPT code: 82784)",
      description:
        "Analysis of the concentration of specific gamma globulins in a specimen, including Immunoglobulin A, Immunoglobulin G, and Immunoglobulin M.",
      severity: "warning",
    },
    {
      id: "billing_code2",
      title: "HB COMPREHENSIVE METABOLIC PANEL (CPT code: 80053)",
      description:
        "A comprehensive metabolic panel (CMP) blood test that measures various substances in the blood, including glucose, calcium, electrolytes, and kidney function markers.",
      severity: "warning",
    },
    {
      id: "billing_code3",
      title: "HB-XRAY EXAM CHEST 2 VIEWS (CPT code: 71046)",
      description:
        "A chest X-ray procedure with two views, typically front and side, to provide a comprehensive view of the chest area.",
      severity: "warning",
    },
  ];
  const upcoding = [
    {
      id: "upcoding-2",
      title:
        "HB REF CELIAC SCREEN PANEL, GAMMAGLOBULIN-IGA (Q) (CPT code: 82784)",
      description: "Overcharged by $95.24 ($108.00 - $12.76)",
      severity: "warning",
    },
    {
      id: "upcoding-3",
      title: "HB COMPREHENSIVE METABOLIC PANEL (CPT code: 80053)",
      description:
        "The price charged ($368.00) is significantly higher than the average price in Illinois ($13.04).",
      severity: "warning",
    },
    {
      id: "upcoding-4",
      title: "HB-XRAY EXAM CHEST 2 VIEWS (CPT code: 71046)",
      description:
        "Price: $793.00 (The average price in Illinois is $70.00, and the price of HCPCS code 71046 is $22, indicating a potential overcharge)",
      severity: "warning",
    },
  ];

  const onConfirm = (id: string) => {
    console.log("Confirmed", id);
  };

  const onDismiss = (id: string) => {
    console.log("Confirmed", id);
  };

  const tabs = [
    {
      id: "summary",
      label: "Summary",
      content: <SummarySection summary={summary} />,
    },
    {
      id: "billing-codes",
      label: "Billing Codes",
      content: (
        <BillingCodesSection
          data={billingCode}
          onConfirm={onConfirm}
          onDismiss={onDismiss}
        />
      ),
    },
    {
      id: "upcoding",
      label: "Price",
      content: (
        <UpcodingSection
          data={upcoding}
          onConfirm={onConfirm}
          onDismiss={onDismiss}
        />
      ),
    },
    {
      id: "unbunding",
      label: "Other Errors",
      content: <UnbundingSection />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background p-4 md:py-10 md:px-28">
      <header className="flex flex-row justify-between items-center w-full p-6 mb-4">
        <div className="w-28">
          <Logo variant="default" size="large" />
        </div>
        <UserProfile />
      </header>
      <main className="p-6">
        <div className="flex flex-col gap-4 md:gap-10 xl:flex-row">
          <ImageUploadSection />
          {!loading && files.length > 0 ? (
            <div className="bg-white border-2 border-tertiary rounded-[32px] pt-0 w-full xl:max-w-[463px] 2xl:max-w-[578px] text-center h-[610px] overflow-x-hidden overflow-y-auto overflow-hidden">
              <Tabs
                defaultValue="summary"
                className="rounded-t-[32px] rounded-b-0"
              >
                <TabsList className="p-0 m-0 bg-white h-16 rounded-t-[32px] border-b w-full">
                  {tabs.map((tab, index) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={cn(
                        "py-6 px-auto sm:px-4.5 h-[62px] text-base text-subtitle-dashboard text-opacity-80 font-medium rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-secondary data-[state=active]:text-secondary",
                        index === 0 && "rounded-tl-[32px] rounded-bl-none pl-6",
                        index === tabs.length - 1 &&
                          "rounded-tr-[32px] rounded-br-none pr-6"
                      )}
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {tabs.map((tab) => (
                  <TabsContent value={tab.id} key={tab.id}>
                    {tab.content}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          ) : (
            <PlaceholderSection isLoading={loading} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AppHome;
