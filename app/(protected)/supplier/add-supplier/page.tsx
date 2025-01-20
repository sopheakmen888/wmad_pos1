     
"use client";

import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface FormData {
  supplierName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2: string;
  province: string;
  websiteUrl: string;
  imageUrl: string;
  taxIdentification: string;
}

const AddSupplier: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    supplierName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    addressLine1: "",
    addressLine2: "",
    province: "",
    websiteUrl: "",
    imageUrl: "",
    taxIdentification: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/roles")
      .then((response) => response.json())
      .then((data) => setRoles(data.data))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.supplierName) newErrors.supplierName = "Supplier Name is required";
    if (!formData.contactName) newErrors.contactName = "Contact Name is required";
    if (!formData.contactEmail || !/\S+@\S+\.\S+/.test(formData.contactEmail))
      newErrors.contactEmail = "Valid email is required";
    if (!formData.contactPhone || formData.contactPhone.length < 10)
      newErrors.contactPhone = "Valid Contact Phone is required";
    if (!formData.addressLine1) newErrors.addressLine1 = "Address Line 1 is required";
    if (!formData.province) newErrors.province = "Province is required";
    if (!formData.taxIdentification) newErrors.taxIdentification = "Tax Identification is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  
    if (!validate()) return;
  
    let imageUrl: string | null = "";
    if (imageFile) {
      const formDataImage = new FormData();
      formDataImage.append("file", imageFile);
  
      try {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          credentials: "same-origin",
          body: formDataImage,
        });
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.secure_url ? uploadData.secure_url.toString() : null;
        toast({
          title: "Success",
          description: "Cloudinary upload successful.",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        setMessage("File upload failed");
        toast({
          title: "Failed",
          description: "Error uploading image.",
        });
        return;
      }
    }
  
    const supplierData = { ...formData, imageUrl };
  
    try {
      const response = await axios.post("/api/supplier", supplierData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200) {
        setMessage("Supplier added successfully");
        toast({
          title: "Success",
          description: "New supplier added.",
        });
        router.back();
      } else {
        // No need for response.json(), as axios automatically parses the response.
        const errorData = response.data;
        setMessage(`Error: ${errorData.message}`);
        toast({
          title: "Failed",
          description: `Error: ${errorData.message}`,
        });
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
      setMessage("Supplier creation failed");
      toast({
        title: "Failed",
        description: "An error occurred while creating the supplier.",
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="supplierName">Supplier Name</label>
              <input
                className="border p-1"
                type="text"
                name="supplierName"
                id="supplierName"
                value={formData.supplierName}
                onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                placeholder="Supplier Name"
              />
              {errors.supplierName && <p className="text-sm text-red-600">{errors.supplierName}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactName">Contact Name</label>
              <input
                className="border p-1"
                type="text"
                name="contactName"
                id="contactName"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Contact Name"
              />
              {errors.contactName && <p className="text-sm text-red-600">{errors.contactName}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactEmail">Email</label>
              <input
                className="border p-1"
                type="email"
                name="contactEmail"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="Email"
              />
              {errors.contactEmail && <p className="text-sm text-red-600">{errors.contactEmail}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                className="border p-1"
                type="text"
                name="contactPhone"
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="Contact Phone"
              />
              {errors.contactPhone && <p className="text-sm text-red-600">{errors.contactPhone}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                className="border p-1"
                type="text"
                name="addressLine1"
                id="addressLine1"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                placeholder="Address Line 1"
              />
              {errors.addressLine1 && <p className="text-sm text-red-600">{errors.addressLine1}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="province">Province</label>
              <input
                className="border p-1"
                type="text"
                name="province"
                id="province"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                placeholder="Province"
              />
              {errors.province && <p className="text-sm text-red-600">{errors.province}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="taxIdentification">Tax Identification</label>
              <input
                className="border p-1"
                type="text"
                name="taxIdentification"
                id="taxIdentification"
                value={formData.taxIdentification}
                onChange={(e) => setFormData({ ...formData, taxIdentification: e.target.value })}
                placeholder="Tax Identification"
              />
              {errors.taxIdentification && (
                <p className="text-sm text-red-600">{errors.taxIdentification}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="imageFile">Profile Image</label>
              <input
                type="file"
                name="imageFile"
                id="imageFile"
                onChange={(e) => setImageFile(e.target.files?.[0])}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-500" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AddSupplier;

