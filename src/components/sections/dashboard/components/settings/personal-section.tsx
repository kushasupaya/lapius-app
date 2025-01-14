"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PersonalSection = () => {
  const [isHousehold, setIsHousehold] = useState(false);

  return (
    <div className="pt-6 px-4 space-y-4">
      <h1 className=" font-semibold mt-4">
        Enter your details to make the analysis faster and more accurate
      </h1>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="First Name"
          className="w-full py-6 rounded-xl"
        />
        <Input
          type="text"
          placeholder="Last Name"
          className="w-full py-6 rounded-xl"
        />
        <Input
          type="text"
          placeholder="Address"
          className="w-full py-6 rounded-xl"
        />
        <Input
          type="email"
          placeholder="Email"
          className="w-full py-6 rounded-xl"
        />
        <div className="flex items-center justify-between h-14 px-4 border rounded-md gap-2">
          <div className="flex-1">
            <Select>
              <SelectTrigger className="w-full border border-gray p-2 h-auto focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select your income" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-25k">$0 - $25,000</SelectItem>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                <SelectItem value="100k+">$100,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="household" className="text-sm">
              Household income
            </Label>
            <Switch
              id="household"
              checked={isHousehold}
              onCheckedChange={setIsHousehold}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSection;
