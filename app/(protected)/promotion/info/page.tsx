"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface PromotionDetail {
  id: number;
  promotionCode: string;
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
}

const PromotionDetailPage: React.FC = () => {
  const searchParams = useSearchParams(); // Fetch query params
  const router = useRouter(); // Use router for navigation
  const id = searchParams.get("id"); // Get the ID from query params
  const [promotion, setPromotion] = useState<PromotionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPromotionDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/promotion/${id}`);
          setPromotion(response.data);
        } catch (error) {
          console.error("Error fetching promotion details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPromotionDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!promotion) return <div>Promotion not found</div>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Promotion Details</h1>
      <div className="space-y-4 border p-4 rounded-md">
        <p><strong>Promotion Code:</strong> {promotion.promotionCode}</p>
        <p><strong>Description:</strong> {promotion.description}</p>
        <p><strong>Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}</p>
        <p><strong>Discount Percentage:</strong> {promotion.discountPercentage}%</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => router.push("/promotion")}
      >
        Back to List
      </button>
    </div>
  );
};

export default PromotionDetailPage;
