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
import { PromotionModel } from "@/models/api/promotionModel";
import PaginationData from "@/models/PaginationData";
import { TableViewPagination } from "@/components/tableview-pagination";
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface Props {
  title: string;
  data: PaginationData<PromotionModel>;
}

export const PageTableView: React.FC<Props> = ({ title, data }) => {
  const [paginatedData, setPaginatedData] = useState(data);
  const router = useRouter();

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
        <Button><Link href="/promotion/create">
          Add Promotion
        </Link></Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PromotionCode</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>StartDate</TableHead>
              <TableHead>EndDate</TableHead>
              <TableHead>DiscountPercentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.records.map((item) => (
              <TableRow
                className="cursor-pointer"
                key={item.id}
                onClick={() => router.push(`/promotion/info?id=${item.id}`)}
              >
                <TableCell>{item.promotionCode}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{new Date(item.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(item.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {item.discountPercentage !== undefined && item.discountPercentage !== null ? `${Number(item.discountPercentage).toFixed(2)}%` : 'N/A'}
                </TableCell>

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
        path="/promotion"
        data={paginatedData}
      />
    </div>
  );
}
