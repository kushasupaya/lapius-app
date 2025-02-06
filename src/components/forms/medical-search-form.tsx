"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { IconHeartBolt, IconMapPin } from "@tabler/icons-react";

const formSchema = z.object({
  procedure: z.string().min(2, {
    message: "Please enter a procedure name",
  }),
  zipCode: z.string().regex(/^\d{5}$/, {
    message: "Please enter a valid 5-digit zip code",
  }),
  insurance: z.string().min(1, {
    message: "Please select an insurance",
  }),
});

const MedicalSearchForm = () => {
  const procedures = [
    "Colonoscopy",
    "Knee Repair - Arthroscopic",
    "MRI with Contrast",
    "Tonsil and/or Adenoid Removal",
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      procedure: "",
      zipCode: "",
      insurance: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission here
  }

  const handleSuggestionClick = (procedure: string) => {
    form.setValue("procedure", procedure);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-wrap sm:flex-nowrap w-full">
            <FormField
              control={form.control}
              name="procedure"
              render={({ field }) => (
                <FormItem className="relative flex-1 min-w-full sm:min-w-[250px]">
                  <FormControl>
                    <div className="relative text-base">
                      <Search
                        size="24"
                        className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6"
                      />
                      <Input
                        placeholder="Enter a procedure"
                        className="pl-14 bg-white pr-4 h-14 text-base 2xl:text-lg md:text-base  sm:rounded-l-full sm:rounded-r-none"
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
              name="zipCode"
              render={({ field }) => (
                <FormItem className="relative w-full sm:w-40 text-base">
                  <FormControl>
                    <div className="relative">
                      <IconMapPin
                        size="24"
                        className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6"
                      />
                      <Input
                        placeholder="Zip Code"
                        className="pl-14 bg-white pr-4 h-14 text-base 2xl:text-lg md:text-base sm:rounded-l-none sm:rounded-r-none"
                        maxLength={5}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative flex-1 min-w-full sm:min-w-[250px]">
              <FormField
                control={form.control}
                name="insurance"
                render={({ field }) => (
                  <FormItem className="relative text-base">
                    <FormControl>
                      <div className="relative">
                        <IconHeartBolt
                          size="24"
                          className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6"
                        />
                        <Input
                          placeholder="I am not using insurance"
                          className="pl-14 bg-white pr-4 h-14 text-base 2xl:text-lg md:text-base rounded-l-none sm:rounded-l-none sm:rounded-r-full"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="submit"
                  className="h-10 w-10 p-2 rounded-full text-2xl bg-primary-dashboard"
                >
                  <Search size="24" className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <div className="flex flex-wrap justify-center gap-2 ">
        {procedures.map((procedure) => (
          <Badge
            key={procedure}
            variant="default"
            className="px-4 py-2 text-sm bg-white font-normal rounded-3xl shadow-none border border-border cursor-pointer hover:bg-gray-100"
            onClick={() => handleSuggestionClick(procedure)}
          >
            <Search size={14} className="h-4 w-4 mr-1.5" />
            {procedure}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MedicalSearchForm;
