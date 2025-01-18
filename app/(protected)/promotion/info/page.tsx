"use client";
import React, {
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { AppInfoContext } from "@/components/app-wrapper";

interface FormData {
  promotionCode: string;
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: string;
  imageUrl: string;
}

interface Errors {
  promotionCode?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  discountPercentage?: string;
  imageUrl?: string;
}

const PromotionDetail: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    promotionCode: "",
    description: "",
    startDate: "",
    endDate: "",
    discountPercentage: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { token } = useContext(AppInfoContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    const fetchPromotion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/promotion/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const {
          promotionCode,
          description,
          startDate,
          endDate,
          discountPercentage,
          imageUrl,
        } = response.data;

        setFormData({
          promotionCode,
          description,
          startDate: startDate.slice(0, 10),
          endDate: endDate.slice(0, 10),
          discountPercentage,
          imageUrl: imageUrl || "",
        });
      } catch (error) {
        console.error("Error fetching promotion data:", error);
        alert("Error fetching promotion data.");
      }
    };

    fetchPromotion();
  }, [id, token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = (): Errors => {
    const errors: Errors = {};

    if (!formData.promotionCode) errors.promotionCode = "Promotion Code is required.";
    if (!formData.description) errors.description = "Description is required.";
    if (!formData.startDate) errors.startDate = "Start Date is required.";
    if (!formData.endDate) errors.endDate = "End Date is required.";
    if (!formData.discountPercentage || isNaN(Number(formData.discountPercentage)))
      errors.discountPercentage = "Valid Discount Percentage is required.";

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!token) {
      alert("No token found");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/api/promotion/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmitSuccess(true);
      router.replace("/promotion");
    } catch (error) {
      console.error("Error updating promotion:", error);
      alert("Failed to update promotion.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !token) {
      alert("Cannot delete without a valid promotion ID or token.");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/promotion/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Promotion deleted successfully.");
      router.push("/promotion");
    } catch (error) {
      console.error("Error deleting promotion:", error);
      alert("Failed to delete promotion.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-6 p-8 bg-white min-h-screen rounded-lg shadow-lg">
    <h1 className="text-3xl font-bold text-center">Promotion Detail</h1>
  
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-lg"
    >
      {Object.keys(formData).map((field) => (
        <div key={field} className="flex flex-col">
          <label
            htmlFor={field}
            className="text-sm font-medium text-gray-700 mb-2 capitalize"
          >
            {field}
          </label>
          <input
            type={field.includes("Date") ? "date" : "text"}
            name={field}
            id={field}
            value={formData[field as keyof FormData] || ""}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors[field as keyof Errors] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors[field as keyof Errors] && (
            <p className="text-sm text-red-500 mt-1">
              {errors[field as keyof Errors]}
            </p>
          )}
        </div>
      ))}
    </form>
  
    <div className="flex justify-start space-x-4 mt-6">
      <button
        type="button"
        className="py-2 px-6 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400"
        onClick={() => router.push("/promotion")}
      >
        Cancel
      </button>
  
      <button
        type="button"
        className="py-2 px-6 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700"
        onClick={() => setShowDeleteModal(true)}
      >
        Delete
      </button>
  
      <button
        type="submit"
        className="py-2 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  
    {submitSuccess && (
      <p className="text-green-500 text-sm text-center mt-4">
        Promotion updated successfully!
      </p>
    )}
  
    {showDeleteModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg space-y-4 shadow-lg">
          <p className="text-lg">Are you sure you want to delete this promotion?</p>
          <div className="flex justify-end space-x-4">
            <button
              className="py-2 px-4 bg-gray-300 rounded-md"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 bg-red-600 text-white rounded-md"
              onClick={handleDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default PromotionDetail;


