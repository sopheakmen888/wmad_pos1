"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { customerModel } from "@/models/api/customerModel";
import PaginationData from "@/models/PaginationData";
import { TableViewPagination } from "@/components/tableview-pagination";

interface Props {
  title: string;
  data: PaginationData<customerModel>;
}

export const CustomerPageTableView: React.FC<Props> = ({ title, data }) => {
  const [paginatedData, setPaginatedData] = useState(data);
  const router = useRouter();

  const handlePrevClick = () =>
    setPaginatedData((prev) => {
      return { ...prev, currentPage: data.prevPage };
    });

  const handleNextClick = () =>
    setPaginatedData((prev) => {
      return { ...prev, currentPage: data.nextPage };
    });

  const handlePageClick = (i: number) =>
    setPaginatedData({ ...paginatedData, currentPage: i + 1 });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="flex justify-between items-center">
        <Input className="max-w-sm" placeholder="Search customers..." />
        <a href="/customer/create">
          <Button className="bg-blue-500 ">Add Customer</Button>
        </a>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-black">First Name</TableHead>
              <TableHead className="text-black">Last Name</TableHead>
              <TableHead className="text-black">Email</TableHead>
              <TableHead className="text-black">Phone</TableHead>
              <TableHead className="text-black">Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.records.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => router.push(`/customer/info?id=${item.id}`)}
                style={{ cursor: "pointer" }}
                role="link"
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }>
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
        path="/customer"
        data={paginatedData}
      />
    </div>
  );
};
