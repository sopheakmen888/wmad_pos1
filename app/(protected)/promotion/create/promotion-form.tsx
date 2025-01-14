"use client";

import React, { ChangeEvent, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  promotionCode: string;
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
  imageUrl: File | null;
}

interface Props {
  title: string;
}

export const PromotionForm: React.FC<Props> = ({ title }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [formValue, setFormValue] = useState<FormData>({
    promotionCode: "",
    description: "",
    startDate: "",
    endDate: "",
    discountPercentage: 0,
    imageUrl: null
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(formValue)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(formValue);
    setFormErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      return;
    }
  
    let imageUrls: string | null = null;
  
    if (formValue.imageUrl) {
      const formData = new FormData();
      formData.append("file", formValue.imageUrl);
  
      try {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          credentials: "same-origin",
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error("Upload failed");
        }
  
        const uploadData = await uploadResponse.json();
        imageUrls = uploadData.secure_url || null;
  
        console.log("Uploaded Image:", uploadData, imageUrls);
  
        toast({
          title: "Success",
          description: "Image uploaded successfully.",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
  
        toast({
          title: "Failed",
          description: "Error uploading image.",
        });
  
        return; 
      }
    }
    const { promotionCode, description, startDate, endDate, discountPercentage, imageUrl } = formValue;
    const promotionData = {promotionCode, description, startDate, endDate, discountPercentage, imageUrl};
  try {
    const response = await fetch("/api/promotion", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promotionData),
    });
    if (response.ok) {
      setMessage("User added successfully");
      toast({
        title: "Success",
        description: "New user added.",
      });
      router.back();
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${errorData.message}`);
      toast({
        title: "Falied",
        description: `Error: ${errorData.message}`,
      });
    }
  } catch (error) {
    console.error("Error user creation:", error);
    setMessage("User creation failed");
    toast({
      title: "Falied",
      description: `User Creation.`,
    });
  } finally {
    setIsLoading(false);
  }
  
    console.log("Form submitted successfully:", { ...formValue, imageUrl });
  };

  const validate = (values: FormData) => {
    const errors: Record<string, string> = {};

    if (!values.promotionCode) {
      errors.promotionCode = "Promotion code is required!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
    }
    if (!values.startDate) {
      errors.startDate = "Start date is required!";
    }
    if (!values.endDate) {
      errors.endDate = "End date is required!";
    }
    if (values.discountPercentage <= 0) {
      errors.discountPercentage = "Discount percentage must be greater than 0!";
    }
    return errors;
  };

  return (
    <div>
      <div className="space-y-6 p-5">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="rounded-md border flex justify-center p-5">
          <div className="rounded-md p-5 bg-slate-200 w-full">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className="flex flex-col">
                  <label htmlFor="promotioncode" className="mb-2 text-sm font-medium text-gray-700">
                    Promotion Code
                  </label>
                  <input
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                    type="text"
                    name="promotionCode"
                    id="promotioncode"
                    value={formValue.promotionCode}
                    onChange={handleChange}
                    placeholder="Enter your promotion code"
                  />
                  <span className="mt-1 text-sm text-red-500">{formErrors.promotionCode}</span>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">Description</label>
                  <input
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                    type="text"
                    name="description"
                    id="description"
                    value={formValue.description}
                    onChange={handleChange}
                    placeholder="Description"
                  />
                  <span className="mt-1 text-sm text-red-500">{formErrors.description}</span>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="startdate" className="mb-2 text-sm font-medium text-gray-700">Start date</label>
                  <input
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                    type="date"
                    name="startDate"
                    id="startdate"
                    value={formValue.startDate}
                    onChange={handleChange}
                    placeholder="Start date"
                  />
                  <span className="mt-1 text-sm text-red-500">{formErrors.startDate}</span>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="enddate" className="mb-2 text-sm font-medium text-gray-700">End date</label>
                  <input
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                    type="date"
                    name="endDate"
                    id="enddate"
                    value={formValue.endDate}
                    onChange={handleChange}
                    placeholder="End date"
                  />
                  <span className="mt-1 text-sm text-red-500">{formErrors.endDate}</span>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="discountpercentage" className="mb-2 text-sm font-medium text-gray-700">Discount percentage</label>
                  <input
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                    type="number"
                    name="discountPercentage"
                    id="discountPercentage"
                    value={formValue.discountPercentage}
                    onChange={handleChange}
                    placeholder="Discount percentage"
                  />
                  <span className="mt-1 text-sm text-red-500">{formErrors.discountPercentage}</span>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="imageurl" className="mb-2 text-sm font-medium text-gray-700">Upload image</label>
                  <input
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                    type="file"
                    name="imageurl"
                    id="imageurl"

                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormValue({ ...formValue, imageUrl: file });
                    }}
                  />
                  <span className="mt-1 text-sm text-red-500">{formErrors.imageUrl}</span>
                </div>
              </div>
              <div className="space-x-5">
                <Button className="bg-blue-500" type="submit">
                  Save
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} className="bg-red-500 text-white">Cancel</Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
