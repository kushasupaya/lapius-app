import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconBinoculars,
  IconCashBanknoteOff,
  IconCashOff,
  IconChartLine,
  IconFile,
  IconHeadphonesOff,
  IconMessageChatbot,
  IconReportMedical,
  IconSearchOff,
  IconShieldCancel,
  IconShieldExclamation,
  IconZoomExclamation,
  IconZoomExclamationFilled,
} from "@tabler/icons-react";
import Image from "next/image";

const withoutLapius = [
  {
    icon: IconShieldCancel,
    title: "Manual or Partial Review",
    description: "May miss billing nuances, leading to unspotted errors.",
  },
  {
    icon: IconZoomExclamation,
    title: "Procedure-Only Search",
    description: "Little support for symptom-based queries.",
  },
  {
    icon: IconHeadphonesOff,
    title: "Limited Customer Support",
    description: "Often restricted to email or slow ticket systems.",
  },
  {
    icon: IconCashBanknoteOff,
    title: "Fragmented Costs",
    description:
      "Often focuses on procedure codes without factoring additional fees.",
  },
];

const withLapius = [
  {
    icon: IconReportMedical,
    title: "AI-Driven Bill Analysis",
    description: "Automated detection of errors and potential savings.",
  },
  {
    icon: IconBinoculars,
    title: "Symptom-Based Price Search",
    description: "Type in a symptom to find matching procedures and costs.",
  },
  {
    icon: IconMessageChatbot,
    title: "In-Platform Chat Support",
    description: "Ask billing questions & clarify codes in real time.",
  },
  {
    icon: IconChartLine,
    title: "Comprehensive Cost Estimates",
    description: "Complete breakdown for procedures  and services.",
  },
];

const DiscoverSection = () => {
  return (
    <section className="w-full bg-[#F2F8F3]" id="why-lapius">
      <div className="container mx-auto px-4 lg:px-0 2xl:px-36">
        <div className="pt-11 md:pt-[100px] pb-10 md:pb-[100px] flex flex-col">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-[50px] lg:items-stretch">
            <div className="flex-1 lg:max-w-[560px] 2xl:max-w-[590px] flex flex-col">
              <div className="w-full p-2 md:p-4 flex-1 rounded-3xl md:rounded-[32px] bg-card text-card-foreground shadow-[20px_40px_80px_0px_rgba(45,51,81,0.12)]">
                <p className="md:ml-8 text-xl md:text-2xl font-bold mx-4 my-5">
                  Without Lapius
                </p>
                <hr className="border-1"></hr>
                {withoutLapius.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 md:p-6 flex gap-6 items-center"
                  >
                    <div className="md:min-h-16 md:min-w-16 md:max-h-16 md:max-w-16 p-4 rounded-full flex items-center justify-center border border-border">
                      <item.icon className="h-5 w-5 md:h-6 md:w-6 text-current" />
                      {/* <Image
                        alt=""
                        src={item.icon}
                        height={24}
                        width={24}
                        className="h-8 w-8"
                      /> */}
                    </div>
                    <div>
                      <p className="text-lg md:text-lg 2xl:text-xl font-semibold mb-1">
                        {item.title}
                      </p>
                      <p className="text-base md:text-base 2xl:text-xl text-muted-foreground mb-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 lg:mt-0 flex flex-col">
              <div className="w-full p-2 md:p-4 flex-1  rounded-3xl md:rounded-[32px]  bg-card text-card-foreground shadow-[20px_40px_80px_0px_rgba(45,51,81,0.12)]">
                <p className="md:ml-8 text-xl md:text-2xl font-bold mx-4 my-5">
                  With Lapius
                </p>
                <hr className="border-1"></hr>
                {withLapius.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 md:p-6 flex gap-6 items-center"
                  >
                    <div className="md:min-h-16 md:min-w-16 md:max-h-16 md:max-w-16 bg-primary-dashboard p-4 rounded-full flex items-center justify-center  ">
                      <item.icon className="h-5 w-5 md:h-6 md:w-6 text-current" />
                      {/* <Image
                        alt=""
                        src={item.icon}
                        height={24}
                        width={24}
                        className="h-8 w-8"
                      /> */}
                    </div>
                    <div>
                      <p className="text-lg md:text-lg 2xl:text-xl font-semibold mb-1">
                        {item.title}
                      </p>
                      <p className="text-base md:text-base 2xl:text-xl text-muted-foreground mb-1">
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
