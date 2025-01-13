// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { PromotionModel } from "@/models/api/promotionModel";
// import PaginationData from "@/models/PaginationData";
// import { TableViewPagination } from "@/components/tableview-pagination";
// import Link from 'next/link';

// interface Props {
//   title: string;
//   data: PaginationData<PromotionModel>;
// }

// export const PageTableView: React.FC<Props> = ({ title, data }) => {
//   const [paginatedData, setPaginatedData] = useState(data);

//   const handlePrevClick = () => setPaginatedData((prev) => {
//     return { ...prev, currentPage: data.prevPage };
//   });

//   const handleNextClick = () =>
//     setPaginatedData((prev) => {
//       return { ...prev, currentPage: data.nextPage };
//     });

//   const handlePageClick = (i: number) => setPaginatedData({ ...paginatedData, currentPage: i + 1 })

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">{title}</h1>

//       <div className="flex justify-between items-center">
//         <Input className="max-w-sm" placeholder="Search products..." />
//         <Link href="/promotion/create">
//         <Button>
//         Add Promotion
//     </Button>
//     </Link>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>PromotionCode</TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead>StartDate</TableHead>
//               <TableHead>EndDate</TableHead>
//               <TableHead>DiscountPercentage</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedData.records.map((item) => (
//               <TableRow key={item.promotionCode}>
//                 <TableCell>{item.promotionCode}</TableCell>
//                 <TableCell>{item.description}</TableCell>
//                 <TableCell>{new Date(item.startDate).toLocaleDateString()}</TableCell>
//                 <TableCell>{new Date(item.endDate).toLocaleDateString()}</TableCell>
//                 <TableCell>
//                               {item.discountPercentage !== undefined && item.discountPercentage !== null ? `${Number(item.discountPercentage).toFixed(2)}%`  : 'N/A'}
//                 </TableCell>

//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       <TableViewPagination
//         onPrevClick={handlePrevClick}
//         onNextClick={handleNextClick}
//         onPageClick={(i) => handlePageClick(i)}
//         path="/promotion"
//         data={paginatedData}
//       />
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
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
import Link from 'next/link';
import axios from "axios";

interface Props {
  title: string;
  data: PaginationData<PromotionModel>;
}

export const PageTableView: React.FC<Props> = ({ title, data }) => {
  const [paginatedData, setPaginatedData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/promotions`, {
          params: { query: searchQuery, page: paginatedData.currentPage },
        });
        setPaginatedData(response.data);
      } catch (error) {
        console.error("Error fetching filtered promotions", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchFilteredData();
    } else {
      setPaginatedData(data);
    }
  }, [searchQuery, paginatedData.currentPage]);

  const handlePrevClick = () => {
    if (paginatedData.prevPage) {
      setPaginatedData((prev) => {
        return { ...prev, currentPage: paginatedData.prevPage };
      });
    }
  };

  const handleNextClick = () => {
    if (paginatedData.nextPage) {
      setPaginatedData((prev) => {
        return { ...prev, currentPage: paginatedData.nextPage };
      });
    }
  };

  const handlePageClick = (i: number) => setPaginatedData({ ...paginatedData, currentPage: i + 1 });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="flex justify-between items-center">
        <Input
          className="max-w-sm"
          placeholder="Search promotions..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Link href="/promotion/create">
          <Button>Add Promotion</Button>
        </Link>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : (
              paginatedData.records.map((item) => (
                <TableRow key={item.promotionCode}>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TableViewPagination
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        onPageClick={(i) => handlePageClick(i)}
        path="/promotion"
        data={paginatedData}
  
      />
    </div>
  );
};
