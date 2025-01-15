"use client"
import React, { useState} from "react";
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
import { SupplierModel } from "@/models/api/supplierModel";
import PaginationData from "@/models/PaginationData";
import { TableViewPagination } from "@/components/tableview-pagination";

interface SupplierTableProps {
  title: string;
  data: PaginationData<SupplierModel>; 
}

export const SupplierTable: React.FC<SupplierTableProps> = ({ title, data }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handlePrevClick = () =>
    setLoading(true);

  const handleNextClick = () =>
    setLoading(true);

  const handlePageClick = (i: number) => {
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="flex justify-between items-center">
        <Input
          className="max-w-sm"
          placeholder="Search suppliers..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button>Add Supplier</Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead>Contact Email</TableHead>
              <TableHead>Contact Phone</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Tax ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.records.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.supplierName }</TableCell>
                <TableCell>{supplier.contactName }</TableCell>
                <TableCell>{supplier.contactEmail }</TableCell>
                <TableCell>{supplier.contactPhone }</TableCell>
                <TableCell>{supplier.province }</TableCell>
                <TableCell>{supplier.taxIdentification }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TableViewPagination
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        onPageClick={(i) => handlePageClick(i)}
        path="/supplier"
        data={data}
      />
    </div>
  );
};
