"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PageWrapper from "@/components/page-wrapper";

interface Product {
  id: number;
  nameEn: string;
  nameKh: string;
  categoryId: number;
  sku: string;
}

interface ProductCategory {
  id: number;
  nameEn: string;
}

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [nameEn, setNameEn] = useState<string>("");
  const [nameKh, setNameKh] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [sku, setSku] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<ProductCategory[]>([]);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    fetch("/api/category", { credentials: "same-origin" })
      .then((response) => response.json())
      .then((data) => setCategory(data.data));

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data.product);
          setNameEn(data.product.nameEn);
          setNameKh(data.product.nameKh);
          setCategoryId(data.product.categoryId);
          setSku(data.product.sku);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(0),
      });

      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        alert("Product updated successfully!");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Failed to update product:", err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleCancel = () => {
    router.push("/product");
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Edit Product</h1>

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
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="border rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select CategoryId</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nameEn}
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
              className={`py-2 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>

            <button
              type="submit"
              className={`py-2 px-6 bg-rose-700 text-white font-semibold rounded-md shadow-md hover:bg-rose-800 focus:outline-none focus:ring-2 focus:bg-rose-700 focus:ring-offset-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
