"use client";

import { Footer, FullScreenVideoDialog, Header } from "@/components/common";
import FileUpload from "@/components/common/file-upload";
import HospitalForm from "@/components/forms/hospital-form";
import { FaqSection } from "@/components/sections/contact";
import { Button } from "@/components/ui/button";
import { clearFiles } from "@/store/file-slice";
import { useAppDispatch } from "@/store/hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  hospital: string | null;
  presignedUrl: string | null;
}

const MedicalAssistantPage = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    hospital: null,
    presignedUrl: null,
  }) 

  const router = useRouter();
  const dispatch = useAppDispatch();

  dispatch(clearFiles());

  const handleHospitalFormSubmit = (text: string) => {
    setData({ hospital: text, presignedUrl: data.presignedUrl });
    setStep(1);
  }

  const handleFileUpload = (url: string) => {
    setData({ hospital: data.hospital, presignedUrl: url });
  }

  const onFileUpload = () => {
    console.log(data);
    router.push("/app")
  }

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 xl:px-0 pt-40">
          <h1 className="text-4xl md:text-7xl text-center font-medium mb-7">
            AI MedBill Assistant
          </h1>
          <p className="text-base text-center md:text-xl mb-16 max-w-[650px] mx-auto">
            Upload your latest medical bill and see how much you could be saving. Our AI-assistant will analyse it by identifying the most common medical codes (CPT/HCPCS/ICD-10) and identifying potential errors. 
          </p>

          <div className="p-8 mx-0 xl:mx-44 rounded-lg bg-[url(/images/grow-brand.svg)] bg-cover bg-no-repeat mb-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm text-[#BCBDBF] mb-5 font-semibold">
                  HOSPITAL VISIT
                </h4>
                <p className="text-base md:text-xl font-medium text-tertiary-foreground">
                  Enter the name of the hospital  where you had your visit
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
            <Image alt="" src="/logo/logo-full.svg" height={60} width={169} className="mb-11 md:mb-[72px]" />
            {
              step === 0
              ? <>
                  <h3 className="text-4xl md:text-6xl max-w-[590px] text-center font-medium mb-14">
                    Which hospital did you visit?
                  </h3>
                  <HospitalForm onFormSubmit={handleHospitalFormSubmit} />
                </>
              : <>
                  <h3 className="text-4xl md:text-6xl max-w-[590px] text-center font-medium mb-6">
                    Upload your medical bill
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-7 w-full justify-center items-end">
                    <div className="rounded-[32px] w-full h-full max-w-[464px]">
                      <FileUpload onFileUpload={handleFileUpload} />
                    </div>
                    <Button
                      size="default"
                      variant="default"
                      type="submit"
                      className="bg-tertiary text-tertiary-foreground text-base w-max p-4 h-14 mb-4 rounded-lg hover:bg-primary focus:outline-none transition duration-300"
                      onClick={() => onFileUpload()}
                    >
                      <div className="flex items-center w-full justify-between">
                        Analyze
                        <Image alt="" src="/icons/arrow-top-right.svg" height={24} width={24} className="ml-2 md:ml-4" />
                      </div>
                    </Button>
                  </div>
                </>
            }
          </div>

          <FaqSection />

          <div className="pb-10 pt-0 md:pb-24 md:pt-32">
            <div className="px-14 py-16 rounded-lg bg-[url(/images/grow-brand.svg)] bg-cover bg-no-repeat">
              <div className="flex flex-col gap-11 md:flex-row items-center justify-between">
                <div className="max-w-[750px]">
                  <h2 className="text-4xl md:text-6xl font-medium text-tertiary-foreground mb-4">
                    Don’t pay your Hospital Bill
                  </h2>
                </div>
                <FullScreenVideoDialog
                  videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  title="Big Buck Bunny"
                  triggerComponent={
                    <Button
                      size="default"
                      variant="default"
                      type="submit"
                      className="bg-secondary text-white text-base w-max p-4 h-14 rounded-lg hover:bg-secondary focus:outline-none transition duration-300"
                    >
                      <div className="flex items-center w-full justify-between">
                        View Demo
                        <Image alt="" src="/icons/arrow-top-right.svg" height={24} width={24} className="ml-2 md:ml-4" />
                      </div>
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MedicalAssistantPage;
