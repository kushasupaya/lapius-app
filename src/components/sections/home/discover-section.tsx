import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    description: "Often focuses on procedure codes without factoring additional fees.",
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
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="pt-[140px] pb-[60px] max-w-lg">
            <h2 className="text-[43px]/[54px] font-bold mb-6">AI agents for managing your medical bills</h2>
            <p className="text-xl font-bold mb-6">
              Almost 80% of medical bills contain errors. Test our AI-Assistant to analyse them, always protecting your data.
            </p>
            <p className="text-xl mb-6">
              Our tool is trained to understand and explain the meaning of each medical code. It spots the risks of upcoding and unbundling. It also allows you to verify each procedure and understand how much you could save.
            </p>
            <Button
              type="button"
              variant="default"
              size="lg"
              className="px-5 py-3 h-[60px] rounded-lg text-lg font-bold bg-primary-dashboard"
            >
              Get started for free
              <Image
                alt="arrow"
                src="/icons/arrow-right.svg"
                height={24}
                width={24}
              />
            </Button>
          </div>
          <div className="pt-7 lg:pt-[80px] lg:pb-0">
            <Image
              alt=""
              src="/images/discover.svg"
              width={623}
              height={556}
              className="h-auto w-full"
            />
          </div>
        </div>
        <div className="pt-[115px] pb-[100px] flex flex-col min-h-screen">
          <div className="flex flex-col lg:flex-row gap-[50px] lg:items-stretch">
            <div className="flex-1 lg:max-w-[467px] flex flex-col">
              <p className="text-xl font-bold mb-9">Without Lapius</p>
              <Card className="w-full flex-1 flex flex-col min-h-full">
                <CardHeader className="p-0">
                  <CardTitle></CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  {withoutLapius.map((item, index) => (
                    <div key={index} className="p-6 flex gap-6 items-center">
                      <div className="min-h-14 min-w-14 max-h-14 max-w-14 p-4 rounded-full flex items-center justify-center border border-border">
                        <Image alt="" src={item.icon} height={24} width={24} className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-base font-bold mb-1">{item.title}</p>
                        <p className="text-base text-muted-foreground mb-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="flex-1 lg:mt-0 flex flex-col">
              <p className="text-xl font-bold mb-9">With Lapius</p>
              <Card className="w-full flex-1 flex flex-col min-h-full">
                <CardHeader className="p-0">
                  <CardTitle></CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  {withLapius.map((item, index) => (
                    <div key={index} className="p-6 flex gap-6 items-center">
                      <div className="min-h-14 min-w-14 max-h-14 max-w-14 bg-primary-dashboard p-4 rounded-full flex items-center justify-center border border-border">
                        <Image alt="" src={item.icon} height={24} width={24} className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-base font-bold mb-1">{item.title}</p>
                        <p className="text-base text-muted-foreground mb-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscoverSection;
