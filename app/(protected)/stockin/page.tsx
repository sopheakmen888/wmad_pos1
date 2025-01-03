"use client";

import { useState } from "react";
import { CalendarIcon, Search, Plus, X, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ItemSelectModal } from "./select-item-model";
import PageWrapper from "@/components/page-wrapper";

interface PurchaseItem {
  itemCode: string;
  itemNameEN: string;
  itemNameKH: string;
  qty: number;
  purchasePrice: number;
  totalAmount: number;
  defaultPrice: number;
}

export default function PurchaseOrder() {
  const [items, setItems] = useState<PurchaseItem[]>([
    {
      itemCode: "L-0007",
      itemNameEN: "LASER One Toe nail only 1 time",
      itemNameKH: "មជ្ឈមណ្ឌលកែសម្ផស្សភាពស្រស់ស្អាត ១ ដង",
      qty: 1,
      purchasePrice: 0,
      totalAmount: 0,
      defaultPrice: 0,
    },
    {
      itemCode: "000076",
      itemNameEN: "test",
      itemNameKH: "test",
      qty: 1,
      purchasePrice: 0,
      totalAmount: 0,
      defaultPrice: 0,
    },
  ]);

  const [date, setDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(15);

  const handleAddItem = (item: PurchaseItem) => {
    const newItem: PurchaseItem = {
      itemCode: item.itemCode,
      itemNameEN: item.itemNameEN,
      itemNameKH: item.itemNameKH,
      qty: selectedQty,
      purchasePrice: selectedPrice,
      totalAmount: selectedQty * selectedPrice,
      defaultPrice: 0,
    };
    setItems([...items, newItem]);
    setSelectedQty(1);
    setSelectedPrice(item.defaultPrice);
  };

  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-4">Purchase Item Master</h1>
      <Card className="w-full bg-sidebar">
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Purchase Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MMM/yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select defaultValue="general">
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Invoice Reference</Label>
                <Input type="text" placeholder="Enter invoice reference" />
              </div>
              <div className="space-y-2">
                <Label>Note</Label>
                <Input type="text" placeholder="Enter note" />
              </div>
            </div>

            {/* Item Selection Section */}
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-7">
                <Label>Item Selection</Label>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search and select item...
                </Button>
              </div>
              <div className="col-span-1">
                <Label>Qty</Label>
                <Input
                  type="number"
                  value={selectedQty}
                  onChange={(e) => setSelectedQty(Number(e.target.value))}
                  min={1}
                />
              </div>
              <div className="col-span-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(Number(e.target.value))}
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="col-span-2 flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    // This would typically be handled through the modal selection
                    // but we keep it for the example
                    //   handleAddItem({
                    //     itemCode: "NEW-ITEM",
                    //     itemNameEN: "New Item",
                    //     itemNameKH: "ទំនិញថ្មី",
                    //     defaultPrice: selectedPrice ,
                    //   });
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
                <Button variant="destructive">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Items Table */}
            <div className="border rounded-lg bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Item Name EN</TableHead>
                    <TableHead>Item Name KH</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Purchase Price</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.itemCode}>
                      <TableCell>{item.itemCode}</TableCell>
                      <TableCell>{item.itemNameEN}</TableCell>
                      <TableCell>{item.itemNameKH}</TableCell>
                      <TableCell className="text-right">{item.qty}</TableCell>
                      <TableCell className="text-right">
                        ${item.purchasePrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.totalAmount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button>Save</Button>
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Save & Print
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label>Total Qty:</Label>
                  <Input className="w-20" value={totalQty} readOnly />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Discount:</Label>
                  <Input className="w-20" defaultValue="0" />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Total Amt:</Label>
                  <Input
                    className="w-32"
                    value={`$${totalAmount.toFixed(2)}`}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <ItemSelectModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onItemSelect={() => console.log("item selected...")}
        />
      </Card>
    </PageWrapper>
  );
}
