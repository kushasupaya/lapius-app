import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FAQAccordion from "./faq-accordion";

const FaqTabs = () => {
  const tabs = [
    {
      label: "Feature",
      value: "feature",
      content: <FAQAccordion />
    },
  ]

  return (
    <Tabs defaultValue="feature" className="w-full flex flex-col lg:items-end">
      {
        tabs.length > 1 &&
        <TabsList className="h-16 w-fit bg-white p-2 border border-border rounded-[30px] gap-2.5 mb-6">
          {
            tabs.map((tab, index) => (
              <TabsTrigger key={index} value={tab.value} className="data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:font-medium text-foreground h-12 py-2.5 px-6 rounded-[35px]">
                {tab.label}
              </TabsTrigger>
            ))
          }
        </TabsList>
      }
      {
        tabs.map((tab, index) => (
          <TabsContent key={index} value={tab.value} className="w-full">
            {tab.content}
          </TabsContent>
        ))
      }
    </Tabs>
  )
}

export default FaqTabs;
