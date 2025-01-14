"use client";
import React, { useState } from "react";
import PageWrapper from "@/components/page-wrapper";

const AddProduct = () => {
    const [nameEn, setnameEn] = useState("");
    const [nameKh, setnameKh] = useState("");
    const [categoryId, setcategoryId] = useState("");
    const [sku, setsku] = useState();
    const [Image, setImage] = useState();

    return (
        <PageWrapper>
            <div className="bg-white p-6 rounded-xl shadow-md w-1/3">
                <h2 className="text-2xl font-bold text-sky-600 mb-6 text-center">
                    Add New Product
                </h2>
                <form className="space-y-4">
                    {/* English Name */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-1">
                            English Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Enter English Name"
                        />
                    </div>

                    {/* Khmer Name */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-1">
                            Khmer Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="បញ្ចូលឈ្មោះខ្មែរ"
                        />
                    </div>

                    {/* Category ID */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-1">
                            Category ID
                        </label>
                        <input
                            type="number"
                            max="2"
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Enter Category ID"
                        />
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-1">
                            SKU
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Enter SKU"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-sky-500 text-white font-medium py-2 rounded-lg hover:bg-sky-600 transition duration-300"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </PageWrapper>
    );
};

export default AddProduct;
