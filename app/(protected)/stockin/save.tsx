"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Item {
  itemCode: string;
  itemNameEN: string;
  itemNameKH: string;
  category: string;
  defaultPrice: number;
}

const SAMPLE_ITEMS: Item[] = [
  {
    itemCode: "B-0002",
    itemNameEN: "Botox 50 Units",
    itemNameKH: "បូតុក 50 យូនីត",
    category: "Botox",
    defaultPrice: 15.0,
  },
  {
    itemCode: "L-0007",
    itemNameEN: "LASER One Toe nail only 1 time",
    itemNameKH: "មជ្ឈមណ្ឌលកែសម្ផស្សភាពស្រស់ស្អាត ១ ដង",
    category: "Laser",
    defaultPrice: 50.0,
  },
  // Add more sample items as needed
];

interface ItemSelectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemSelect: (item: Item) => void;
}

export function ItemSelectModal({
  open,
  onOpenChange,
  onItemSelect,
}: ItemSelectModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredItems = SAMPLE_ITEMS.filter((item) => {
    const matchesSearch =
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemNameEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemNameKH.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "Laser", "Botox"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Item</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg overflow-auto max-h-[50vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Code</TableHead>
                  <TableHead>Item Name EN</TableHead>
                  <TableHead>Item Name KH</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Default Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow
                    key={item.itemCode}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => {
                      onItemSelect(item);
                      onOpenChange(false);
                    }}
                  >
                    <TableCell>{item.itemCode}</TableCell>
                    <TableCell>{item.itemNameEN}</TableCell>
                    <TableCell>{item.itemNameKH}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">
                      ${item.defaultPrice.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
