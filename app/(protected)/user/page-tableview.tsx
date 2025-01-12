"use client";

import React, { useEffect, useState } from "react";
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
import { UserModel } from "@/models/api/userModel";
import PaginationData from "@/models/PaginationData";
import { TableViewPagination } from "@/components/tableview-pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  title: string;
}

export const PageTableView: React.FC<Props> = ({ title }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageSize = searchParams.get("pageSize");
  const currentPage = searchParams.get("currentPage");

  const [data, setData] = useState<PaginationData<UserModel>>({
    pageSize: pageSize ? parseInt(pageSize) : 10,
    currentPage: currentPage ? parseInt(currentPage) : 1,
    totalItems: 0,
    totalPages: 0,
    prevPage: 1,
    nextPage: 1,
    records: [],
  });
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    updateQueryParams([
      { name: "pageSize", value: pageSize ?? "10" },
      { name: "currentPage", value: currentPage ?? "1" },
    ]);

    const fetchData = async () => {
      await fetchUser(data.pageSize, data.currentPage);
    };

    fetchData();
  }, []);

  const fetchUser = async (pageSize: number, currentPage: number) => {
    try {
      setIsDataLoading(true);
      const response = await fetch(
        `/api/user?pageSize=${pageSize}&currentPage=${currentPage}`,
        { credentials: "same-origin" }
      );

      const result = await response.json();
      const newData = result.data as PaginationData<UserModel>;
      console.log(newData);
      setData(newData);
      updateQueryParams([
        { name: "pageSize", value: newData.pageSize.toString() },
        { name: "currentPage", value: newData.currentPage.toString() },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const updateQueryParams = (params: { name: string; value: string }[]) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    params.forEach((p) => newSearchParams.set(p.name, p.value));
    router.push(`?${newSearchParams.toString()}`);
  };

  const handlePrevClick = async () =>
    await fetchUser(data.pageSize, data.prevPage);

  const handleNextClick = async () =>
    await fetchUser(data.pageSize, data.nextPage);

  const handlePageClick = async (i: number) =>
    await fetchUser(data.pageSize, i);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="flex justify-between items-center">
        <Input className="max-w-sm" placeholder="Search" />
        <Button onClick={() => router.push("/user/new")}>Add User</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isDataLoading && (
              <TableRow>
                <TableCell>Loading...</TableCell>
                <TableCell>Loading...</TableCell>
                <TableCell>Loading...</TableCell>
                <TableCell>Loading...</TableCell>
              </TableRow>
            )}
            {!isDataLoading &&
              data.records.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.isActive ? "Active" : "Inactive"}</TableCell>
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
        data={data}
      />
    </div>
  );
};
