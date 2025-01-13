"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Minus, Plus, ShoppingCart, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [discount, setDiscount] = useState(0);

  const products: Product[] = [
    { id: "1", name: "T-Shirt", price: 19.99, image: "/placeholder.svg" },
    { id: "2", name: "Jeans", price: 49.99, image: "/placeholder.svg" },
    { id: "3", name: "Sneakers", price: 79.99, image: "/placeholder.svg" },
    { id: "4", name: "Hat", price: 14.99, image: "/placeholder.svg" },
    { id: "5", name: "Socks", price: 9.99, image: "/placeholder.svg" },
    { id: "1", name: "T-Shirt", price: 19.99, image: "/placeholder.svg" },
    { id: "2", name: "Jeans", price: 49.99, image: "/placeholder.svg" },
    { id: "3", name: "Sneakers", price: 79.99, image: "/placeholder.svg" },
    { id: "4", name: "Hat", price: 14.99, image: "/placeholder.svg" },
    { id: "5", name: "Socks", price: 9.99, image: "/placeholder.svg" },
    { id: "1", name: "T-Shirt", price: 19.99, image: "/placeholder.svg" },
    { id: "2", name: "Jeans", price: 49.99, image: "/placeholder.svg" },
    { id: "3", name: "Sneakers", price: 79.99, image: "/placeholder.svg" },
    { id: "4", name: "Hat", price: 14.99, image: "/placeholder.svg" },
    { id: "5", name: "Socks", price: 9.99, image: "/placeholder.svg" },
    { id: "1", name: "T-Shirt", price: 19.99, image: "/placeholder.svg" },
    { id: "2", name: "Jeans", price: 49.99, image: "/placeholder.svg" },
    { id: "3", name: "Sneakers", price: 79.99, image: "/placeholder.svg" },
    { id: "4", name: "Hat", price: 14.99, image: "/placeholder.svg" },
    { id: "5", name: "Socks", price: 9.99, image: "/placeholder.svg" },
  ];

  const addToCart = (product: Product) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((current) =>
      current.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.1; // 10% VAT
  const total = subtotal + vat - discount;

  return (
    <div className="flex max-h-[892px] bg-gray-100">
      {/* Products List - Left Side */}
      <div className="flex flex-col w-2/3 p-4 gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sale Item Master</h1>
          <Input placeholder="Search products..." className="w-64 bg-white" />
        </div>

        <ScrollArea className="flex-1 bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => addToCart(product)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </p>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Customer</Label>
            <Select
              value={selectedCustomer}
              onValueChange={setSelectedCustomer}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">John Doe</SelectItem>
                <SelectItem value="2">Jane Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Cashier</Label>
            <div className="flex items-center gap-2 p-2 bg-white rounded-md">
              <User className="w-4 h-4" />
              <span>James Wilson</span>
            </div>
          </div>
          <div>
            <Label>Date</Label>
            <div className="p-2 bg-white rounded-md">
              {format(new Date(), "PPP")}
            </div>
          </div>
        </div>
      </div>

      {/* Cart - Right Side */}
      <div className="w-1/3 bg-white p-6 shadow-lg flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-5 h-5" />
          <h2 className="text-xl font-bold">Current Sale</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT (10%)</span>
            <span>${vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-20"
              />
              <span>${discount.toFixed(2)}</span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="w-full bg-sky-800" size="lg">
            Complete Sale
          </Button>
        </div>
      </div>
    </div>
  );
}
