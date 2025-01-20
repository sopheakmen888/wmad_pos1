"use client";

import { useState, useEffect } from "react"; // Add useEffect import
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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

interface Props {
  title: string;
  data: PaginationData<PromotionModel>;
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // Cleanup the timeout
  }, [value, delay]);

  return debouncedValue;
}

export const PageTableView: React.FC<Props> = ({ title, data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounced = useDebounce(searchQuery, 300); // Debounce search query
  const [paginatedData, setPaginatedData] = useState(data);
  const router = useRouter();

  const handlePrevClick = () => {
    if (paginatedData.prevPage && paginatedData.prevPage >= 1) {
      setPaginatedData((prev) => ({ ...prev, currentPage: paginatedData.prevPage }));
    }
  };

  const handleNextClick = () => {
    if (paginatedData.nextPage && paginatedData.nextPage <= paginatedData.totalPages) {
      setPaginatedData((prev) => ({ ...prev, currentPage: paginatedData.nextPage }));
    }
  };

  const handlePageClick = (i: number) => {
    if (i + 1 >= 1 && i + 1 <= paginatedData.totalPages) {
      setPaginatedData((prev) => ({ ...prev, currentPage: i + 1 }));
    }
  };

  const filteredRecords = paginatedData.records.filter((item) =>
    item.promotionCode.toLowerCase().includes(searchQueryDebounced.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQueryDebounced.toLowerCase()) ||
    new Date(item.startDate).toLocaleDateString().toLowerCase().includes(searchQueryDebounced.toLowerCase()) ||
    new Date(item.endDate).toLocaleDateString().toLowerCase().includes(searchQueryDebounced.toLowerCase()) ||
    item.discountPercentage.toString().toLowerCase().includes(searchQueryDebounced.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="flex justify-between items-center">
        <Input
          className="max-w-sm"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <a href="/promotion/create">
          <Button>Add Promotion</Button>
        </a>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Promotion Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Discount Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => router.push(`/promotion/info?id=${item.id}`)}
                style={{ cursor: "pointer" }}
                role="link"
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                <TableCell>{item.promotionCode}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{new Date(item.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(item.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {item.discountPercentage !== undefined && item.discountPercentage !== null
                    ? `${Number(item.discountPercentage).toFixed(2)}%`
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TableViewPagination
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        onPageClick={handlePageClick}
        path="/promotion"
        data={paginatedData}
      />
    </div>
  );
};
