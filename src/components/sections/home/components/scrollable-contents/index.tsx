"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ScrollableContents = () => {
  const [activeDiv, setActiveDiv] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveDiv(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -50% 0px",
      }
    );

    const sections = document.querySelectorAll(".scroll-div");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative h-[350vh] bg-white">
      <div
        data-index={1}
        className={cn(
          "scroll-div sticky top-0 h-screen flex items-center justify-center text-black text-4xl transition-transform duration-500",
          activeDiv === 1
            ? "z-[30] scale-100 opacity-100"
            : activeDiv > 1
            ? "z-[10] scale-[0.95] "
            : "z-[20] scale-[0.98] "
        )}
      >
        <div className="container mx-auto rounded-2xl min-h-[422px] transition-shadow duration-500 shadow-lg bg-gray-100 hover:shadow-2xl">
          <div className="w-full h-full p-4 flex flex-col items-center md:flex-row gap-4">
            <div className="p-3 w-full">
              <p className="text-primary-foreground font-semibold text-3xl mb-2">
                Upload your medical bill
              </p>
              <p className="text-subtitle-normal text-base">
                Your privacy is our priority. Your data is encrypted, secure,
                and fully protected under{" "}
                <span className="text-[#ACDB88] font-semibold">
                  HIPAA compliance
                </span>
              </p>
            </div>
            <div className="bg-primary rounded-lg h-full w-full">
              <Image
                alt="story"
                src="/images/story.svg"
                width={500}
                height={500}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        data-index={2}
        className={cn(
          "scroll-div sticky top-0 h-screen flex items-center justify-center text-black text-4xl transition-transform duration-500",
          activeDiv === 2
            ? "z-[30] scale-100 opacity-100"
            : activeDiv > 2
            ? "z-[10] scale-[0.95] "
            : "z-[20] scale-[0.98] "
        )}
      >
        <div className="container mx-auto bg-gray-100 rounded-2xl min-h-[422px] transition-shadow duration-500 shadow-lg hover:shadow-2xl">
          <div className="w-full h-full p-4 flex flex-col items-center md:flex-row gap-4">
            <div className="p-3 w-full">
              <p className="text-primary-foreground font-semibold text-3xl mb-2">
                Let AI do the work for you
              </p>
              <p className="text-subtitle-normal text-base">
                <span className="text-[#ACDB88] font-semibold">
                  Lapius scans and reviews every line item
                </span>
                ,cross-referencing medical codes and checking for common billing
                errors.{" "}
              </p>
            </div>
            <div className="bg-primary rounded-lg h-full w-full">
              <Image
                alt="story"
                src="/images/story.svg"
                width={500}
                height={500}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        data-index={3}
        className={cn(
          "scroll-div sticky top-0 h-screen flex items-center justify-center text-black text-4xl transition-transform duration-500",
          activeDiv === 3
            ? "z-[30] scale-100 opacity-100"
            : activeDiv > 3
            ? "z-[10] scale-[0.95] "
            : "z-[20] scale-[0.98] "
        )}
      >
        <div className="container mx-auto bg-gray-100 rounded-2xl min-h-[422px] transition-shadow duration-500 shadow-lg hover:shadow-2xl">
          <div className="w-full h-full p-4 flex flex-col items-center md:flex-row gap-4">
            <div className="p-3 w-full">
              <p className="text-primary-foreground font-semibold text-3xl mb-2">
                Review potential risks
              </p>
              <p className="text-subtitle-normal text-base">
                Get a clear, detailed report that highlights any discrepancies
                to understand{" "}
                <span className="text-[#ACDB88] font-semibold">
                  what’s wrong and why it matters
                </span>
              </p>
            </div>
            <div className="bg-primary rounded-lg h-full w-full">
              <Image
                alt="story"
                src="/images/story.svg"
                width={500}
                height={500}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ScrollableContents;
