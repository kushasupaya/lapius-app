import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FaqTabs = () => {
  const tabs = [
    {
      label: "Feature",
      value: "feature"
    },
    { label: "Pricing", value: "pricing" },
    { label: "Support", value: "support" },
    { label: "Security", value: "security" },
  ]

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="feature">Feature</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="support">Support</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="feature"></TabsContent>
      <TabsContent value="pricing"></TabsContent>
      <TabsContent value="support"></TabsContent>
      <TabsContent value="security"></TabsContent>
    </Tabs>
  )
}

export default FaqTabs;
