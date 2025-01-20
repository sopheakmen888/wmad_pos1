import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DataModel from "@/models/api/model";
import PaginationData from "@/models/PaginationData";
import React from "react";

type Props<T> = {
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageClick: (index: number) => void;
  path: string;
  data: PaginationData<T>;
}

export const TableViewPagination: React.FC<Props<DataModel>> = ({ onPageClick, onPrevClick, onNextClick, data, path }) => {
  return <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          href={`${path}?page=${data.prevPage}`}
          onClick={onPrevClick}
        />
      </PaginationItem>
      {[...Array(data.totalPages)].map((_, i) => (
        <PaginationItem key={i}>
          <PaginationLink
            href={`${path}?page=${i + 1}`}
            onClick={() => onPageClick(i)}
            isActive={data.currentPage === i + 1}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext
          href={`${path}?page=${data.nextPage}`}
          onClick={onNextClick}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
}