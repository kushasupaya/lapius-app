import { Breadcrumbs } from "@/components/sections/dashboard/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

export default function Home() {
  const dummyData = [
    {
      id: 1,
      procedure: "Diagnostic Colonoscopy",
      code: "45378",
      location: "New York, NY",
      price: "$1,200",
    },
    {
      id: 2,
      procedure: "MRI Brain w/wo Contrast",
      code: "70553",
      location: "Boston, MA",
      price: "$2,100",
    },
    {
      id: 3,
      procedure: "Physical Therapy",
      code: "97110",
      location: "Chicago, IL",
      price: "$75",
    },
  ];
  return (
    <div className="">
      <div className="space-y-6">
        <div className="px-6 pt-6">
          <div className="rounded-lg bg-gray-50/50 p-4">
            <form className="flex flex-col gap-4 sm:flex-row">
              <Input
                placeholder="Enter procedure or CPT/HCPCS/MSDRG code..."
                className="flex-1 bg-white"
              />
              <Input
                placeholder="Zip Code or City"
                className="sm:w-[200px] bg-white"
              />
              <Button
                type="submit"
                className="bg-[#ACDB88] text-black hover:bg-[#9CC977]"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
        </div>

        <div className="px-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Procedure</TableHead>
                  <TableHead className="w-[20%]">Code</TableHead>
                  <TableHead className="w-[20%]">Location</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.procedure}
                    </TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
