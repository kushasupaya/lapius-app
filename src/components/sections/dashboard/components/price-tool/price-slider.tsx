"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceRangeSliderProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  onPriceChange: (range: [number, number]) => void;
}

export default function PriceRangeSlider({
  minPrice,
  maxPrice,
  onPriceChange,
}: PriceRangeSliderProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice || 0,
    maxPrice || 1000,
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (minPrice && maxPrice) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  const handleSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    onPriceChange([value[0], value[1]]); // Pass values to parent
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
      onPriceChange([value, priceRange[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= priceRange[0]) {
      setPriceRange([priceRange[0], value]);
      onPriceChange([priceRange[0], value]);
    }
  };

  const togglePriceFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" max-w-60 relative w-[550px]" ref={containerRef}>
      <Button
        onClick={togglePriceFilter}
        variant="outline"
        type="button"
        className="text-white bg-primary py-2 rounded-full border-2 flex items-center justify-between"
        aria-expanded={isOpen}
        aria-controls="price-dropdown"
      >
        <span className="text-xs">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      <div
        id="price-dropdown"
        className={cn(
          "absolute left-0 right-0 mt-2 z-50  transition-all duration-200 ease-in-out",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Price Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Slider
                defaultValue={[0, 1500]}
                min={0}
                max={99999}
                step={1}
                value={priceRange}
                onValueChange={handleSliderChange}
                className="mb-7"
              />
              {/* Custom styling for the slider handles to make them more prominent */}
              <style jsx global>{`
                [data-orientation="horizontal"] .slider-thumb {
                  height: 20px;
                  width: 20px;
                  background-color: white;
                  border: 2px solid hsl(var(--primary));
                  border-radius: 10px;
                  display: block;
                }

                [data-orientation="horizontal"] [data-radix-slider-thumb] {
                  height: 20px;
                  width: 20px;
                }
              `}</style>
            </div>

            <div className="flex items-center justify-end gap-x-3 gap-y-4 text-xs">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="min-price" className="text-xs block">
                  Min Price
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs block">
                    $
                  </span>
                  <Input
                    id="min-price"
                    type="number"
                    min={0}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={handleMinInputChange}
                    className="pl-4 text-xs block"
                  />
                </div>
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="max-price" className="text-xs block">
                  Max Price
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs block">
                    $
                  </span>
                  <Input
                    id="max-price"
                    type="number"
                    min={priceRange[0]}
                    value={priceRange[1]}
                    onChange={handleMaxInputChange}
                    className="pl-4 text-xs block"
                  />
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-muted-foreground mt-2">
              Selected price range: ${priceRange[0]} - ${priceRange[1]}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
