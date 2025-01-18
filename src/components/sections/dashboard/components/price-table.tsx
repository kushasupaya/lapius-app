"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Heart, ChevronDown, ChevronUp, Filter, Search } from "lucide-react";
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
import { ColumnVisibility } from "@/types/medical-service";
import {
  defaultColumnVisibility,
  medicalServices,
} from "@/utils/tableFakeData";
import TableSearchFilter from "./table-search-filter";
import { cn } from "@/lib/utils";

export default function MedicalServicesTable() {
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
  };

  const filteredServices = useMemo(() => {
    return medicalServices.filter((service) =>
      Object.entries(service).some(
        ([key, value]) =>
          columnVisibility[key as keyof ColumnVisibility] &&
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [medicalServices, searchTerm, columnVisibility]);

  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredServices, currentPage]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const visibleColumns = Object.entries(columnVisibility).filter(
    ([_, isVisible]) => isVisible
  ).length;

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <TableSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        columnVisibility={columnVisibility}
        toggleColumnVisibility={toggleColumnVisibility}
      />
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-200">
            {columnVisibility.code && <TableHead>Code</TableHead>}
            {columnVisibility.code_type && <TableHead>Code Type</TableHead>}
            {columnVisibility.description && <TableHead>Description</TableHead>}
            {columnVisibility.hospital_name && (
              <TableHead>Hospital Name</TableHead>
            )}
            {columnVisibility.address && <TableHead>Address</TableHead>}
            {columnVisibility.state && <TableHead>State</TableHead>}
            {columnVisibility.payer && <TableHead>Payer</TableHead>}
            {columnVisibility.rate && <TableHead>Rate</TableHead>}
            {columnVisibility.minimum && <TableHead>Minimum</TableHead>}
            {columnVisibility.maximum && <TableHead>Maximum</TableHead>}
            {columnVisibility.list_price && <TableHead>List Price</TableHead>}
            {columnVisibility.cash_rate && <TableHead>Cash Rate</TableHead>}
            {columnVisibility.additional_notes && (
              <TableHead>Additional Notes</TableHead>
            )}
            {columnVisibility.setting && <TableHead>Setting</TableHead>}
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedServices.map((service, index) => (
            <React.Fragment key={`service-${service.code}-${index}`}>
              <TableRow
                className={` odd:bg-green-50 cursor-pointer hover:bg-gray-100 transition-colors dark:odd:bg-primary`}
                onClick={() => toggleExpand(index)}
              >
                {columnVisibility.code && (
                  <TableCell className="font-medium">
                    <div>
                      <div>{service.code}</div>
                      <div className="text-sm text-muted-foreground">
                        {service.code_type}
                      </div>
                    </div>
                  </TableCell>
                )}
                {columnVisibility.code_type && (
                  <TableCell>{service.code_type}</TableCell>
                )}
                {columnVisibility.description && (
                  <TableCell>{service.description}</TableCell>
                )}
                {columnVisibility.hospital_name && (
                  <TableCell>{service.hospital_name}</TableCell>
                )}
                {columnVisibility.address && (
                  <TableCell>{service.address}</TableCell>
                )}
                {columnVisibility.state && (
                  <TableCell>{service.state}</TableCell>
                )}

                {columnVisibility.payer && (
                  <TableCell>{service.payer}</TableCell>
                )}
                {columnVisibility.rate && (
                  <TableCell>${service.rate.toFixed(2)}</TableCell>
                )}
                {columnVisibility.minimum && (
                  <TableCell>${service.minimum.toFixed(2)}</TableCell>
                )}
                {columnVisibility.maximum && (
                  <TableCell>${service.maximum.toFixed(2)}</TableCell>
                )}
                {columnVisibility.list_price && (
                  <TableCell>${service.list_price.toFixed(2)}</TableCell>
                )}
                {columnVisibility.cash_rate && (
                  <TableCell>${service.cash_rate.toFixed(2)}</TableCell>
                )}
                {columnVisibility.additional_notes && (
                  <TableCell>{service.additional_notes}</TableCell>
                )}
                {columnVisibility.setting && (
                  <TableCell>{service.setting}</TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                    >
                      {expandedRows.has(index) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button> */}
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
              {/* {expandedRows.has(index) && (
                <TableRow>
                  <TableCell colSpan={visibleColumns + 1} className="p-0">
                    <Table>
                      <TableBody>
                        {service.relatedServices?.map((related) => (
                          <TableRow
                            key={`related-${service.code}-${related.code}`}
                            className="hover:bg-gray-100 bg-gray-50"
                          >
                            {columnVisibility.code && (
                              <TableCell className="font-medium">
                                <div>
                                  <div>{related.code}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {related.facilityType}
                                  </div>
                                </div>
                              </TableCell>
                            )}
                            {columnVisibility.description && (
                              <TableCell>{related.description}</TableCell>
                            )}
                            {columnVisibility.payer && <TableCell></TableCell>}
                            {columnVisibility.list_price && (
                              <TableCell className="text-right text-green-600">
                                ${related.price.toFixed(2)}
                              </TableCell>
                            )}
                            {Object.entries(columnVisibility)
                              .filter(
                                ([key, value]) =>
                                  value &&
                                  ![
                                    "code",
                                    "description",
                                    "payer",
                                    "list_price",
                                  ].includes(key)
                              )
                              .map(([key]) => (
                                <TableCell key={key}></TableCell>
                              ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )} */}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end px-2 py-4">
        <div className="text-sm text-muted-foreground w-full">
          Showing{" "}
          {Math.min(
            (currentPage - 1) * itemsPerPage + 1,
            filteredServices.length
          )}{" "}
          to {Math.min(currentPage * itemsPerPage, filteredServices.length)} of{" "}
          {filteredServices.length} entries
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
                className={cn(
                  "hover:cursor-pointer",
                  currentPage === 1 ? "pointer-events-none opacity-50 " : ""
                )}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
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
  );
}
