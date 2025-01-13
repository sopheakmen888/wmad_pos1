"use client";

import { useEffect, useState } from "react";
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
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddPurchaseItemDetailModal } from "./add-purchase-item-detail-modal";
import PageWrapper from "@/components/page-wrapper";
import { ProductRefModel } from "@/app/api/product0/route";

interface PurchaseDetail {
  productId?: number;
  qty?: number;
  purchaseUnitPrice?: number;
  saleUnitPrice?: number;
}

type Supplier = {
  id: number;
  name: string;
};

export default function AddPurchasePage() {
  // Ref Data
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<ProductRefModel[]>([]);

  // Form Master
  const [refDate, setRefDate] = useState<Date>(new Date());
  const [refNum, setRefNum] = useState<string>("");
  const [supplierId, setSupplierId] = useState<string>("1");
  const [note, setNote] = useState<string>("");

  // Form Detail
  const [productId, setProductId] = useState<string>("1");
  const [qty, setQty] = useState<number>(1);
  const [purchaseUnitPrice, setPurchaseUnitPrice] = useState<number>(1);
  const [saleUnitPrice, setSaleUnitPrice] = useState<number>(1);
  const [expiryDate, setExpiryDate] = useState<Date>(new Date());

  // Detail
  const [purchaseDetail, setPurchaseDetail] = useState<PurchaseDetail[]>();

  // Add Purchase Item Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/supplier0", { credentials: "same-origin" })
      .then((res) => res.json())
      .then((data) => {
        const suppliers = data.data as Supplier[];
        setSuppliers(suppliers);
      });

    fetch("/api/product0", { credentials: "same-origin" })
      .then((res) => res.json())
      .then((data) => {
        const products = data.data as ProductRefModel[];
        setProducts(products);
      });
  }, []);

  const handleSaveMaster = async () => {
    // Log Master
    console.log("refNum", refNum);
    console.log("refDate", refDate);
    console.log("supplierId", supplierId);
    console.log("note", note);
  };

  const handleAddDetail = async () => {
    // Log Detail
    console.log("productId", productId);
    console.log("qty", qty);
    console.log("purchaseUnitPrice", purchaseUnitPrice);
    console.log("saleUnitPrice", saleUnitPrice);
    console.log("expiryDate", expiryDate);
  };

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
                      {refDate ? format(refDate, "dd/MMM/yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={refDate}
                      onSelect={(refDate) => refDate && setRefDate(refDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select
                  defaultValue={supplierId}
                  onValueChange={(value) => setSupplierId(value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Invoice Reference</Label>
                <Input
                  type="text"
                  className="bg-white"
                  placeholder="Enter invoice reference"
                  onChange={(e) => setRefNum(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Note</Label>
                <Input
                  className="bg-white"
                  type="text"
                  placeholder="Enter note"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>

            {/* Item Selection Section */}
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-4 space-y-2">
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
              <div className="col-span-1 space-y-2">
                <Label>Qty</Label>
                <Input
                  type="number"
                  className="bg-white"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  min={1}
                />
              </div>
              <div className="col-span-1 space-y-2">
                <Label>P-Unit Price</Label>
                <Input
                  type="number"
                  className="bg-white"
                  value={purchaseUnitPrice}
                  onChange={(e) => setPurchaseUnitPrice(Number(e.target.value))}
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="col-span-1 space-y-2">
                <Label>S-Unit Price</Label>
                <Input
                  className="bg-white"
                  type="number"
                  value={saleUnitPrice}
                  onChange={(e) => setSaleUnitPrice(Number(e.target.value))}
                  min={0}
                  step={0.01}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate
                        ? format(expiryDate, "dd/MMM/yyyy")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={expiryDate}
                      onSelect={(date) => date && setExpiryDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="col-span-2 flex gap-2">
                <Button className="flex-1" onClick={handleAddDetail}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
                <Button variant="destructive">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Items Table */}
            {/* <div className="border rounded-lg bg-white">
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
            </div> */}

            {/* Footer Section */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button onClick={handleSaveMaster}>Save</Button>
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Save & Print
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label>Total Qty:</Label>
                  {/* <Input className="w-20" value={totalQty} readOnly /> */}
                </div>
                <div className="flex items-center gap-2">
                  <Label>Discount:</Label>
                  <Input className="w-20" defaultValue="0" />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Total Amt:</Label>
                  {/* <Input
                    className="w-32"
                    value={`$${totalAmount.toFixed(2)}`}
                    readOnly
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <AddPurchaseItemDetailModal
          products={products}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onItemSelect={(item) => setProductId(item.id.toString())}
        />
      </Card>
    </PageWrapper>
  );
}
