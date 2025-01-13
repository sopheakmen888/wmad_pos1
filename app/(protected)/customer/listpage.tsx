"use client";

import React, { useState } from "react";
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
// import { UserModel } from "@/models/api/userModel";
import PaginationData from "@/models/PaginationData";
import { TableViewPagination } from "@/components/tableview-pagination";
import { CustomerModel } from "@/models/api/customer";

interface Props {
  title: string;
  data: PaginationData<CustomerModel>;
}

export const CustomerTable: React.FC<Props> = ({ title, data }) => {
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
        <Input className="max-w-sm" placeholder="Search Customer..." />
        <Button className="bg-blue-600 font-bold">Add Customer</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader >
            <TableRow>
              <TableHead className="text-black font-bold">FirstName</TableHead>
              <TableHead className="text-black font-bold">LastName</TableHead>
              <TableHead className="text-black font-bold">Email</TableHead>
              <TableHead className="text-black font-bold">Phone</TableHead>
              <TableHead className="text-black font-bold">Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.records.map((item) => (
              <TableRow key={item.id}> 
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.address}</TableCell>
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
        path="/user"
        data={paginatedData}
      />
    </div>
  );
}