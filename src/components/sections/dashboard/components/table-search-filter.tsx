import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ColumnVisibility } from "@/types/medical-service";
import { Filter, Search } from "lucide-react";

interface TableSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  columnVisibility: ColumnVisibility;
  toggleColumnVisibility: (key: keyof ColumnVisibility) => void;
}
const TableSearchFilter = ({
  searchTerm,
  setSearchTerm,
  columnVisibility,
  toggleColumnVisibility,
}: TableSearchFilterProps) => {
  return (
    <div className="border rounded-full px-3 m-2">
      <div className="flex items-center space-x-2">
        <Search className="h-3 w-3 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-none shadow-none focus:outline-none focus:border-none"
        />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-gray-100 hover:text-black"
            >
              <Filter className="h-4 w-4" />
              Filter Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {Object.entries(columnVisibility).map(([key, value]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={value}
                onCheckedChange={() =>
                  toggleColumnVisibility(key as keyof ColumnVisibility)
                }
              >
                {key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
};

export default TableSearchFilter;
