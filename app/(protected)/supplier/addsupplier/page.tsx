"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AddSupplierPage: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [supplierName, setSupplierName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("") || null;
  const [addressLine2, setAddressLine2] = useState("");
  const [province, setProvince] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [taxIdentification, setTaxIdentification] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  
  const validate = () => {
     const newErrors: Record<string, string> = {};
     if (!supplierName) newErrors.supplierName = "SupplierName is required";
     if (!contactName) newErrors.contactName = "ContactName is required";
     if (!contactEmail) {
       newErrors.contactEmail = "ContactEmail is required";
     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
       newErrors.contactEmail = "Invalid email address";
     }
     if (!contactPhone) newErrors.contactPhone = "ContactPhone is required";
     if (addressLine1 === null || addressLine1 === undefined) {
      newErrors.addressLine1 = "AddressLine1 must be valid if provided";
    }
        
     if (!addressLine2) newErrors.addressLine2 = "AddressLine2 is required";
     if (!province) newErrors.province = "Province is required";
     if (!websiteUrl) newErrors.websiteUrl = "WebsiteUrl is required";
    //  if (!imageUrl) newErrors.imageUrl = "ImageUrl is required";
     if (!taxIdentification)
       newErrors.taxIdentification = "TaxIdentification is required";
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();

     if (!validate()) {
       setMessage("Please fix the errors before submitting.");
       return;
     }

    let imageUrl: string | null = null;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          credentials: "same-origin",
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.secure_url || null;
        toast({
          title: "Success",
          description: "Image uploaded successfully.",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        setMessage("Image upload failed.");
        toast({
          title: "Error",
          description: "Image upload failed.",
        });
        setIsLoading(false);
        return;
      }
    }

    const supplierData = {
      supplierName,
      contactName,
      contactEmail,
      contactPhone,
      addressLine1,
      addressLine2,
      province,
      websiteUrl,
      taxIdentification,
      imageUrl,
    };

    try {
      const response = await fetch("/api/supplier", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
        setMessage("Supplier added successfully.");
        toast({
          title: "Success",
          description: "New supplier added.",
        });
        router.back();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        toast({
          title: "Error",
          description: `Failed to add supplier: ${errorData.message}`,
        });
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
      setMessage("Failed to add supplier.");
      toast({
        title: "Error",
        description: "Failed to add supplier.",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Add Supplier</h1>
        {message && <p>{message}</p>}
        <div className="rounded-md border-2 shadow-sm flex justify-center p-5 h-[660px]">
        <div className="rounded-md p-5 w-full">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">

            <div className="flex flex-col">
              <label htmlFor="supplierName">Supplier Name</label>
              <input
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="text"
                id="supplierName"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="Supplier Name"
              />
              {errors.supplierName && (
                <p className="text-sm text-red-600">{errors.supplierName}</p>
              )}
            </div>


            <div className="flex flex-col">
              <label htmlFor="contactName">Contact Name</label>
              <input
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="text"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Supplier Name"
              />
              {errors.contactName && (
                <p className="text-sm text-red-600">{errors.contactName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Contact Email"
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-600">{errors.contactEmail}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="text"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Contact Phone"
              />
              {errors.contactPhone && (
                <p className="text-sm text-red-600">{errors.contactPhone}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="text"
                id="addressLine1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="Address Line 1"
              />
              {errors.addressLine1 && (
                <p className="text-sm text-red-600">{errors.addressLine1}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="text"
                id="addressLine2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder="Address Line 2"
              />
              {errors.addressLine2 && (
                <p className="text-sm text-red-600">{errors.addressLine2}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="province">Province</label>
              <input
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="text"
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Province"
              />
              {errors.province && (
                <p className="text-sm text-red-600">{errors.province}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="websiteUrl">Website URL</label>
              <input
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="text"
                id="websiteUrl"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="Website URL"
              />
              {errors.websiteUrl && (
                <p className="text-sm text-red-600">{errors.websiteUrl}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="taxIdentification">Tax Identification</label>
              <input
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="text"
                id="taxIdentification"
                value={taxIdentification}
                onChange={(e) => setTaxIdentification(e.target.value)}
                placeholder="Tax Identification"
              />
              {errors.taxIdentification && (
                <p className="text-sm text-red-600">{errors.taxIdentification}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="imageFile">Profile Image</label>
              <input
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                type="file"
                id="imageFile"
                onChange={(e) => setImageFile(e.target.files?.[0])}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-500 hover:bg-black text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 hover:text-white text-white"
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
        </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddSupplierPage;