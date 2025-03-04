"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { distanceList, insuranceList } from "@/lib/utils";
import {
  MedicalService,
  PriceToolForm,
  PriceToolType,
} from "@/types/medical-service";
import { fetchPriceDetails, fetchProcedureCode } from "@/api/apiClient";
import { useEffect, useState } from "react";
import { Badge, Filter, FilterIcon, Heart, MapPin, Search } from "lucide-react";
import { PriceSlider } from ".";

const formSchema = z.object({
  procedureCode: z.string().min(2, {
    message: "Please enter your CPT/HCPCS/MSDRG code",
  }),
  zipCode: z.string().min(2, {
    message: "Please enter a valid zipcode",
  }),
  insurance: z
    .string({
      required_error: "Please select an insurance option",
    })
    .optional(),
  distance: z.string().min(2, {
    message: "Please select a distance",
  }),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

interface SearchCardProps {
  setTableData: (data: MedicalService[]) => void;
  setIsLoading: (loading: boolean) => void;
  setInsuranceValue: (insurance: string) => void;
}

const SearchHeader = ({
  setTableData,
  setIsLoading,
  setInsuranceValue,
}: SearchCardProps) => {
  const [suggestions, setSuggestions] = useState<
    { label: string; value: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const storedValues =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("medFormData") || "{}")
      : {};
  const form = useForm<PriceToolForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      procedureCode: storedValues.procedure || "",
      type: PriceToolType.PROCEDURE,
      zipCode: storedValues.zipCode || "",
      insurance: storedValues.insurance || "",
      distance: "25_miles",
      minPrice: Number(storedValues.minPrice) || 0,
      maxPrice: Number(storedValues.maxPrice) || 1000,
    },
  });
  const handlePriceChange = (range: [number, number]) => {
    form.setValue("minPrice", range[0]);
    form.setValue("maxPrice", range[1]);
  };

  const procedureCode = form.watch("procedureCode");
  useEffect(() => {
    if (procedureCode.length >= 3) {
      fetchProcedureCode(procedureCode).then((data) => {
        setSuggestions(data);
        setShowSuggestions(true);
      });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [procedureCode]);
  const [selectedLabel, setSelectedLabel] = useState("");

  const handleSelect = (selectedValue: string, selectedLabel: string) => {
    form.setValue("procedureCode", selectedValue, { shouldValidate: true });
    setSelectedLabel(selectedLabel);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const onSubmit = (data: PriceToolForm) => {
    console.log(data);
    localStorage.removeItem("medFormData");
    setIsLoading(true);
    setInsuranceValue(data.insurance);
    fetchPriceDetails(data)
      .then((result) => {
        const data: MedicalService[] = result.data?.data;
        setTableData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(storedValues);
    if (storedValues.procedure && storedValues.zipCode) {
      setIsLoading(true);
      setSelectedLabel(storedValues.labelValue);
      setShowSuggestions(false);
      form.handleSubmit(onSubmit)();
    }
  }, [form, storedValues]);
  return (
    <div className="relative bg-[#E6EBEB] p-6 rounded-lg w-full mx-auto px-24 mb-12">
      <div className="absolute right-24 bg-card-pattern bg-contain bg-no-repeat w-[570px] h-[200px]"></div>
      <div className="relative z-10 mb-4 max-w-4xl mx-auto mt-2">
        <span className="px-3 py-1 text-sm font-medium border border-gray-600 text-black rounded-full">
          Price Tool
        </span>
        <h2 className="text-2xl font-semibold mt-2 max-w-xl">
          Search Tool: Explore Pricing Data from Any California Hospital
        </h2>
      </div>

      {/* Search Bar */}
      <div className="flex items-center z-10 max-w-4xl mx-auto relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-flow-row gap-y-2">
              <div className="flex items-center justify-between flex-row gap-y-2 bg-white shadow-sm  border-gray-200 border rounded-lg py-2 px-2">
                <FormField
                  control={form.control}
                  name="procedureCode"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel className="sr-only">Medical Code</FormLabel> */}
                      <FormControl>
                        <div className="relative flex-1 min-w-[350px] md:border-r">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input
                            placeholder="Enter your CPT/HCPCS/MSDRG code"
                            value={selectedLabel ?? ""}
                            className="pl-10 shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) => {
                              setSelectedLabel(e.target.value);
                              setShowSuggestions(true);
                              field.onChange(e);
                            }}
                          />
                          {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute left-8  mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                              {suggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="p-2 cursor-pointer hover:bg-gray-200"
                                  onClick={() =>
                                    handleSelect(
                                      suggestion.value,
                                      suggestion.label
                                    )
                                  }
                                >
                                  {suggestion.label}
                                </div>
                              ))}
                            </div>
                          )}
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel className="sr-only">Zip Code</FormLabel> */}
                      <FormControl>
                        <div className="relative flex-1  md:border-r border-gray-200 ">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input
                            placeholder="Zip Code or City"
                            className="pl-10 shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="insurance"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel className="sr-only">Insurance</FormLabel> */}
                      <div className="relative   border-gray-200 ">
                        <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="pl-10 gap-x-4 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Not using insurance" />
                          </SelectTrigger>
                          <SelectContent className="">
                            {insuranceList.map((insurance) => (
                              <SelectItem key={insurance} value={insurance}>
                                {insurance}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="ml-2 bg-primary text-white px-10 hover:bg-[#0B3B3C]/90 md:self-end"
                >
                  Search
                </Button>
              </div>
              <div className="flex gap-x-2">
                {/* <span className="border max-w-7  text-xs rounded-full  flex">
                  <FilterIcon /> Filter
                </span> */}
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem className="max-w-36 bg-primary rounded-full text-white border-none font-semibold">
                      <Select
                        value={field.value || "25_miles"}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="text-xs py-0 flex rounded-full text-white border-none">
                          <SelectValue placeholder={"Within 25 Miles"} />
                        </SelectTrigger>
                        <SelectContent className="text-xs flex rounded-lg">
                          {Object.entries(distanceList).map(([key, value]) => (
                            <SelectItem
                              key={key}
                              value={key}
                              className="text-xs"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PriceSlider
                  minPrice={form.watch("minPrice")}
                  maxPrice={form.watch("maxPrice")}
                  onPriceChange={handlePriceChange}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SearchHeader;
