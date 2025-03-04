"use client";

import { useState } from "react";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Globe,
  InfoIcon,
  Loader2,
  ShieldPlus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MedicalService } from "@/types/medical-service";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MedicalPricingCardProps {
  services: MedicalService[];
  loading: boolean;
  insuranceValue: string;
}

const MedicalPricingCard = ({
  services,
  loading,
  insuranceValue,
}: MedicalPricingCardProps) => {
  const [expandedService, setExpandedService] = useState<string>(
    services[0]?.code || ""
  );
  const [showFullDescription, setShowFullDescription] = useState<
    Record<string, boolean>
  >({});

  const toggleDescription = (code: string) => {
    setShowFullDescription((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : (
        <Accordion
          type="single"
          collapsible
          value={expandedService}
          onValueChange={setExpandedService}
        >
          {services.map((service) => (
            <AccordionItem
              key={service.id}
              value={service.code}
              className="border-0"
            >
              <Card className="bg-[#E6EBEB] rounded-xl overflow-hidden mb-4">
                <AccordionTrigger className="hover:no-underline [&[data-state=open]>div]:pb-0">
                  <div className="px-4 py-2 flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-300 rounded-full p-2">
                        <Building2 className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-left">
                          {service.hospital_name}
                        </h3>
                        <p className="text-gray-500 text-sm text-left">
                          {service.address}, {service.state}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-gray-500 text-sm">up to</p>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg">
                          $
                          {Number.parseFloat(service.cash_rate).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <CardContent className="pt-0 ">
                    <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded-xl">
                      {/* Left Column - Service Details */}
                      <div className="space-y-4">
                        <Badge className="bg-black text-white hover:bg-gray-800 hover:text-white">
                          {service.code}
                        </Badge>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {service.description}
                          </h4>
                          <p className="text-gray-600 mt-2">
                            {showFullDescription[service.code]
                              ? service.additional_notes
                              : `${service.additional_notes.slice(0, 150)}...`}
                          </p>
                          {service.additional_notes.length > 150 && (
                            <button
                              className="mt-2 text-gray-900 underline font-medium"
                              onClick={() => toggleDescription(service.code)}
                            >
                              {showFullDescription[service.code]
                                ? "View less"
                                : "View more"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right Column - Price and Options */}
                      <div className="space-y-3">
                        <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#E8ECEC] rounded-full p-2">
                              <CircleDollarSign className="h-6 w-6 text-[#1C4C4C]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 flex items-center gap-1">
                                Cash Price{" "}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <InfoIcon className="h-3 w-3  text-gray-500 hover:text-gray-600" />
                                    </TooltipTrigger>
                                    <TooltipContent className="p-2 bg-white shadow-lg rounded-lg text-black max-w-60">
                                      <p>
                                        a reduced rate offered to patients who
                                        pay out-of-pocket with cash rather than
                                        going through an insurance billing
                                        process. This rate is typically lower
                                        than the gross (or list) charge, which
                                        is the unadjusted, sticker price for a
                                        service.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </h4>
                              <p className="text-gray-500">Cash</p>
                            </div>
                          </div>
                          <p className="font-bold text-base">
                            $
                            {Number.parseFloat(
                              service.cash_rate
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>

                        <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#E8ECEC] rounded-full p-2">
                              <ShieldPlus className="h-6 w-6 text-[#1C4C4C]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                I am not using insurance
                              </h4>
                              <p className="text-gray-500">
                                List price: $
                                {Number.parseFloat(
                                  service.list_price
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </p>
                            </div>
                          </div>
                          <ChevronDown className="h-5 w-5 text-gray-700" />
                        </div>

                        <div className="bg-white  border rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#E8ECEC] rounded-full p-2">
                              <Globe className="h-6 w-6 text-[#1C4C4C]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Explore more
                              </h4>
                              <p className="text-gray-500">
                                Setting: {service.setting}
                              </p>
                            </div>
                          </div>
                          <ChevronDown className="h-5 w-5 text-gray-700 -rotate-90" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default MedicalPricingCard;
