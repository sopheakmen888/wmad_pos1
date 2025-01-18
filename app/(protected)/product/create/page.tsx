"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/page-wrapper";

interface ProductFormData {
  nameEn: string;
  nameKh: string;
  categoryId: number;
  sku: string;
  createdBy: string;
  updatedBy: string;
}

interface StatusMessage {
  message: string;
  type: "success" | "error" | "";
}

interface productCategory {
  id: number;
  nameEn: string;
}
const AddProductPage = () => {
  const router = useRouter();

  // Form field states
  const [nameEn, setNameEn] = useState("");
  const [nameKh, setNameKh] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState<productCategory[]>([]);

  useEffect(() => {
    fetch("/api/category", { credentials: "same-origin" })
        .then((response) => response.json())
        .then((data) => setCategory(data.data))
        .catch((error) => console.error("Error fetching roles:", error));
}, []);

  const [status, setStatus] = useState<StatusMessage>({
    message: "",
    type: "",
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/product");
      setIsLoading(false);
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!nameEn || !nameKh || !categoryId || !sku) {
      setStatus({
        message: "Please fill in all required fields",
        type: "error",
      });
      return;
    }

    // Validate that categoryId is a valid number
    const categoryIdNum = parseInt(categoryId, 10);
    if (isNaN(categoryIdNum)) {
      setStatus({
        message: "Category ID must be a valid number",
        type: "error",
      });
      return;
    }

    const formData: ProductFormData = {
      nameEn,
      nameKh,
      categoryId: categoryIdNum,
      sku,
      createdBy: "",
      updatedBy: "",
    };

    setIsLoading(true);

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      // Clear form fields
      setNameEn("");
      setNameKh("");
      setCategoryId("");
      setSku("");

      setStatus({
        message: data.message || "Product created successfully!",
        type: "success",
      });

      // Trigger navigation after successful submission
      handleNavigation();
    } catch (error) {
      console.error("Error creating product:", error);
      setStatus({
        message:
          error instanceof Error
            ? error.message
            : "Failed to create product. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-md rounded">
        <h1 className="text-3xl font-bold text-gray-800">Add Product</h1>

        {status.message && (
          <div
            className={`p-4 rounded ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nameEn" className="block text-gray-700 font-medium">
              Product Name (English) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nameEn"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter product name in English"
              required
            />
          </div>

          <div>
            <label htmlFor="nameKh" className="block text-gray-700 font-medium">
              Product Name (Khmer) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nameKh"
              value={nameKh}
              onChange={(e) => setNameKh(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter product name in Khmer"
              required
            />
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-gray-700 font-medium"
            >
              Category ID <span className="text-red-500">*</span>
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)} // Set categoryId instead
            >
              <option value="">Select CategoryId</option>
              {category.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameEn}
                </option>
              ))}
            </select>

            {status.type === "error" && (
              <p className="text-sm text-red-600">{status.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="sku" className="block text-gray-700 font-medium">
              SKU <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter SKU"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Creating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AddProductPage;
