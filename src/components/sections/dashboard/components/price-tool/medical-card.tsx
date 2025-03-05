"use client";

import { useMemo, useState } from "react";
import zipcodes from "zipcodes";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MedicalPricingCardProps {
  services: MedicalService[];
  loading: boolean;
  insuranceValue: string;
  userZipCode: string;
}

const MedicalPricingCard = ({
  services,
  loading,
  insuranceValue,
  userZipCode,
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
  const [sortOption, setSortOption] = useState<"price" | "distance">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Get user location from zip code
  const sortedServices = useMemo(() => {
    let valueA;
    let valueB;
    if (!services || services.length === 0) return [];
    return [...services].sort((a, b) => {
      if (sortOption === "price") {
        console.log("a", a.cash_rate, "b", b.cash_rate);
        if (insuranceValue === "Not using insurance") {
          valueA =
            a.cash_rate !== "Not Provided" && !isNaN(parseFloat(a.cash_rate))
              ? Number(parseFloat(a.cash_rate))
              : Number.MAX_VALUE; // Move "Not Provided" to the end

          valueB =
            b.cash_rate !== "Not Provided" && !isNaN(parseFloat(b.cash_rate))
              ? Number(parseFloat(b.cash_rate))
              : Number.MAX_VALUE; // Move "Not Provided" to the end
        } else {
          valueA =
            a.standard_charge_dollar !== "Not Provided" &&
            !isNaN(parseFloat(a.standard_charge_dollar))
              ? Number(parseFloat(a.standard_charge_dollar))
              : Number.MAX_VALUE; // Move "Not Provided" to the end

          valueB =
            b.standard_charge_dollar !== "Not Provided" &&
            !isNaN(parseFloat(b.standard_charge_dollar))
              ? Number(parseFloat(b.standard_charge_dollar))
              : Number.MAX_VALUE;
        }
        // console.log("valueA", valueA, "valueB", valueB);
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (sortOption === "distance") {
        const distanceA =
          zipcodes.distance(userZipCode, a.zip_code) || Number.MAX_VALUE;
        const distanceB =
          zipcodes.distance(userZipCode, b.zip_code) || Number.MAX_VALUE;

        return sortOrder === "asc"
          ? distanceA - distanceB
          : distanceB - distanceA;
      }

      return 0;
    });
  }, [services, sortOption, sortOrder, userZipCode]);

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Select
          value={sortOption}
          onValueChange={(value) =>
            setSortOption(value as "price" | "distance")
          }
        >
          <SelectTrigger className="w-40 sm:w-56 border rounded-md bg-white shadow-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Sort by Price</SelectItem>
            <SelectItem value="distance">Sort by Distance</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
        >
          <SelectTrigger className="w-40 sm:w-56 border rounded-md bg-white shadow-sm">
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Lowest to Highest</SelectItem>
            <SelectItem value="desc">Highest to Lowest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : (
        <Accordion
          type="single"
          collapsible
          value={expandedService || undefined}
          onValueChange={(val) =>
            setExpandedService(val === expandedService ? "" : val)
          }
        >
          {sortedServices.map((service) => (
            <AccordionItem
              key={service.id}
              value={service.id}
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
                        <h3 className="font-medium text-gray-900 text-left text-sm sm:text-base">
                          {service.hospital_name}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm text-left max-w-40 sm:max-w-md">
                          {service.address}, {service.state}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-gray-500 text-xs sm:text-sm">up to</p>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm sm:text-lg">
                          {insuranceValue === "Not using insurance"
                            ? service.cash_rate !== "Not Provided"
                              ? `$${Number(service.cash_rate).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}`
                              : "Not Provided"
                            : service.standard_charge_dollar !== "Not Provided"
                            ? `$${Number(
                                service.standard_charge_dollar
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`
                            : "Not Provided"}
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
                          <h4 className="text-base sm:text-lg font-medium text-gray-900">
                            {service.description}
                          </h4>
                          <p className="text-gray-600 mt-2 ">
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
                              <h4 className="font-medium text-gray-900 flex items-center max-w-40 gap-1">
                                {insuranceValue !== "Not using insurance"
                                  ? "Standard Charge Dollar"
                                  : "Cash Price"}
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
                              {/* <p className="text-gray-500">
                                a reduced rate offered to patients who pay
                                out-of-pocket with cash rather than going
                                through an insurance billing process. This rate
                                is typically lower than the gross (or list)
                                charge, which is the unadjusted, sticker price
                                for a service.
                              </p> */}
                            </div>
                          </div>
                          <p className="font-bold text-base">
                            {insuranceValue === "Not using insurance"
                              ? service.cash_rate !== "Not Provided"
                                ? `$${Number(service.cash_rate).toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}`
                                : "Not Provided"
                              : service.standard_charge_dollar !==
                                "Not Provided"
                              ? `$${Number(
                                  service.standard_charge_dollar
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}`
                              : "Not Provided"}
                          </p>
                        </div>
                        {(!insuranceValue ||
                          insuranceValue !== "Not using insurance") && (
                          <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-[#E8ECEC] rounded-full p-2">
                                <ShieldPlus className="h-6 w-6 text-[#1C4C4C]" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  Payer: {service.payer}
                                </h4>
                                <p className="text-gray-500">
                                  Plan Name: {service.plan_name}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="bg-white  border rounded-lg items-center justify-between">
                          <Accordion type="single" collapsible>
                            <AccordionItem
                              value={`${service.id}-explore`}
                              className="border-0"
                            >
                              <AccordionTrigger className="[&[data-state=open]>div]:pb-0 p-4">
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
                              </AccordionTrigger>
                              <AccordionContent className="px-4">
                                <div className="bg-gray-100 border rounded-lg p-4">
                                  <div className="flex flex-col space-y-2">
                                    {insuranceValue ===
                                    "Not using insurance" ? (
                                      <>
                                        <p className="text-gray-600">
                                          <strong>List Price:</strong>
                                          {service.list_price === "Not Provided"
                                            ? "Not Provided"
                                            : `$${Number.parseFloat(
                                                service.list_price
                                              ).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                              })}`}
                                        </p>
                                        <p className="text-gray-600">
                                          <strong>Maximum Price:</strong> $
                                          {Number.parseFloat(
                                            service.maximum
                                          ).toLocaleString()}
                                        </p>
                                        <p className="text-gray-600">
                                          <strong>Minimum Price:</strong> $
                                          {Number.parseFloat(
                                            service.minimum
                                          ).toLocaleString()}
                                        </p>
                                        <p className="text-gray-600">
                                          <strong>Setting:</strong>{" "}
                                          {service.setting}
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-gray-600">
                                          <strong>
                                            Standard charge dollar:
                                          </strong>{" "}
                                          $
                                          {Number.parseFloat(
                                            service.standard_charge_dollar
                                          ).toLocaleString()}
                                        </p>
                                        <p className="text-gray-600">
                                          <strong>
                                            Standard charge percentage:
                                          </strong>
                                          {service.standard_charge_percentage}
                                        </p>
                                        <p className="text-gray-600">
                                          <strong>
                                            Standard charge algorithm:
                                          </strong>{" "}
                                          {service.standard_charge_algorithm}
                                        </p>
                                        <p className="text-gray-600">
                                          <strong>Setting: </strong>
                                          {service.setting}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
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
