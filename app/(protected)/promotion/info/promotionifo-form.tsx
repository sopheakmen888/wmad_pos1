"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Props {
    title: string;
  }

export const PromotionIfoForm: React.FC<Props> = ({ title}) => {

  const [promotionCode, setPromotionCode] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountPercentage, setDiscountPersentage] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
 
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  console.log('====>', id)


  useEffect(() => {
  if(id) {
  
  const  fetchPromotionData = async (id: string) => {
    try {
      const response = await fetch(`/api/promotion/${id}`, {
      });

      console.log(response);
      if (response.ok) {
        const value = await response.json();
        const data = value.data;
        setPromotionCode(data.promotionCode);
        setDescription(data.description);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setDiscountPersentage(data.discountPercentage);
      } else {
        toast({
          title: "Failed",
          description: "Failed to fetch promotion data.",
        });
      }
    } catch (error) {
      console.error("Error fetching promotion data:", error);
      toast({
        title: "Failed",
        description: "Failed to fetch promotion data.",
      });
    }
  }
  fetchPromotionData(id)
}
}, [id, toast])

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!promotionCode) newErrors.promotionCode = "Promotion code is required!";
    if (!description) newErrors.description = "Description is required!";
    if (!startDate) newErrors.startDate = "Start date is required!";
    if (!endDate) newErrors.endDate = "End date is required!";
    if (!discountPercentage) newErrors.discountPercentage = "Discount percentage must be greater than 0!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!validate()) return;
    let imageUrl: string | null = "";

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
        imageUrl = uploadData.secure_url ? uploadData.secure_url.toString() : null;
        toast({
          title: "Success",
          description: "Cloudinary Upload.",
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

    const promotionData = { promotionCode, description, startDate, endDate, discountPercentage, imageUrl };
    try {
      const response = await fetch(`/api/promotion/${id}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promotionData),
      });

      if (response.ok) {
        setMessage("Promotion updated successfully");
        toast({
          title: "Success",
          description: "Promotion updated successfully.",
        });
        router.back();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        toast({
          title: "Failed",
          description: `Error: ${errorData.message}`,
        });
      }
    } catch (error) {
      console.error("Error updating promotion:", error);
      setMessage("Promotion update failed");
      toast({
        title: "Failed",
        description: "Promotion update failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/promotion/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (response.ok) {
        setMessage("Promotion deleted successfully");
        toast({
          title: "Success",
          description: "Promotion has been deleted.",
        });
        router.replace("/promotion");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        toast({
          title: "Falied",
          description: `Error: ${errorData.message}`,
        });
      }
    } catch (error) {
      console.error("Error promotion delete:", error);
      setMessage("Promotion delete failed");
      toast({
        title: "Falied",
        description: `Promotion Delete.`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
    <div className="space-y-6 p-5">
      <h1 className="text-3xl font-bold">{title}</h1>
      {message && <p>{message}</p>}
      <div className="rounded-md border flex justify-center p-5">
        <div className="rounded-md p-5 w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
              <div className="flex flex-col">
                <label htmlFor="promotioncode" className="mb-2 text-sm font-medium text-gray-700">
                  Promotion Code
                </label>
                <input
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                  type="text"
                  name="promotionCode"
                  id="promotioncode"
                  value={promotionCode}
                  onChange={(e) => {
                    setPromotionCode(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, promotionCode: "" }))
                  }}
                  placeholder="Enter your promotion code"
                />
                <span className="mt-1 text-sm text-red-500">{errors.promotionCode}</span>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">Description</label>
                <input
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, description: "" }))
                  }}
                  placeholder="Description"
                />
                <span className="mt-1 text-sm text-red-500">{errors.description}</span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="startdate" className="mb-2 text-sm font-medium text-gray-700">Start date</label>
                <input
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                  type="text"
                  name="startDate"
                  id="startdate"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, startDate: "" }))
                  }}
                  placeholder="Start date"
                />
                <span className="mt-1 text-sm text-red-500">{errors.startDate}</span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="enddate" className="mb-2 text-sm font-medium text-gray-700">End date</label>
                <input
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                  type="text"
                  name="endDate"
                  id="enddate"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, endDate: "" }))
                  }}
                  placeholder="End date"
                />
                <span className="mt-1 text-sm text-red-500">{errors.endDate}</span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="discountpercentage" className="mb-2 text-sm font-medium text-gray-700">Discount percentage</label>
                <input
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                  type="number"
                  name="discountPercentage"
                  id="discountPercentage"
                  value={discountPercentage}
                  onChange={(e) => {
                    setDiscountPersentage(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, discountPercentage: "" }))
                  }}
                  placeholder="Discount percentage"
                />
                <span className="mt-1 text-sm text-red-500">{errors.discountPercentage}</span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="imageurl" className="mb-2 text-sm font-medium text-gray-700">Upload image</label>
                <input
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                  type="file"
                  name="imageurl"
                  id="imageurl"

                  onChange={(e) => { setImageFile(e.target.files?.[0]) }}
                />
                <span className="mt-1 text-sm text-red-500">{errors.imageFile}</span>
              </div>
            </div>
            <div className="space-x-5 mt-5">
              <Button className="bg-blue-500" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} className="bg-red-500 text-white">Cancel</Button>
              <Button type="button" variant="destructive" onClick={handleDelete} className="bg-red-500 text-white">Delete</Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
  )
}
