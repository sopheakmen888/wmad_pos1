// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// interface Props {
//   title: string;
//   data: any; 
// }

// export const CreatePromotionForm: React.FC<Props> = ({ title, data }) => {
//   const [formData, setFormData] = useState({
//     promotionCode: data?.promotionCode || "",
//     description: data?.description || "",
//     startDate: data?.startDate || "",
//     endDate: data?.endDate || "",
//     discountPercentage: data?.discountPercentage || "",
//   });
//   const [loading, setLoading] = useState(false); // Loading state for the form
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true); // Set loading state to true

//     try {
//       const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIiwiZXhwaXJlc0F0IjoiMjAyNS0wMS0xM1QwMzo0NDowOS41NTdaIiwiaWF0IjoxNzM2NzM2MjQ5LCJleHAiOjE3MzY3Mzk4NDl9.ylFrF1Qo5l36Rq0xRt0pRgh55TShqMwkqy5cuefdZgM"; // The token provided

//       // Send POST request with form data
//       const response = await axios.post(
//         "http://localhost:3000/api/promotion",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in headers
//           },
//         }
//       );

//       // Handle successful response (you can replace this with a redirect or notification)
//       console.log("Promotion created successfully:", response.data);

//       // After successful submission, you can redirect to the promotion list page
//       router.push("/promotion");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       // Optionally handle the error here
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   const handleCancel = () => {
//     router.push("/promotion"); // Navigate to the promotions list
//   };

//   return (
//     <div className="max-w-xl mx-auto space-y-6 p-4">
//       <h1 className="text-3xl font-bold mb-4">{title}</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Promotion Code */}
//         <div>
//           <label className="block font-medium mb-1">Promotion Code</label>
//           <Input
//             name="promotionCode"
//             value={formData.promotionCode}
//             onChange={handleChange}
//             placeholder="Enter promotion code"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block font-medium mb-1">Description</label>
//           <Input
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//             required
//           />
//         </div>

//         {/* Start Date */}
//         <div>
//           <label className="block font-medium mb-1">Start Date</label>
//           <Input
//             name="startDate"
//             type="date"
//             value={formData.startDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* End Date */}
//         <div>
//           <label className="block font-medium mb-1">End Date</label>
//           <Input
//             name="endDate"
//             type="date"
//             value={formData.endDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Discount Percentage */}
//         <div>
//           <label className="block font-medium mb-1">Discount Percentage</label>
//           <Input
//             name="discountPercentage"
//             type="number"
//             value={formData.discountPercentage}
//             onChange={handleChange}
//             placeholder="Enter discount percentage"
//             min="0"
//             max="100"
//             step="0.01"
//             required
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-4 mt-4">
//           <Button
//             type="button"
//             variant="outline"
//             className="text-gray-700 border-gray-400"
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="bg-blue-600 text-white"
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };


// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// interface Props {
//   title: string;
//   data: any;
// }

// export const CreatePromotionForm: React.FC<Props> = ({ title, data }) => {
//   const [formData, setFormData] = useState({
//     promotionCode: data?.promotionCode || "",
//     description: data?.description || "",
//     startDate: data?.startDate || "",
//     endDate: data?.endDate || "",
//     discountPercentage: data?.discountPercentage || "",
//   });
//   const [loading, setLoading] = useState(false); // Loading state for the form
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true); // Set loading state to true

//     try {
//       const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIiwiZXhwaXJlc0F0IjoiMjAyNS0wMS0xM1QwMzo0NDowOS41NTdaIiwiaWF0IjoxNzM2NzM2MjQ5LCJleHAiOjE3MzY3Mzk4NDl9.ylFrF1Qo5l36Rq0xRt0pRgh55TShqMwkqy5cuefdZgM"; // The token provided

//       // Send POST request with form data
//       const response = await axios.post(
//         "http://localhost:3000/api/promotion",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in headers
//           },
//         }
//       );

