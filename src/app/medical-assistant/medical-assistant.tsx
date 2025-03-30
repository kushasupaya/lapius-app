"use client";

import { Footer, FullScreenVideoDialog, Header } from "@/components/common";
import FileUpload from "@/components/common/file-upload";
import UploadFile from "@/components/common/upload-file";
import HospitalForm from "@/components/forms/hospital-form";
import { FaqSection } from "@/components/sections/contact";
import {
  BillingCodesSection,
  SummarySection,
  UnbundingSection,
  UpcodingSection,
} from "@/components/sections/dashboard/tab-sections";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPublicUrl } from "@/lib/uploadS3";
import { cn } from "@/lib/utils";
import { clearFiles } from "@/store/file-slice";
import { useAppDispatch } from "@/store/hook";
import { addFilename, addHospital } from "@/store/hospital-slice";
import { Hospital, Insurance } from "@/types/hospital";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import InsuranceForm from "@/components/forms/insurance-form";

interface FormData {
  hospital: Hospital | null;
  filename: string | null;
  insurance: Insurance | null;
}

const MedicalAssistantPage = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    hospital: null,
    filename: null,
    insurance: null,
  });

  const [loading, setLoading] = useState(false);

  const [apiData, setApiData] = useState<{
    summary: string;
    billingCodes: any[];
    errors: any[];
    prices: any[];
  } | null>(null);

  // {
  //   summary: "I am here",
  //   billingCodes: [
  //     {
  //       id: "1",
  //       title: "Billing Code 1",
  //       description: "Description 1",
  //       severity: "good",
  //     },
  //   ],
  //   errors: [
  //     {
  //       id: "1",
  //       title: "Error 1",
  //       description: "Description 1",
  //       severity: "good",
  //     },
  //   ],
  //   prices: [
  //     {
  //       id: "1",
  //       title: "Price 1",
  //       description: "Description 1",
  //     },
  //   ],
  // }
  const router = useRouter();
  const dispatch = useAppDispatch();

  const tabs = [
    {
      id: "summary",
      label: "Summary",
      content: apiData ? <SummarySection summary={apiData?.summary} /> : null,
    },
    {
      id: "billing-codes",
      label: "Billing Codes",
      content: apiData ? (
        <BillingCodesSection data={apiData.billingCodes} />
      ) : null,
    },
    {
      id: "upcoding",
      label: "Price",
      content: apiData ? <UpcodingSection data={apiData.prices} /> : null,
    },
    {
      id: "unbunding",
      label: "Other Errors",
      content: apiData ? <UnbundingSection data={apiData.errors} /> : null,
    },
  ];

  dispatch(clearFiles());

  const handleHospitalFormSubmit = (hospital: Hospital) => {
    setData({
      hospital: hospital,
      filename: data.filename,
      insurance: data.insurance,
    });
    setStep(1);
  };

  const handleInsuranceFormSubmit = (insurance: Insurance) => {
    setData({
      hospital: data.hospital,
      filename: data.filename,
      insurance: insurance,
    });
    setStep(2);
  };

  const resetAll = () => {
    location.reload();
  };
  const handleFileUpload = (name: string) => {
    setData({
      hospital: data.hospital,
      filename: name,
      insurance: data.insurance,
    });
  };

  const onFileUpload = () => {
    setApiData(null);
    if (data.hospital && data.filename) {
      setLoading(true);
      dispatch(addHospital(data.hospital));
      dispatch(addFilename(data.filename));

      fetch("/api/analyze-med-bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospital_name: data.hospital.hospital_name,
          image_url: data.filename,
          insurance_name: data.insurance?.insurance_name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setApiData({
            summary: data.data.summary,
            billingCodes: Object.entries(data.data.description).map(
              ([key, value]) => ({
                id: key,
                title: key,
                description: value,
                severity: "good",
              })
            ),
            errors: Object.entries(data.data.error).map(([key, value]) => ({
              id: key,
              title: key,
              description: value,
              severity: "good",
            })),
            prices: Object.entries(data.data.price).map(([key, value]) => ({
              id: key,
              title: key,
              description: value,
              severity: "good",
            })),
          });
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 xl:px-0 pt-40">
          <h1 className="text-4xl md:text-7xl text-center font-medium mb-7">
            AI MedBill Assistant
          </h1>
          <p className="text-base text-center md:text-xl mb-16 max-w-[650px] mx-auto">
            Upload your latest medical bill and see how much you could be
            saving. Our AI-assistant will analyse it by identifying the most
            common medical codes (CPT/HCPCS/ICD-10) and identifying potential
            errors.
          </p>

          <div className="p-8 mx-0 xl:mx-44 rounded-lg bg-[url(/images/grow-brand.svg)] bg-cover bg-no-repeat mb-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm text-[#BCBDBF] mb-5 font-semibold">
                  HOSPITAL VISIT
                </h4>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  Enter the name of the hospital where you had your visit
                </p>
              </div>
              <div>
                <h4 className="text-sm text-[#BCBDBF] mb-5 font-semibold">
                  UPLOAD YOUR MEDICAL BILL
                </h4>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  Upload your latest medical bill, that&apos;s all we ask!
                </p>
              </div>
              <div>
                <h4 className="text-sm text-[#BCBDBF] mb-5 font-semibold">
                  REVIEW & SPOT ERRORS
                </h4>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  Our AI will analyse your bill for possible mistakes
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mx-0 xl:mx-44 py-8 px-6 md:px-10 md:pt-9 md:pb-11 rounded-lg border-2 border-tertiary mb-12">
            <Image
              alt=""
              src="/logo/logo-full.svg"
              height={60}
              width={169}
              className="mb-11 md:mb-[72px]"
            />
            {step === 0 ? (
              <>
                <h3 className="text-4xl md:text-6xl max-w-[590px] text-center font-medium mb-14">
                  Which hospital did you visit?
                </h3>
                <HospitalForm onFormSubmit={handleHospitalFormSubmit} />
              </>
            ) : step === 1 ? (
              <>
                <h3 className="text-4xl md:text-6xl max-w-[590px] text-center font-medium mb-14">
                  What insurance do you have?
                </h3>
                <InsuranceForm onFormSubmit={handleInsuranceFormSubmit} />
              </>
            ) : (
              <>
                <h3 className="text-4xl md:text-6xl max-w-[590px] text-center font-medium mb-6">
                  {!apiData
                    ? "Upload your medical bill"
                    : "Check out your results"}
                </h3>
                <div className="flex flex-col md:flex-row gap-x-2 md:gap-x-4 w-full justify-center">
                  <div className="rounded-[32px] w-full h-full max-w-[464px]">
                    <UploadFile onUploadComplete={handleFileUpload} />
                    {/* <FileUpload
                      onFileUpload={handleFileUpload}
                      uploadedFrom="medical-assistant"
                    /> */}
                  </div>
                  {apiData && (
                    <div className="bg-white border border-gray-10 rounded-lg pt-0 w-full xl:max-w-[463px] 2xl:max-w-[578px] text-center h-[380px] overflow-x-hidden overflow-y-auto overflow-hidden">
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
                                index === 0 &&
                                  "rounded-tl-[32px] rounded-bl-none pl-6",
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
                  )}
                </div>
                {apiData ? (
                  <Button
                    size="default"
                    variant="default"
                    type="submit"
                    disabled={loading}
                    className="bg-tertiary text-tertiary-foreground text-base w-max p-4 h-14 mb-4 rounded-lg hover:bg-primary focus:outline-none transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => resetAll()}
                  >
                    Upload new bill
                  </Button>
                ) : (
                  <Button
                    size="default"
                    variant="default"
                    type="submit"
                    disabled={loading}
                    className="bg-tertiary text-tertiary-foreground text-base w-max p-4 h-14 mb-4 rounded-lg hover:bg-primary focus:outline-none transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => onFileUpload()}
                  >
                    <div className="flex items-center w-full justify-between">
                      {loading ? (
                        <>
                          <span>Analyzing</span>
                          <Spinner className="ml-2" />
                        </>
                      ) : (
                        <>
                          Analyze
                          <Image
                            alt=""
                            src="/icons/arrow-top-right.svg"
                            height={24}
                            width={24}
                            className="ml-2 md:ml-4"
                          />
                        </>
                      )}
                    </div>
                  </Button>
                )}
              </>
            )}
          </div>

          <FaqSection />
          {/* 
          <div className="pb-10 pt-0 md:pb-24 md:pt-32">
            <div className="px-14 py-16 rounded-lg bg-[url(/images/grow-brand.svg)] bg-cover bg-no-repeat">
              <div className="flex flex-col gap-11 md:flex-row items-center justify-between">
                <div className="max-w-[750px]">
                  <h2 className="text-4xl md:text-6xl font-medium text-tertiary-foreground mb-4">
                    Don't pay your Hospital Bill
                  </h2>
                </div>
                <FullScreenVideoDialog
                  title="Lapius Platform Demo"
                  triggerComponent={
                    <Button
                      size="default"
                      variant="default"
                      type="submit"
                      className="bg-secondary text-white text-base w-max p-4 h-14 rounded-lg hover:bg-secondary focus:outline-none transition duration-300"
                    >
                      <div className="flex items-center w-full justify-between">
                        View Demo
                        <Image
                          alt=""
                          src="/icons/arrow-top-right.svg"
                          height={24}
                          width={24}
                          className="ml-2 md:ml-4"
                        />
                      </div>
                    </Button>
                  }
                />
              </div>
            </div>
          </div> */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MedicalAssistantPage;
