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

interface StatusMessage {
  message: string;
  type: "success" | "error" | "";
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
  const [status, setStatus] = useState<StatusMessage>({
    message: "",
    type: "",
  });

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchCategoryAndProduct = async () => {
      try {
        const categoryResponse = await fetch("/api/category", {
          credentials: "same-origin",
        });
        const categoryData = await categoryResponse.json();
        setCategory(categoryData.data);

        const productResponse = await fetch(`/api/product/${id}`, {
          credentials: "same-origin",
        });
        const productData = await productResponse.json();

        if (productResponse.ok) {
          setProduct(productData.product);
          setNameEn(productData.product.nameEn);
          setNameKh(productData.product.nameKh);
          setCategoryId(productData.product.categoryId);
          setSku(productData.product.sku);
        } else {
          setError(productData.message || "Failed to load product details.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProduct();
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
        body: JSON.stringify({ nameEn, nameKh, categoryId, sku }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          message: "Product updated successfully!",
          type: "success",
        });
        setTimeout(() => router.push("/product"), 1000);
      } else {
        setStatus({
          message: data.message || "Failed to update product.",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Failed to update product:", err);
      setStatus({ message: "Something went wrong.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ message: "Product deleted successfully!", type: "success" });
        setTimeout(() => {
          router.push("/product");
        }, 1000);
      } else {
        setStatus({ message: data.message || "Failed to delete product.", type: "error" });
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setStatus({ message: "Something went wrong. Please try again.", type: "error" });
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleCancel = () => {
    router.push("/product");
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Edit Product</h1>

        {status.message && (
          <div
            className={`p-4 rounded-md ${
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
            {/* Form Fields */}
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
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Category</option>
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
                required
              />
            </div>
          </div>

          <div className="space-x-4 mt-6">
            <button
              type="button"
              className="py-2 px-6 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`py-2 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              className={`py-2 px-6 bg-rose-700 text-white font-semibold rounded-md shadow-md hover:bg-rose-800 focus:outline-none ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleDelete}
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
