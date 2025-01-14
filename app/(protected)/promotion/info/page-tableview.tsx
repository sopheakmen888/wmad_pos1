// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";

// interface PromotionModel {
//   promotionCode: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   discountPercentage: number;
// }

// const PromotionDetailView = () => {
//   const [promotion, setPromotion] = useState<PromotionModel | null>(null);
//   const router = useRouter();
//   const token = "your-jwt-token"; // replace with the actual token

//   // Fetch promotion details by ID
//   useEffect(() => {
//     const { id } = router.query;
//     if (id) {
//       fetch(`http://localhost:3001/api/promotion/${id}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => setPromotion(data))
//         .catch((error) => console.error("Error fetching promotion:", error));
//     }
//   }, [router.query]);

//   const handleUpdateClick = () => {
//     if (promotion) {
//       router.push(`/update-promotion/${promotion.promotionCode}`);
//     }
//   };

//   const handleDeleteClick = () => {
//     if (promotion) {
//       fetch(`http://localhost:3001/api/promotion/${promotion.promotionCode}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//         .then(() => {
//           router.push("/promotions");
//         })
//         .catch((error) => {
//           console.error("Error deleting promotion:", error);
//         });
//     }
//   };

//   if (!promotion) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Promotion Details</h1>

//       <div className="flex justify-between items-center">
//         <Button onClick={handleUpdateClick}>Update Promotion</Button>
//         <Button onClick={handleDeleteClick} className="bg-red-500 hover:bg-red-600">
//           Delete Promotion
//         </Button>
//       </div>

//       <div className="rounded-md border p-4">
//         <div className="mb-4">
//           <strong>Promotion Code:</strong> {promotion.promotionCode}
//         </div>
//         <div className="mb-4">
//           <strong>Description:</strong> {promotion.description}
//         </div>
//         <div className="mb-4">
//           <strong>Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}
//         </div>
//         <div className="mb-4">
//           <strong>End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}
//         </div>
//         <div className="mb-4">
//           <strong>Discount Percentage:</strong> {promotion.discountPercentage ? `${promotion.discountPercentage.toFixed(2)}%` : 'N/A'}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PromotionDetailView;


// "use client"; // Ensure client-side rendering

// import React, { useState, useEffect } from "react";

// interface PromotionModel {
//   promotionCode: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   discountPercentage: number;
// }

// interface PromotionDetailViewProps {
//   id: string; // Pass promotionId as a prop
// }

// export const PromotionDetailView: React.FC<PromotionDetailViewProps> = ({ id }) => {
//   const [promotion, setPromotion] = useState<PromotionModel | null>(null);
//   const token = "your-jwt-token"; // Replace with your actual token

//   useEffect(() => {
//     // Fetch the promotion details by ID
//     fetch(`http://localhost:3001/api/promotion/${id}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setPromotion(data))
//       .catch((error) => console.log("Error fetching promotion:", error));
//   }, [id]); // Trigger the effect when the 'promotionId' changes

//   const handleUpdateClick = () => {
//     if (promotion) {
//       console.log("Navigate to update page for", promotion.promotionCode);
//       // You can add a redirect here to an update page if needed
//     }
//   };

//   const handleDeleteClick = () => {
//     if (promotion) {
//       fetch(`http://localhost:3000/api/promotion/${promotion.promotionCode}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//         .then(() => {
//           console.log("Redirecting to promotions list after deletion");
//           // Redirect after deletion, you can use any routing mechanism you prefer
//         })
//         .catch((error) => {
//           console.log("Error deleting promotion:", error);
//         });
//     }
//   };

//   if (!promotion) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Promotion Details</h1>

//       <div className="flex justify-between items-center">
//         <button onClick={handleUpdateClick}>Update Promotion</button>
//         <button onClick={handleDeleteClick} className="bg-red-500 hover:bg-red-600">
//           Delete Promotion
//         </button>
//       </div>

//       <div className="rounded-md border p-4">
//         <div className="mb-4">
//           <strong>Promotion Code:</strong> {promotion.promotionCode}
//         </div>
//         <div className="mb-4">
//           <strong>Description:</strong> {promotion.description}
//         </div>
//         <div className="mb-4">
//           <strong>Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}
//         </div>
//         <div className="mb-4">
//           <strong>End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}
//         </div>
//         <div className="mb-4">
//           <strong>Discount Percentage:</strong> {promotion.discountPercentage ? `${promotion.discountPercentage.toFixed(2)}%` : 'N/A'}
//         </div>
//       </div>
//     </div>
//   );
// };

"use client"; // Ensure client-side rendering

import React, { useState, useEffect } from "react";

interface PromotionDetailViewProps {
  id: string; // Pass the promotion ID as a prop
}

export const PromotionDetailView: React.FC<PromotionDetailViewProps> = ({ id }) => {
  const [promotion, setPromotion] = useState<any | null>(null);
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIiwiZXhwaXJlc0F0IjoiMjAyNS0wMS0xNFQwMToyNjozMy42MjlaIiwiaWF0IjoxNzM2ODE0MzkzLCJleHAiOjE3MzY4MTc5OTN9.QtK6AcxDK_QaKaDn8u27_fWjJ0FZEy-mRr4bdFYBdxc";

  useEffect(() => {
    // Fetch the promotion details by ID using params
    fetch(`http://localhost:3000/api/promotion/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch promotion: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.data) {
          setPromotion(data.data); // Assuming the promotion details are under `data`
        } else {
          throw new Error("Invalid response structure");
        }
      })
      .catch((error) => console.error("Error fetching promotion:", error));
  }, [id]);

  const handleUpdateClick = () => {
    if (promotion) {
      console.log("Navigate to update page for", promotion.promotionCode);
      // Add your navigation logic here
    }
  };

  const handleDeleteClick = () => {
    if (promotion) {
      fetch(`http://localhost:3000/api/promotion/${promotion.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to delete promotion: ${res.statusText}`);
          }
          console.log("Successfully deleted. Redirecting...");
          // Add your redirect logic after deletion
        })
        .catch((error) => console.error("Error deleting promotion:", error));
    }
  };

  if (!promotion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Promotion Details</h1>

      <div className="flex justify-between items-center">
        <button
          onClick={handleUpdateClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Promotion
        </button>
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Promotion
        </button>
      </div>

      <div className="rounded-md border p-4">
        <div className="mb-4">
          <strong>Promotion Code:</strong> {promotion.promotionCode}
        </div>
        <div className="mb-4">
          <strong>Description:</strong> {promotion.description}
        </div>
        <div className="mb-4">
          <strong>Start Date:</strong>{" "}
          {new Date(promotion.startDate).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <strong>End Date:</strong>{" "}
          {new Date(promotion.endDate).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <strong>Discount Percentage:</strong>{" "}
          {promotion.discountPercentage
            ? `${Number(promotion.discountPercentage).toFixed(2)}%`
            : "N/A"}
        </div>
      </div>
    </div>
  );
};
