"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use useRouter from next/navigation
import { Button } from "@/components/ui/button";
import { TableViewPagination } from "@/components/tableview-pagination";
import { ProductModel } from "@/models/api/productModel";
import PaginationData from "@/models/PaginationData";

interface Props {
  title: string;
  data: PaginationData<ProductModel>;
}

export const ProductTableView: React.FC<Props> = ({ title, data }) => {
  const router = useRouter();
  const [paginatedData, setPaginatedData] = useState(data);

  // Handle Previous Page
  const handlePrevClick = () => {
    if (paginatedData.prevPage) {
      setPaginatedData((prev) => ({
        ...prev,
        currentPage: prev.prevPage,
      }));
    }
  };

  // Handle Next Page
  const handleNextClick = () => {
    if (paginatedData.nextPage) {
      setPaginatedData((prev) => ({
        ...prev,
        currentPage: prev.nextPage,
      }));
    }
  };

  // Handle Specific Page Click
  const handlePageClick = (i: number) => {
    setPaginatedData((prev) => ({
      ...prev,
      currentPage: i + 1,
    }));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Search and Add Product Section */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-md px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={() => router.push("/product/add-product")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Product
        </Button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 border-b">Name (EN)</th>
              <th className="py-3 px-6 border-b">Name (KH)</th>
              <th className="py-3 px-6 border-b">Category</th>
              <th className="py-3 px-6 border-b">SKU</th>
              <th className="py-3 px-6 border-b">Image</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.records?.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="py-4 px-6 border-b">{item.nameEn}</td>
                <td className="py-4 px-6 border-b">{item.nameKh}</td>
                <td className="py-4 px-6 border-b">Food</td>
                <td className="py-4 px-6 border-b">{getSku(index)}</td>
                <td className="py-4 px-6 border-b">
                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.nameEn}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TableViewPagination
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        onPageClick={handlePageClick}
        path="/stockin"
        data={paginatedData}
      />
    </div>
  );
};

// Helper function to generate SKU
const getSku = (index: number) => `P${String(index + 1).padStart(3, "0")}`;
