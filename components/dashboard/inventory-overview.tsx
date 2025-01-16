"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export async function InventoryOverview({
  inventoryData,
}: {
  inventoryData: { name: string; value: number; color: string }[];
}) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Inventory Overview</CardTitle>
        <CardDescription>Distribution of products by category</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={inventoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, value }) => `${name} (${value})`}
            >
              {inventoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
