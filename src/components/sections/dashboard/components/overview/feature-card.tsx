import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconCash, IconCurrency } from "@tabler/icons-react";
import { Zap } from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  icon?: React.ReactNode;
}
const FeatureCard = ({ title, description, link, icon }: FeatureCardProps) => {
  return (
    <Card className="w-full max-w-2xl p-6 hover:shadow-xl  hover:cursor-pointer">
      <CardContent className="flex items-start gap-6 p-0">
        <div className="flex w-16 p-4 items-center justify-center rounded-full bg-gray-100">
          {icon}
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {title === "Bill Analyzer" || title === "AI Cost Estimator" ? (
            <Button
              className="w-fit bg-white border-primary-dashboard border  mt-1 text-black rounded-full hover:bg-gray-100"
              size="lg"
            >
              Coming Soon
            </Button>
          ) : (
            <Link href={link}>
              <Button
                className="w-fit bg-primary hover:bg-[#0B3B2D]/60 mt-1 text-white rounded-full"
                size="lg"
              >
                <Zap className="mr-2 h-5 w-5 text-primary-dashboard" />
                {title === "AI Cost Estimator" ? "Estimate Now" : "Search Now"}
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
