"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { IconHeartBolt, IconMapPin } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { insuranceList } from "@/lib/utils";
import { useEffect, useState } from "react";
import LoginDialog from "./login-dialog-form";
import { fetchProcedureCode } from "@/api/apiClient";
import { useAuthRedirect } from "@/utils/authRedirect";

const formSchema = z.object({
  procedure: z.string().min(2, {
    message: "Please enter a procedure name",
  }),
  zipCode: z.string().regex(/^\d{5}$/, {
    message: "Please enter a valid 5-digit zip code",
  }),
  insurance: z.string(),
});

const procedureCodes: Record<string, string> = {
  Colonoscopy: "44388",
  "Knee arthroscopy": "S2112",
  "MRI CT scan": "3324F",
  "Remove Tonsils and Adenoids": "42820",
};
const MedicalSearchForm = () => {
  const procedures = Object.keys(procedureCodes);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      procedure: "",
      zipCode: "",
      insurance: "",
    },
  });

  const procedureCode = form.watch("procedure");
  const [suggestions, setSuggestions] = useState<
    { label: string; value: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isAuthenticated = useAuthRedirect(true);

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("medFormData", JSON.stringify(values));

    if (!isAuthenticated) {
      console.log("User is not authenticated");
      setIsDialogOpen(true);
    } else {
      console.log("User authenticated");
      router.push("/dashboard/price-tool");
    }
  }

  const handleSelect = (selectedValue: string, selectedLabel: string) => {
    form.setValue("procedure", selectedValue);
    setSelectedLabel(selectedLabel);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (procedure: string) => {
    form.setValue("procedure", procedure);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-3">
      <div className="hidden">
        {!isAuthenticated ? (
          <LoginDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSignUpChange={() => true}
          />
        ) : (
          <LoginDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSignUpChange={() => false}
          />
        )}
      </div>

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
                        value={selectedLabel}
                        onChange={(e) => {
                          setSelectedLabel(e.target.value);
                          field.onChange(e);
                          setShowSuggestions(true);
                        }}
                      />
                    </div>
                  </FormControl>
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-8  mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
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
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="pl-14 bg-white pr-4 h-14 text-base 2xl:text-lg md:text-base rounded-l-none sm:rounded-l-none sm:rounded-r-full">
                            <SelectValue placeholder="Not using insurance" />
                          </SelectTrigger>
                          <SelectContent>
                            {insuranceList.map((insurance) => (
                              <SelectItem key={insurance} value={insurance}>
                                {insurance}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <Input
                          placeholder="I am not using insurance"
                          className="pl-14 bg-white pr-4 h-14 text-base 2xl:text-lg md:text-base rounded-l-none sm:rounded-l-none sm:rounded-r-full"
                          {...field}
                        /> */}
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
