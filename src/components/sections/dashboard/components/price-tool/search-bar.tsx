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
import { fetchPriceDetails } from "@/api/apiClient";

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
}

const MedicalSearchBar = ({ setTableData }: SearchCardProps) => {
  const form = useForm<PriceToolForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      procedureCode: "",
      type: PriceToolType.PROCEDURE,
      zipCode: "",
      insurance: "",
      distance: "25_miles",
    },
  });

  const onSubmit = (data: PriceToolForm) => {
    fetchPriceDetails(data)
      .then((result) => {
        const data: MedicalService[] = result.data?.data;

        setTableData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                    <Input
                      placeholder="Enter your CPT/HCPCS/MSDRG code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
