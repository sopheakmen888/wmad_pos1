// "use client";

// import { useState } from "react";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ProductModel } from "@/models/api/productModel";

// interface ItemSelectModalProps {
//   open: boolean;
//   products: ProductModel[];
//   onOpenChange: (open: boolean) => void;
//   onItemSelect: (item: ProductModel) => void;
// }

// export function AddPurchaseItemDetailModal({
//   open,
//   products,
//   onOpenChange,
//   onItemSelect,
// }: ItemSelectModalProps) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredItems = Array.isArray(products)
//     ? products.filter((item) => {
//         const matchesSearch =
//           item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.categoryNameEn.toLowerCase().includes(searchTerm.toLowerCase());
//         return matchesSearch;
//       })
//     : [];

//   console.log(products);
//   console.log(filteredItems);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
//         <DialogHeader>
//           <DialogTitle>Select Item</DialogTitle>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="relative">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search items..."
//                 className="pl-8"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="border rounded-lg overflow-auto max-h-[50vh]">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Item Code</TableHead>
//                   <TableHead>Item Name EN</TableHead>
//                   <TableHead>Item Name KH</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead className="text-right">Default Price</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredItems.map((item) => (
//                   <TableRow
//                     key={item.productCode}
//                     className="cursor-pointer hover:bg-muted"
//                     onClick={() => {
//                       onItemSelect(item);
//                       onOpenChange(false);
//                     }}
//                   >
//                     <TableCell>{item.productCode}</TableCell>
//                     <TableCell>{item.nameEn}</TableCell>
//                     <TableCell>{item.nameKh}</TableCell>
//                     <TableCell>{item.categoryNameEn}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }




"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { ProductModel } from "@/models/api/productModel";

interface ItemSelectModalProps {
  open: boolean;
  products: ProductModel[];
  onOpenChange: (open: boolean) => void;
  onItemSelect: (item: ProductModel) => void;
}

export function AddPurchaseItemDetailModal({
  open,
  products,
  onOpenChange,
  onItemSelect,
}: ItemSelectModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  // Ensure products is an array before filtering
  
  const filteredItems = products.filter((item) => {
        const matchesSearch =
          item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.categoryNameEn.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      })
    ;
    console.log(typeof products);
console.log(products)
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
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No items found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow
                      key={item.productCode}
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => {
                        onItemSelect(item);
                        onOpenChange(false);
                      }}
                    >
                      <TableCell>{item.productCode}</TableCell>
                      <TableCell>{item.nameEn}</TableCell>
                      <TableCell>{item.nameKh}</TableCell>
                      <TableCell>{item.categoryNameEn}</TableCell>
                    
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
