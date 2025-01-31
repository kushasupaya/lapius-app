"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function InsuranceForm() {
  const [outOfPocket, setOutOfPocket] = useState<string>("");
  const [amount, setAmount] = useState<string>("0.00");
  const [deductible, setDeductible] = useState<string>("");

  return (
    <div className="pt-6 px-4 space-y-4">
      <h1 className=" font-semibold mt-4">
        Enter your insurance details to make the analysis faster and more
        accurate
      </h1>

      <div className="space-y-6">
        <div>
          <Select>
            <SelectTrigger className="w-full py-6 rounded-xl">
              <SelectValue placeholder="Select the plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic Plan</SelectItem>
              <SelectItem value="standard">Standard Plan</SelectItem>
              <SelectItem value="premium">Premium Plan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-base font-normal">
              Have you met your out-of-pocket-maximum?
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Information about out-of-pocket maximum</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup
            value={outOfPocket}
            onValueChange={setOutOfPocket}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2 border p-2 rounded-xl w-[120px]">
              <RadioGroupItem value="yes" id="pocket-yes" className="h-4 w-4" />
              <Label htmlFor="pocket-yes" className="text-base">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-2 rounded-xl w-[120px]">
              <RadioGroupItem value="no" id="pocket-no" className="h-4 w-4" />
              <Label htmlFor="pocket-no" className="text-base">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base">How much do you have left?</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-7  py-6 rounded-xl"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-base font-normal">
              Have you met your deductible?
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Information about deductible</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup
            value={deductible}
            onValueChange={setDeductible}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2 border p-2 rounded-xl w-[120px]">
              <RadioGroupItem
                value="yes"
                id="deductible-yes"
                className="h-4 w-4 "
              />
              <Label htmlFor="deductible-yes" className="text-base ">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-2 rounded-xl w-[120px]">
              <RadioGroupItem
                value="no"
                id="deductible-no"
                className="h-4 w-4"
              />
              <Label htmlFor="deductible-no" className="text-base">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
