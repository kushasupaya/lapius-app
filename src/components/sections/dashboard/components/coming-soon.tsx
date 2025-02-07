import { Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto p-6">
      {/* Icon */}
      <div className="relative">
        <Image
          width={200}
          height={200}
          src={"/images/comingsoon.png"}
          alt="Healthcare"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Text Content */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Coming Soon!</h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          We&apos;re working hard to bring this page to life. Stay tuned for
          updates!
        </p>
      </div>
    </div>
  );
}
