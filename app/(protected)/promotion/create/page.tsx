"use client";
import React, { useState } from "react";
import PageWrapper from "@/components/page-wrapper";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const AddPromotion = () => {
  const { toast } = useToast();
  const [promotionCode, setPromotionCode] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!promotionCode) newErrors.promotionCode = "Promotion code is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!startDate) newErrors.startDate = "Start date is required.";
    if (!endDate) newErrors.endDate = "End date is required.";
  
    if (!discountPercentage) {
      newErrors.discountPercentage = "Discount percentage is required.";
    } else if (isNaN(Number(discountPercentage))) {
      newErrors.discountPercentage = "Discount percentage must be a valid number.";
    }
  

    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      alert("Please fix the following errors:\n" + Object.values(newErrors).join("\n"));
      return false;
    }
  
    return true;
  };
  

  const handleCancel = () => {
    router.push("/promotion");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    let imageUrl: string | null = '';

    
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
        imageUrl = uploadData.secure_url
        ?uploadData.secure_url.toString()
        : null;

        console.log("Image uploaded successfully, URL:", imageUrl);
        toast({
          title: "Error Uploading Image",
          description: "Failed to upload image. Please try again.",
        });

      } catch (error) {
        console.error("Error uploading image:", error);
        toast({
          title: "Error Uploading Image",
          description: "Failed to upload image. Please try again.",
          });

        setIsLoading(false);
        return;
      }

    }

    const payload = {
      promotionCode,
      description,
      startDate,
      endDate,
      discountPercentage,
      imageUrl, 
    };
    console.log("data.....",payload);

    try {
      const response = await fetch("/api/promotion", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      if (response.ok) {
      toast({
        title: "Created promotion",
        description: "You will see you new promotion.",

      });
      router.push('/promotion')

    } else{
      toast({
        title: "Error  Promotion",
        description: "Failed to create promotion. Please try again.",
        });
    }
    } catch (error) {
      toast({
        title: "Error Creating Promotion",
        description: "Failed to create promotion. Please try again.",
      });
      
  }
  finally{
    setIsLoading(false)
  }

  };


  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold"> Add Promotion</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-lg">

            <div className="flex flex-col">
              <label htmlFor="promotionCode" className="text-sm font-medium text-gray-700 mb-2">Promotion Code</label>
              <input
                type="text"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                name="promotionCode"
                id="promotionCode"
                placeholder="Enter promotion code"
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)} 
              />
              {errors.promotionCode && (
                <p className="text-sm text-red-500 mt-1">{errors.promotionCode}</p>
              )}
            </div>


            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                name="description"
                id="description"
                placeholder="Enter description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
              )}
            </div>


            <div className="flex flex-col">
              <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                name="startDate"
                id="startDate"
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
              {errors.startDate && (
                <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>
              )}
            </div>


            <div className="flex flex-col">
              <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                name="endDate"
                id="endDate"
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
              />
              {errors.endDate && (
                <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>
              )}
            </div>


            <div className="flex flex-col">
              <label htmlFor="discountPercentage" className="text-sm font-medium text-gray-700 mb-2">Discount Percentage</label>
              <input
                type="number"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                name="discountPercentage"
                id="discountPercentage"
                placeholder="Enter discount percentage"
                min="0"
                max="100"
                value={discountPercentage} 
                onChange={(e) => setDiscountPercentage(e.target.value)} 
              />
              {errors.discountPercentage && (
                <p className="text-sm text-red-500 mt-1">{errors.discountPercentage}</p>
              )}
            </div>


            <div className="flex flex-col">
              <label htmlFor="imageFile" className="text-sm font-medium text-gray-700 mb-2">
                Upload Image (Optional)
              </label>
              <input
                type="file"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                name="imageFile"
                id="imageFile"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  setImageFile(file);
                }}
              />
              {errors.imageFile && (
                <p className="text-sm text-red-500 mt-1">{errors.imageFile}</p>
              )}
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
              {isLoading? "Saving...":"Save"}
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AddPromotion;




