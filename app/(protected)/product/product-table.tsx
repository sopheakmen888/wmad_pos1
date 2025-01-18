"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
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

export const ProductTable: React.FC<Props> = ({ title, data }) => {
  const [paginatedData, setPaginatedData] = useState(data);

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
      <h1 className="text-3xl font-bold">Product List</h1>

      <div className="flex justify-between items-center">
        <Input className="max-w-sm" placeholder="Search products..." />
        <a href="/product/create">
          <Button>Add Product</Button>
        </a>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>English Name</TableHead>
              <TableHead>Khmer Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sku</TableHead>
              <TableHead>Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.records.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nameEn}</TableCell>
                <TableCell>{item.nameKh}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.imageUrl}</TableCell>
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
        path="/product"
        data={paginatedData}
      />
    </div>
  );
};
