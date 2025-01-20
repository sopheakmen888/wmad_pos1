"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AppInfoContext } from "@/components/app-wrapper";
import axios from "axios";

const SupplierInfoPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  console.log("Extracted ID:", id);

  const [formData, setFormData] = useState({
    supplierName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    addressLine1: "",
    addressLine2: "",
    province: "",
    websiteUrl: "",
    taxIdentification: "",
    imageUrl: "",
  });
  const { token } = useContext(AppInfoContext);

  useEffect(() => {
    if (id) {
      const fetchSupplierData = async (supplierId: string | number) => {
        try {
          const response = await fetch(`/api/supplier/${supplierId}`);
          if (response.ok) {
            const result = await response.json();
            const data = result.data;

            setFormData({
              supplierName: data.supplierName || "",
              contactName: data.contactName || "",
              contactEmail: data.contactEmail || "",
              contactPhone: data.contactPhone || "",
              addressLine1: data.addressLine1 || "",
              addressLine2: data.addressLine2 || "",
              province: data.province || "",
              websiteUrl: data.websiteUrl || "",
              taxIdentification: data.taxIdentification || "",
              imageUrl: data.imageUrl || "",
            });
          } else {
            console.error("Failed to fetch supplier data. Status:", response.status);
          }
        } catch (error) {
          console.error("Error fetching supplier data:", error);
        }
      };

      const numericId = Number(id);
      if (!isNaN(numericId)) {
        fetchSupplierData(numericId);
      } else {
        console.error("Invalid ID format:", id);
      }
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/supplier/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Updated successfully!");
        router.push("/supplier");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(`Update failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong during update.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/supplier/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Deleted successfully!");
        router.push("/supplier");
      } else {
        alert("Delete failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full space-y-6">
        <h1 className="text-2xl font-bold mb-4">Supplier Information</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="supplierName" className="block font-medium">
              Supplier Name
            </label>
            <input
              type="text"
              id="supplierName"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="contactName" className="block font-medium">
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="addressLine1" className="block font-medium">
              Address Line 1
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="addressLine2" className="block font-medium">
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="province" className="block font-medium">
              Province
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="websiteURL" className="block font-medium">
              Website URL
            </label>
            <input
              type="url"
              id="websiteURL"
              name="websiteURL"
              value={formData.websiteUrl}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="taxIdentification" className="block font-medium">
              Tax Identification
            </label>
            <input
              type="text"
              id="taxIdentification"
              name="taxIdentification"
              value={formData.taxIdentification}
              onChange={handleInputChange}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="profileImage" className="block font-medium">
              Profile Image
            </label>
            {formData.imageUrl ? (
              <div className="mt-2">
                <img
                  src={formData.imageUrl}
                  alt="Profile"
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            ) : (
              <div className="mt-2 text-gray-500">No image uploaded</div>
            )}
          </div>
        </div>

        <div className="mt-4 space-x-4 flex justify-start">
          <Button
            type="button"
            onClick={handleCancel}
            className="p-2 bg-gray-400 text-white rounded text-sm"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpdate}
            className="p-2 bg-blue-500 text-white rounded text-sm"
          >
            Update
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="p-2 bg-red-500 px-6 text-white text-sm"
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SupplierInfoPage;
