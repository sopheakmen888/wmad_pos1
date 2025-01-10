"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader,TableRow,} from "@/components/ui/table";
import { SupplierModel } from "@/models/api/supplier";
import PaginationData from "@/models/PaginationData";
import { TableViewPagination } from "@/components/tableview-pagination";

interface Props {
  title: string;
  data: PaginationData<SupplierModel>;
}

export const PageTableView: React.FC<Props> = ({ title, data }) => {
  const [paginatedData, setPaginatedData] = useState(data);

  const handlePrevClick = () => setPaginatedData((prev) => {
    return { ...prev, currentPage: data.prevPage };
  });

  const handleNextClick = () =>
    setPaginatedData((prev) => {
      return { ...prev, currentPage: data.nextPage };
    });

  const handlePageClick = (i: number) => setPaginatedData({ ...paginatedData, currentPage: i + 1 })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="flex justify-between items-center">
        <Input className="max-w-sm" placeholder="Search products..." />
        <Button>Add Supplier</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SupplierName</TableHead>
              <TableHead>ContactName</TableHead>
              <TableHead>ContactEmail</TableHead>
              <TableHead>ContactPhone</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>TaxIdentification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.records.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.supplierName}</TableCell>
                <TableCell>{item.contactName}</TableCell>
                <TableCell>{item.contactEmail}</TableCell>
                <TableCell>{item.contactPhone}</TableCell>
                <TableCell>{item.province}</TableCell>
                <TableCell>{item.taxIdentification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TableViewPagination
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        onPageClick={(i) => handlePageClick(i)}
        path="/supplier"
        data={paginatedData}
      />
    </div>
  );
}
