"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  InfoIcon,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ColumnVisibility, MedicalService } from "@/types/medical-service";
import { defaultColumnVisibility } from "@/utils/tableFakeData";
import TableSearchFilter from "./table-search-filter";
import { cn } from "@/lib/utils";
import ColumnFilter from "./column-filter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MedicalServicesTableProps {
  tableData: MedicalService[];
  loading: boolean;
}
export default function MedicalServicesTable({
  tableData,
  loading,
}: MedicalServicesTableProps) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(
    defaultColumnVisibility
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleFavorite = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(index)) {
      newFavorites.delete(index);
    } else {
      newFavorites.add(index);
    }
    setFavorites(newFavorites);
  };

  const toggleExpand = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const toggleColumnVisibility = (column: keyof ColumnVisibility) => {
    setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
    // console.log(columnVisibility);
  };

  const filteredServices = useMemo(() => {
    return tableData.filter((service) =>
      Object.entries(service).some(
        ([key, value]) =>
          columnVisibility[key as keyof ColumnVisibility] &&
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [tableData, searchTerm, columnVisibility]);

  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredServices, currentPage]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // const visibleColumns = Object.entries(columnVisibility).filter(
  //   ([_, isVisible]) => isVisible
  // ).length;

  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        <ColumnFilter
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
        />
        <div className="col-span-3 bg-card p-2 rounded-lg shadow-sm">
          <TableSearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            columnVisibility={columnVisibility}
            toggleColumnVisibility={toggleColumnVisibility}
          />
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : (
            <>
              <Table className="rounded-lg overflow-hidden border">
                <TableHeader className="font-semibold group">
                  <TableRow className=" bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold group">
                    {columnVisibility.code && (
                      <TableHead className="text-black font-semibold flex items-center">
                        Code
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-3 w-3 ml-1 text-gray-500 hover:text-gray-100" />
                            </TooltipTrigger>
                            <TooltipContent className="p-2 bg-white shadow-lg rounded-lg text-black">
                              <p>code content</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableHead>
                    )}
                    {columnVisibility.code_type && (
                      <TableHead className="text-black font-semibold">
                        Code Type
                      </TableHead>
                    )}
                    {columnVisibility.description && (
                      <TableHead className="text-black font-semibold">
                        Description
                      </TableHead>
                    )}
                    {columnVisibility.list_price && (
                      <TableHead className="text-black font-semibold">
                        List Price
                      </TableHead>
                    )}
                    {columnVisibility.cash_rate && (
                      <TableHead className="text-black font-semibold">
                        Cash Rate
                      </TableHead>
                    )}
                    {columnVisibility.hospital_name && (
                      <TableHead className="text-black font-semibold">
                        Hospital Name
                      </TableHead>
                    )}
                    {columnVisibility.address && (
                      <TableHead className="text-black font-semibold">
                        Address
                      </TableHead>
                    )}
                    {columnVisibility.state && (
                      <TableHead className="text-black font-semibold">
                        State
                      </TableHead>
                    )}
                    {columnVisibility.payer && (
                      <TableHead className="text-black font-semibold">
                        Payer
                      </TableHead>
                    )}
                    {columnVisibility.plan_name && (
                      <TableHead className="text-black font-semibold">
                        Plan Name
                      </TableHead>
                    )}
                    {columnVisibility.standard_charge_dollar && (
                      <TableHead className="text-black font-semibold">
                        Standard Charge Dollar
                      </TableHead>
                    )}
                    {columnVisibility.standard_charge_percentage && (
                      <TableHead className="text-black font-semibold">
                        Standard Charge Percentage
                      </TableHead>
                    )}
                    {columnVisibility.standard_charge_algorithm && (
                      <TableHead className="text-black font-semibold">
                        Standard Charge Algorithm
                      </TableHead>
                    )}
                    {columnVisibility.minimum && (
                      <TableHead className="text-black font-semibold">
                        Minimum
                      </TableHead>
                    )}
                    {columnVisibility.maximum && (
                      <TableHead className="text-black font-semibold">
                        Maximum
                      </TableHead>
                    )}

                    {columnVisibility.estimated_amount && (
                      <TableHead className="text-black font-semibold">
                        Estimated Amount
                      </TableHead>
                    )}
                    {columnVisibility.rev_code && (
                      <TableHead className="text-black font-semibold">
                        Revenue Code
                      </TableHead>
                    )}
                    {columnVisibility.additional_notes && (
                      <TableHead className="text-black font-semibold">
                        Additional Notes
                      </TableHead>
                    )}
                    {columnVisibility.setting && (
                      <TableHead className="text-black font-semibold">
                        Setting
                      </TableHead>
                    )}
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedServices.length > 0 ? (
                    paginatedServices.map((service, index) => (
                      <React.Fragment key={`service-${service.code}-${index}`}>
                        <TableRow
                          className="cursor-pointer hover:bg-gray-100 transition-colors font-medium"
                          onClick={() => toggleExpand(index)}
                        >
                          {columnVisibility.code && (
                            <TableCell className="font-medium py-4">
                              <div>
                                <div>{service.code}</div>
                                <div className="text-xs text-muted-foreground">
                                  {service.code_type}
                                </div>
                              </div>
                            </TableCell>
                          )}
                          {columnVisibility.code_type && (
                            <TableCell>{service.code_type}</TableCell>
                          )}
                          {columnVisibility.description && (
                            <TableCell className="min-w-80">
                              {service.description}
                            </TableCell>
                          )}
                          {columnVisibility.list_price && (
                            <TableCell className="min-w-28">
                              {service.list_price !== "Not Provided" ? (
                                <span className="inline-flex text-center items-center justify-center rounded-full bg-primary px-2.5 py-1 text-sm font-medium text-white">
                                  ${service.list_price}
                                </span>
                              ) : (
                                <span className="inline-flex text-center items-center justify-center rounded-full bg-gray-200 px-2.5 py-1 text-sm font-medium text-gray-900">
                                  {service.list_price}
                                </span>
                              )}
                            </TableCell>
                          )}
                          {columnVisibility.cash_rate && (
                            <TableCell className="min-w-28">
                              {service.cash_rate !== "Not Provided"
                                ? `$${service.cash_rate}`
                                : service.cash_rate}
                            </TableCell>
                          )}
                          {columnVisibility.hospital_name && (
                            <TableCell className="min-w-60">
                              {service.hospital_name}
                            </TableCell>
                          )}
                          {columnVisibility.address && (
                            <TableCell className="min-w-64">
                              {service.address}
                            </TableCell>
                          )}
                          {columnVisibility.state && (
                            <TableCell>{service.state}</TableCell>
                          )}
                          {columnVisibility.payer && (
                            <TableCell>{service.payer}</TableCell>
                          )}
                          {columnVisibility.plan_name && (
                            <TableCell className="min-w-48">
                              {service.plan_name}
                            </TableCell>
                          )}
                          {columnVisibility.standard_charge_dollar && (
                            <TableCell>
                              {service.standard_charge_dollar}
                            </TableCell>
                          )}
                          {columnVisibility.standard_charge_percentage && (
                            <TableCell>
                              {service.standard_charge_percentage !== null
                                ? `${service.standard_charge_percentage}`
                                : "N/A"}
                            </TableCell>
                          )}
                          {columnVisibility.standard_charge_algorithm && (
                            <TableCell>
                              {service.standard_charge_algorithm ?? "N/A"}
                            </TableCell>
                          )}
                          {columnVisibility.minimum && (
                            <TableCell>
                              {service.minimum !== "Not Provided"
                                ? `$${service.minimum}`
                                : service.minimum}
                            </TableCell>
                          )}
                          {columnVisibility.maximum && (
                            <TableCell>
                              {service.maximum !== "Not Provided"
                                ? `$${service.maximum}`
                                : service.maximum}
                            </TableCell>
                          )}
                          {columnVisibility.estimated_amount && (
                            <TableCell>
                              {service.estimated_amount !== "Not Provided"
                                ? `$${service.estimated_amount}`
                                : service.estimated_amount}
                            </TableCell>
                          )}
                          {columnVisibility.rev_code && (
                            <TableCell>{service.rev_code}</TableCell>
                          )}
                          {columnVisibility.additional_notes && (
                            <TableCell>{service.additional_notes}</TableCell>
                          )}
                          {columnVisibility.setting && (
                            <TableCell>{service.setting}</TableCell>
                          )}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => toggleFavorite(index, e)}
                              >
                                <Heart
                                  className={`h-4 w-4 ${
                                    favorites.has(index)
                                      ? "fill-red-500 text-red-500"
                                      : ""
                                  }`}
                                />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={
                          Object.values(columnVisibility).filter(Boolean)
                            .length + 1
                        }
                        className="text-center py-4 hover:bg-gray-100"
                      >
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
          <div className="flex items-center justify-end px-2 py-4">
            <div className="text-sm text-muted-foreground w-full">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredServices.length
              )}{" "}
              to {Math.min(currentPage * itemsPerPage, filteredServices.length)}{" "}
              of {filteredServices.length} entries
            </div>
            <Pagination>
              <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    aria-disabled={currentPage === 1}
                    className={cn(
                      "hover:cursor-pointer",
                      currentPage === 1 ? "pointer-events-none opacity-50 " : ""
                    )}
                  />
                </PaginationItem>

                {/* Dynamic Page Numbers */}
                {[...Array(totalPages)]
                  .map((_, i) => i + 1)
                  .filter((page) => {
                    // Show only 3 pages at a time around the current page
                    const rangeStart = Math.max(currentPage - 1, 1);
                    const rangeEnd = Math.min(currentPage + 1, totalPages);
                    return page >= rangeStart && page <= rangeEnd;
                  })
                  .map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    aria-disabled={currentPage === totalPages}
                    className={cn(
                      "hover:cursor-pointer",
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50 hover:cursor-pointer"
                        : ""
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
