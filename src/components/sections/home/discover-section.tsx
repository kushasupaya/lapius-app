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
            <div className="flex-1 lg:max-w-[549px] flex flex-col">
              <p className="text-2xl font-bold mb-9">Without Lapius</p>
              <div className="w-full p-4 flex-1 rounded-xl border bg-card text-card-foreground shadow">
                {withoutLapius.map((item, index) => (
                  <div key={index} className="p-6 flex gap-6 items-center">
                    <div className="min-h-14 min-w-14 max-h-14 max-w-14 p-4 rounded-full flex items-center justify-center border border-border">
                      <Image
                        alt=""
                        src={item.icon}
                        height={24}
                        width={24}
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <p className="text-base font-bold mb-1">{item.title}</p>
                      <p className="text-base text-muted-foreground mb-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 lg:mt-0 flex flex-col">
              <p className="text-2xl font-bold mb-9">With Lapius</p>
              <div className="w-full p-4 flex-1 rounded-xl border bg-card text-card-foreground shadow">
                {withLapius.map((item, index) => (
                  <div key={index} className="p-6 flex gap-6 items-center">
                    <div className="min-h-14 min-w-14 max-h-14 max-w-14 bg-primary-dashboard p-4 rounded-full flex items-center justify-center border border-border">
                      <Image
                        alt=""
                        src={item.icon}
                        height={24}
                        width={24}
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <p className="text-base font-bold mb-1">{item.title}</p>
                      <p className="text-base text-muted-foreground mb-1">
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
