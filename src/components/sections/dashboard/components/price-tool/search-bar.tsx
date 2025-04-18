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
  FormLabel,
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
});

interface SearchCardProps {
  setTableData: (data: MedicalService[]) => void;
  setIsLoading: (loading: boolean) => void;
  setInsuranceValue: (insurance: string) => void;
}

const MedicalSearchBar = ({
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
    },
  });
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
    <div className="w-full p-2 bg-white rounded-lg ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-y-2 gap-x-4 md:gap-x-3">
            <FormField
              control={form.control}
              name="procedureCode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  {/* <FormLabel className="sr-only">Medical Code</FormLabel> */}
                  <FormControl>
                    <div>
                      <Input
                        placeholder="Enter your CPT/HCPCS/MSDRG code"
                        value={selectedLabel ?? ""}
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
                                handleSelect(suggestion.value, suggestion.label)
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
                <FormItem className="xl:w-[180px]">
                  {/* <FormLabel className="sr-only">Zip Code</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Zip Code or City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="insurance"
              render={({ field }) => (
                <FormItem className="xl:w-[180px]">
                  {/* <FormLabel className="sr-only">Insurance</FormLabel> */}
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="py-2">
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem className="xl:w-[180px]">
                  {/* <FormLabel className="sr-only">Insurance</FormLabel> */}
                  <Select
                    value={field.value || "25_miles"}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="py-2">
                      <SelectValue placeholder={"Within 25 Miles"} />
                    </SelectTrigger>
                    <SelectContent className="">
                      {Object.entries(distanceList).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-primary text-white px-10 hover:bg-[#0B3B3C]/90 md:self-end"
            >
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MedicalSearchBar;
