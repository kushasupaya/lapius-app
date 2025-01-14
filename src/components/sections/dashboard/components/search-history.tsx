"use client";

import { History } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchHistoryEntry {
  id: string;
  title: string;
  location: string;
  type: "Medical Issue" | "Procedure";
  timestamp?: string;
}

const searchHistory: SearchHistoryEntry[] = [
  {
    id: "1",
    title: "Chest Pain",
    location: "AdventHealth Dade City - AdventHealth Dade City.1",
    type: "Procedure",
    timestamp: "Nov 8, 9:00 AM",
  },
  {
    id: "2",
    title: "Chest Pain",
    location: "AdventHealth Dade City - AdventHealth Dade City.1",
    type: "Medical Issue",
  },
  {
    id: "3",
    title: "Chest Pain",
    location: "AdventHealth Dade City - AdventHealth Dade City.1",
    type: "Medical Issue",
  },
  {
    id: "4",
    title: "Chest Pain",
    location: "AdventHealth Dade City - AdventHealth Dade City.1",
    type: "Medical Issue",
  },
];

export default function SearchHistory() {
  return (
    <Card className="w-[400px]">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <h2 className="font-semibold">Search History</h2>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {searchHistory.map((entry) => (
          <Card key={entry.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{entry.title}</h3>
                    {entry.timestamp && (
                      <span className="text-sm text-muted-foreground">
                        {entry.timestamp}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {entry.location}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="shrink-0 text-muted-foreground rounded-full"
                >
                  {entry.type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
