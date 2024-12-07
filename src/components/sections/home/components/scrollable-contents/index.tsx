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
            ? "z-[10] scale-[0.95] opacity-80"
            : "z-[20] scale-[0.98] opacity-90"
        )}
      >
        <div className="container mx-auto rounded-2xl min-h-[422px] transition-shadow duration-500 shadow-lg bg-gray-100 hover:shadow-2xl">
          <div className="w-full h-full p-4 flex flex-col items-center md:flex-row gap-4">
            <div className="p-3 w-full">
              <p className="text-primary-foreground font-semibold text-3xl mb-2">
                Upload your medical bill
              </p>
              <p className="text-subtitle-normal text-base">
                Upload your medical bills or your itemised bills or EoBs.
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
            ? "z-[10] scale-[0.95] opacity-80"
            : "z-[20] scale-[0.98] opacity-90"
        )}
      >
        <div className="container mx-auto bg-gray-100 rounded-2xl min-h-[422px] transition-shadow duration-500 shadow-lg hover:shadow-2xl">
          <div className="w-full h-full p-4 flex flex-col items-center md:flex-row gap-4">
            <div className="p-3 w-full">
              <p className="text-primary-foreground font-semibold text-3xl mb-2">
                Check each code and description.{" "}
              </p>
              <p className="text-subtitle-normal text-base">
                Check each code and description.
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
            ? "z-[10] scale-[0.95] opacity-80"
            : "z-[20] scale-[0.98] opacity-90"
        )}
      >
        <div className="container mx-auto bg-gray-100 rounded-2xl min-h-[422px] transition-shadow duration-500 shadow-lg hover:shadow-2xl">
          <div className="w-full h-full p-4 flex flex-col items-center md:flex-row gap-4">
            <div className="p-3 w-full">
              <p className="text-primary-foreground font-semibold text-3xl mb-2">
                Detect the potential risks{" "}
              </p>
              <p className="text-subtitle-normal text-base">
                Helping you understand and verify your healthcare charges with
                ease.
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
