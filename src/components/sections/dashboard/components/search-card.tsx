"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { IconWallet } from "@tabler/icons-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  MedicalService,
  PriceToolForm,
  PriceToolType,
} from "@/types/medical-service";
import { fetchPriceDetails } from "@/api/apiClient";
const tabs = [
  {
    id: "procedure",
    label: "Procedure",
    content: (
      <div className="space-y-4 mt-4 p-4">
        <FormField
          name="procedureCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-5"
                  placeholder="Enter procedure or CPT/HCPCS/MSDRG code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="hidden"
                  {...field}
                  value={PriceToolType.PROCEDURE}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-5"
                  placeholder="Enter Zip Code or City"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    ),
  },
  {
    id: "medical-issue",
    label: "Medical Issue",
    content: (
      <div className="space-y-4 mt-4 p-4">
        <FormField
          name="procedureCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-5"
                  placeholder="Enter the medical issue, diagnosis or ICD code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="hidden"
                  {...field}
                  value={PriceToolType.MEDICAL_ISSUE}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-5"
                  placeholder="Enter Zip Code or City"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    ),
  },
];

interface SearchCardProps {
  setTableData: (data: MedicalService[]) => void;
}
const SearchCard = ({ setTableData }: SearchCardProps) => {
  const [activeTab, setActiveTab] = useState("procedure");

  const form = useForm<PriceToolForm>({
    defaultValues: {
      procedureCode: "",
      type: PriceToolType.PROCEDURE,
      zipCode: "",
    },
  });
  const onSubmit = (data: PriceToolForm) => {
    fetchPriceDetails(data)
      .then((result) => {
        const data: MedicalService[] = result.data?.data;
        console.log("heere");
        console.log(result);
        setTableData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className="w-[400px] space-y-2 rounded-t-lg">
      <CardHeader className="bg-gray-200 rounded-t-lg p-4">
        <CardTitle>
          <div className="flex items-center gap-1">
            <IconWallet /> Price Tool
          </div>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your medical procedure or an issue.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              defaultValue="procedure"
              value={activeTab}
              onValueChange={setActiveTab}
              className="rounded-b-none"
            >
              <TabsList className="bg-white p-0 m-0 h-12 border-b w-full flex justify-between rounded-b-none">
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "py-6 px-auto sm:px-4.5 h-[50px] text-base w-full text-subtitle-dashboard text-opacity-80 font-medium rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-secondary data-[state=active]:text-secondary",
                      index === 0 && "rounded-tl-[32px] rounded-bl-none pl-6",
                      index === tabs.length - 1 &&
                        "rounded-tr-[32px] rounded-br-none pr-6"
                    )}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab) => (
                <TabsContent value={tab.id} key={tab.id}>
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
            <CardFooter>
              <Button
                type="submit"
                className="inline-flex mx-auto w-full  text-white  hover:bg-foreground"
              >
                Search
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
