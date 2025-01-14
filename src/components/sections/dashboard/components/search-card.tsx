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

const tabs = [
  {
    id: "procedure",
    label: "Procedure",
    content: (
      <div className="space-y-4 mt-4 p-4">
        <Input
          className="py-5"
          id="procedure"
          placeholder="Enter procedure or CPT/HCPCS/MSDRG code"
        />
        <Input
          id="city"
          className="py-5"
          placeholder="Enter Zip Code or City"
        />
      </div>
    ),
  },
  {
    id: "medical-issue",
    label: "Medical Issue",
    content: (
      <div className="space-y-4 mt-4 p-4">
        <div className="space-y-1">
          <Input
            className="py-5"
            id="procedure"
            placeholder="Enter the medical issue, diagnosis or ICD code"
          />
        </div>
        <div className="space-y-1">
          <Input
            id="city"
            className="py-5"
            placeholder="Enter Zip Code or City"
          />
        </div>
      </div>
    ),
  },
];

const SearchCard = () => {
  return (
    <Card className="w-[400px] space-y-2">
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
        <Tabs defaultValue="procedure" className="rounded-b-none">
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
      </CardContent>
      <CardFooter>
        <Button className="inline-flex mx-auto w-full  text-white  hover:bg-foreground">
          Search
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SearchCard;
