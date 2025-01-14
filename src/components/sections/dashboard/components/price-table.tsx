"use client";

import { useState } from "react";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MedicalService } from "@/types/medical-service";

const medicalServices: MedicalService[] = [
  {
    code: "ICD-10-CM O80",
    facilityType: "Facility | Inpatient",
    description: "Encounter for full-term uncomplicated delivery",
    provider: "Bear River Valley Hospital",
    listPrice: 3123.0,
    relatedServices: [
      {
        code: "HCPCS 01967",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Neuraxl lbr anes vag dlvr",
        price: 4011.0,
      },
      {
        code: "HCPCS 59400",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Obstetrical care",
        price: 1010.0,
      },
      {
        code: "HCPCS 59409",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Obstetrical care",
        price: 602.1,
      },
      {
        code: "HCPCS 59410",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Obstetrical care",
        price: 300.2,
      },
      {
        code: "HCPCS 99140",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Anes comp emergency cond",
        price: 100.1,
      },
      {
        code: "HCPCS 59610",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Vbac delivery",
        price: 211.8,
      },
    ],
  },
  {
    code: "ICD-10-CM O80",
    facilityType: "Facility | Inpatient",
    description: "Encounter for full-term uncomplicated delivery",
    provider: "Mckay-Dee Hospital",
    listPrice: 3245.0,
    relatedServices: [
      {
        code: "HCPCS 01967",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Neuraxl lbr anes vag dlvr",
        price: 4011.0,
      },
      {
        code: "HCPCS 59400",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Obstetrical care",
        price: 1010.0,
      },
    ],
  },
  {
    code: "ICD-10-CM O80",
    facilityType: "Pro | Outpatient",
    description: "Encounter for full-term uncomplicated delivery",
    provider: "Oconnor Hospital",
    listPrice: 3720.0,
    relatedServices: [
      {
        code: "HCPCS 59409",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Obstetrical care",
        price: 602.1,
      },
      {
        code: "HCPCS 59410",
        facilityType: "Facility | Inpatient & Outpatient",
        description: "Obstetrical care",
        price: 300.2,
      },
    ],
  },
];

const MedicalServicesTable = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

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

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead className="text-right">List Price</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicalServices.map((service, index) => (
            <>
              <TableRow
                key={`row-${index}`}
                className={`${
                  index === 1 ? "bg-green-50 dark:bg-primary" : ""
                } cursor-pointer hover:bg-gray-200 transition-colors`}
                onClick={() => toggleExpand(index)}
              >
                <TableCell className="font-medium">
                  <div className="text-sm">
                    <div>{service.code}</div>
                    <div className="text-sm text-muted-foreground">
                      {service.facilityType}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text">{service.description}</TableCell>
                <TableCell className="text-teal-600">
                  {service.provider}
                </TableCell>
                <TableCell className="text-right">
                  ${service.listPrice.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
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
                    </Button>
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
              {expandedRows.has(index) && (
                <TableRow key={`expanded-${index}`}>
                  <TableCell colSpan={5} className="bg-gray-50 p-0">
                    <Table>
                      <TableBody>
                        {service.relatedServices?.map(
                          (related, relatedIndex) => (
                            <TableRow
                              key={`related-${index}-${relatedIndex}`}
                              className="hover:bg-gray-100 transition-colors"
                            >
                              <TableCell className="font-medium">
                                <div>
                                  <div>{related.code}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {related.facilityType}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{related.description}</TableCell>
                              <TableCell></TableCell>
                              <TableCell className="text-right text-green-600">
                                ${related.price.toFixed(2)}
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MedicalServicesTable;
