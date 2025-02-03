"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SummaryProps {
  summary?: string;
}
const BillSummary = ({ summary }: SummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book. It has survived not only five centuries, but also the leap into 
    electronic typesetting, remaining essentially unchanged. It was popularised in 
    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
    and more recently with desktop publishing software like Aldus PageMaker including 
    versions of Lorem Ipsum. It is a long established fact that a reader will be 
    distracted by the readable content of a page when looking at its layout. 
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution 
    of letters, as opposed to using 'Content here, content here', making it look 
    like readable English.`;

  const truncatedText = fullText.slice(0, 300) + "...";

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-2">Summary</h2>
      <div
        className={cn(
          "relative transition-all duration-500 ease-in-out",
          !isExpanded ? "max-h-[120px]" : "max-h-[1000px]",
          "overflow-hidden"
        )}
      >
        <p className="text-gray-700 ">
          {isExpanded ? fullText : truncatedText}
        </p>
        {!isExpanded && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent",
              "transition-opacity duration-500 ease-in-out",
              isExpanded ? "opacity-0" : "opacity-100"
            )}
          />
        )}
      </div>
      <Button
        variant="link"
        className={cn(
          "p-0 h-auto font-semibold underline mt-2",
          "transition-all duration-300 ease-in-out",
          "hover:text-primary/80"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "View Less" : "View More"}
      </Button>
    </Card>
  );
};

export default BillSummary;
