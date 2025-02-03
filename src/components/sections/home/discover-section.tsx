import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const withoutLapius = [
  {
    icon: "/icons/plane.svg",
    title: "Manual or Partial Review",
    description: "May miss billing nuances, leading to unspotted errors.",
  },
  {
    icon: "/icons/shield.svg",
    title: "Procedure-Only Search",
    description: "Little support for symptom-based queries.",
  },
  {
    icon: "/icons/money-euro.svg",
    title: "Limited Customer Support",
    description: "Often restricted to email or slow ticket systems.",
  },
  {
    icon: "/icons/money-euro.svg",
    title: "Fragmented Costs",
    description:
      "Often focuses on procedure codes without factoring additional fees.",
  },
];

const withLapius = [
  {
    icon: "/icons/plane.svg",
    title: "AI-Driven Bill Analysis",
    description: "Automated detection of errors and potential savings.",
  },
  {
    icon: "/icons/shield.svg",
    title: "Symptom-Based Price Search",
    description: "Type in a symptom to find matching procedures and costs.",
  },
  {
    icon: "/icons/money-euro.svg",
    title: "In-Platform Chat Support",
    description: "Ask billing questions & clarify codes in real time.",
  },
  {
    icon: "/icons/money-euro.svg",
    title: "Comprehensive Cost Estimates",
    description: "Complete breakdown for procedures  and services.",
  },
];

const DiscoverSection = () => {
  return (
    <section className="bg-[#F2F8F3]">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="pt-[115px] pb-[100px] flex flex-col">
          <div className="flex flex-col lg:flex-row gap-[50px] lg:items-stretch">
            <div className="flex-1 lg:max-w-[540px] 2xl:max-w-[680px] flex flex-col">
              <div className="w-full p-4 flex-1 rounded-[32px] bg-card text-card-foreground shadow-[20px_40px_80px_0px_rgba(45,51,81,0.12)]">
                <p className="ml-8 text-2xl font-bold mx-4 my-5">
                  Without Lapius
                </p>
                <hr className="border-1"></hr>
                {withoutLapius.map((item, index) => (
                  <div key={index} className="p-6 flex gap-6 items-center">
                    <div className="min-h-16 min-w-16 max-h-16 max-w-16 p-4 rounded-full flex items-center justify-center border border-border">
                      <Image
                        alt=""
                        src={item.icon}
                        height={24}
                        width={24}
                        className="h-8 w-8"
                      />
                    </div>
                    <div>
                      <p className="text-xl 2xl:text-xl font-semibold mb-1">
                        {item.title}
                      </p>
                      <p className="text-lg 2xl:text-xl text-muted-foreground mb-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 lg:mt-0 flex flex-col">
              <div className="w-full p-4 flex-1 rounded-[32px]  bg-card text-card-foreground shadow-[20px_40px_80px_0px_rgba(45,51,81,0.12)]">
                <p className="ml-8 text-2xl font-bold mx-4 my-5">With Lapius</p>
                <hr className="border-1"></hr>
                {withLapius.map((item, index) => (
                  <div key={index} className="p-6 flex gap-6 items-center">
                    <div className="min-h-16 min-w-16 max-h-16 max-w-16 bg-primary-dashboard p-4 rounded-full flex items-center justify-center  ">
                      <Image
                        alt=""
                        src={item.icon}
                        height={24}
                        width={24}
                        className="h-8 w-8"
                      />
                    </div>
                    <div>
                      <p className="text-xl 2xl:text-xl font-semibold mb-1">
                        {item.title}
                      </p>
                      <p className="text-lg 2xl:text-xl text-muted-foreground mb-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
