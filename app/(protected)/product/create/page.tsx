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

interface ProductCategory {
  id: number;
  nameEn: string;
}

interface ExistingProduct {
  nameEn: string;
  nameKh: string;
  sku: string;
}

const AddProductPage = () => {
  const router = useRouter();

  // Form field states
  const [nameEn, setNameEn] = useState("");
  const [nameKh, setNameKh] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState<ProductCategory[]>([]);
  const [existingProducts, setExistingProducts] = useState<ExistingProduct[]>(
    []
  );

  const [status, setStatus] = useState<StatusMessage>({
    message: "",
    type: "",
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch categories
    fetch("/api/category", { credentials: "same-origin" })
      .then((response) => response.json())
      .then((data) => setCategory(data.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch existing products
    fetch("/api/product", { credentials: "same-origin" })
      .then((response) => response.json())
      .then((data) => setExistingProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/product");
      setIsLoading(false);
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameEn || !nameKh || !categoryId || !sku) {
      setStatus({
        message: "Please fill in all required fields",
        type: "error",
      });
      return;
    }

    const categoryIdNum = parseInt(categoryId, 10);
    if (isNaN(categoryIdNum)) {
      setStatus({
        message: "Category ID must be a valid number",
        type: "error",
      });
      return;
    }

    const isDuplicate = existingProducts.some(
      (product) =>
        product.nameEn === nameEn ||
        product.nameKh === nameKh ||
        product.sku === sku
    );
    if (isDuplicate) {
      setStatus({
        message:
          "Product already exists",
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
        message: data.message,
        type: "success",
      });

      setExistingProducts((prev) => [...prev, { nameEn, nameKh, sku }]);

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

  const handleCancel = () => {
    router.push("/product");
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Add Product</h1>

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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-lg">
            <div className="flex flex-col">
              <label
                htmlFor="nameEn"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Product Name (English) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nameEn"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product name in English"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="nameKh"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Product Name (Khmer) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nameKh"
                value={nameKh}
                onChange={(e) => setNameKh(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product name in Khmer"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="categoryId"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Category ID <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select CategoryId</option>
                {category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="sku"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter SKU"
                required
              />
            </div>
          </div>

          <div className="col-span-2 space-x-4 mt-6">
            <button
              type="button"
              className="py-2 px-6 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="py-2 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AddProductPage;
