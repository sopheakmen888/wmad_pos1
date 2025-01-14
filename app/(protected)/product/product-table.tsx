"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductModel } from "@/models/api/productModel";
import PaginationData from "@/models/PaginationData";
import { TableViewPagination } from "@/components/tableview-pagination";

interface Props {
  title: string;
  data: PaginationData<ProductModel>;
}

export const ProductTableView: React.FC<Props> = ({
  title,
  data,

}) => {
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

      {/* Search and Add Product Section */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
         
        </div>
        <Button>Add Product</Button>
      </div>

      {/* Product Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name (EN)</TableHead>
              <TableHead>Name (KH)</TableHead>
              <TableHead>Category (EN)</TableHead>
              <TableHead>Category (KH)</TableHead>

              <TableHead>SKU</TableHead>
              <TableHead>Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.records?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nameEn}</TableCell>
                <TableCell>{item.nameKh}</TableCell>
                <TableCell>{item.categoryNameEn}</TableCell>
                <TableCell>{item.categoryNameKh}</TableCell>
                {/* <TableCell>{item.productCode}</TableCell> */}
                <TableCell>
                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.nameEn}
                    width={64}
                    height={64}
                    className="object-cover rounded-md"
                  />
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
        path="/stockin"
        data={paginatedData}
      />
    </div>
  );
};