//       // Handle successful response (you can replace this with a redirect or notification)
//       console.log("Promotion created successfully:", response.data);

//       // After successful submission, you can redirect to the promotion list page
//       router.push("/promotion");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       // Optionally handle the error here
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   const handleCancel = () => {
//     router.push("/promotion"); // Navigate to the promotions list
//   };

//   return (
//     <div className="max-w-xl mx-auto space-y-6 p-4">
//       <h1 className="text-3xl font-bold mb-4">{title}</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Promotion Code */}
//         <div>
//           <label className="block font-medium mb-1">Promotion Code</label>
//           <Input
//             name="promotionCode"
//             value={formData.promotionCode}
//             onChange={handleChange}
//             placeholder="Enter promotion code"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block font-medium mb-1">Description</label>
//           <Input
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//             required
//           />
//         </div>

//         {/* Start Date */}
//         <div>
//           <label className="block font-medium mb-1">Start Date</label>
//           <Input
//             name="startDate"
//             type="date"
//             value={formData.startDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* End Date */}
//         <div>
//           <label className="block font-medium mb-1">End Date</label>
//           <Input
//             name="endDate"
//             type="date"
//             value={formData.endDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Discount Percentage */}
//         <div>
//           <label className="block font-medium mb-1">Discount Percentage</label>
//           <Input
//             name="discountPercentage"
//             type="number"
//             value={formData.discountPercentage}
//             onChange={handleChange}
//             placeholder="Enter discount percentage"
//             min="0"
//             max="100"
//             step="0.01"
//             required
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-4 mt-4">
//           <Button
//             type="button"
//             variant="outline"
//             className="text-gray-700 border-gray-400"
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="bg-blue-600 text-white"
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };



// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// interface Props {
//   title: string;
//   data: any;
// }

// export const CreatePromotionForm: React.FC<Props> = ({ title, data }) => {
//   const [formData, setFormData] = useState({
//     promotionCode: data?.promotionCode || "",
//     description: data?.description || "",
//     startDate: data?.startDate || "",
//     endDate: data?.endDate || "",
//     discountPercentage: data?.discountPercentage || "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null); // State for feedback message
//   const [messageType, setMessageType] = useState<"success" | "error" | null>(
//     null
//   ); // State for message type
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null); // Reset message state

//     try {
//       const token =
//         "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIiwiZXhwaXJlc0F0IjoiMjAyNS0wMS0xM1QwMzo0NDowOS41NTdaIiwiaWF0IjoxNzM2NzM2MjQ5LCJleHAiOjE3MzY3Mzk4NDl9.ylFrF1Qo5l36Rq0xRt0pRgh55TShqMwkqy5cuefdZgM";

//       // Send POST request with form data
//       const response = await axios.post(
//         "http://localhost:3000/api/promotion",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Success handling
//       setMessage("Promotion created successfully!");
//       setMessageType("success");

//       // Redirect after 2 seconds
//       setTimeout(() => {
//         router.push("/promotion");
//       }, 2000);
//     } catch (error) {
//       // Error handling
//       setMessage(
//          "Failed to create promotion. Please try again."
//       );
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     router.push("/promotion");
//   };

//   return (
//     <div className="max-w-xl mx-auto space-y-6 p-4">
//       <h1 className="text-3xl font-bold mb-4">{title}</h1>

//       {/* Feedback Message */}
//       {message && (
//         <div
//           className={`${
//             messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//           } p-3 rounded mb-4`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Promotion Code */}
//         <div>
//           <label className="block font-medium mb-1">Promotion Code</label>
//           <Input
//             name="promotionCode"
//             value={formData.promotionCode}
//             onChange={handleChange}
//             placeholder="Enter promotion code"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block font-medium mb-1">Description</label>
//           <Input
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//             required
//           />
//         </div>

//         {/* Start Date */}
//         <div>
//           <label className="block font-medium mb-1">Start Date</label>
//           <Input
//             name="startDate"
//             type="date"
//             value={formData.startDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* End Date */}
//         <div>
//           <label className="block font-medium mb-1">End Date</label>
//           <Input
//             name="endDate"
//             type="date"
//             value={formData.endDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Discount Percentage */}
//         <div>
//           <label className="block font-medium mb-1">Discount Percentage</label>
//           <Input
//             name="discountPercentage"
//             type="number"
//             value={formData.discountPercentage}
//             onChange={handleChange}
//             placeholder="Enter discount percentage"
//             min="0"
//             max="100"
//             step="0.01"
//             required
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-4 mt-4">
//           <Button
//             type="button"
//             variant="outline"
//             className="text-gray-700 border-gray-400"
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="bg-blue-600 text-white"
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };


// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";

// interface Props {
//   title: string;
//   data: any;
// }

// export const CreatePromotionForm: React.FC<Props> = ({ title, data }) => {
//   const [formData, setFormData] = useState({
//     promotionCode: data?.promotionCode || "",
//     description: data?.description || "",
//     startDate: data?.startDate || "",
//     endDate: data?.endDate || "",
//     discountPercentage: data?.discountPercentage || "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null); 
//   const [messageType, setMessageType] = useState<"success" | "error" | null>(
//     null
//   ); 
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       console.log("Saved promotion data:", formData);

//       setMessage("Promotion data saved successfully!");
//       setMessageType("success");
//     } catch (error) {
//       setMessage("Failed to save promotion data. Please try again.");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     router.push("/promotion");
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-8 p-4">
//       <h1 className="text-3xl font-bold mb-6">{title}</h1>

//       {message && (
//         <div
//           className={`${
//             messageType === "success"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           } p-6 rounded mb-4`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Promotion Code</label>
//           <Input
//             name="promotionCode"
//             value={formData.promotionCode}
//             onChange={handleChange}
//             placeholder="Enter promotion code"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Description</label>
//           <Input
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Start Date</label>
//           <Input
//             name="startDate"
//             type="date"
//             value={formData.startDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">End Date</label>
//           <Input
//             name="endDate"
//             type="date"
//             value={formData.endDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Discount Percentage</label>
//           <Input
//             name="discountPercentage"
//             type="number"
//             value={formData.discountPercentage}
//             onChange={handleChange}
//             placeholder="Enter discount percentage"
//             min="0"
//             max="100"
//             step="0.01"
//             required
//           />
//         </div>

//         <div className="flex justify-end space-x-4 mt-4">
//           <Button
//             type="button"
//             variant="outline"
//             className="text-gray-700 border-gray-400"
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="bg-blue-600 text-white"
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  data: any;
}

export const CreatePromotionForm: React.FC<Props> = ({ title, data }) => {
  const [formData, setFormData] = useState({
    promotionCode: data?.promotionCode || "",
    description: data?.description || "",
    startDate: data?.startDate || "",
    endDate: data?.endDate || "",
    discountPercentage: data?.discountPercentage || "",
  });
  const [image, setImage] = useState<File | null>(null);  

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file); 
      console.log("Selected file:", file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      console.log("Saved promotion data:", formData);

      if (image) {
        console.log("Image file:", image);
      }

      setMessage("Promotion data saved successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage("Failed to save promotion data. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/promotion");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {message && (
        <div
          className={`${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } p-6 rounded mb-4`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Promotion Code</label>
          <Input
            name="promotionCode"
            value={formData.promotionCode}
            onChange={handleChange}
            placeholder="Enter promotion code"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Start Date</label>
          <Input
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 ">End Date</label>
          <Input
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Discount Percentage</label>
          <Input
            name="discountPercentage"
            type="number"
            value={formData.discountPercentage}
            onChange={handleChange}
            placeholder="Enter discount percentage"
            min="0"
            max="100"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Promotion Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <Button
            type="button"
            variant="outline"
            className="text-gray-700 border-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};
