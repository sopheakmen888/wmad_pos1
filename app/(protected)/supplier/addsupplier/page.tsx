// "use client";

// import React, { useState, useEffect } from "react";
// import PageWrapper from "@/components/page-wrapper";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// const AddSupplierPage = () => {
//   const router = useRouter();
//   const [supplierName, setSupplierName] = useState("");
//   const [contactName, setContactName] = useState("");
//   const [contactEmail, setContactEmail] = useState("");
//   const [contactPhone, setContactPhone] = useState("");
//   const [addressLine1, setAddressLine1] = useState("");
//   const [addressLine2, setAddressLine2] = useState("");
//   const [province, setProvince] = useState("");
//   const [websiteUrl, setWebsiteUrl] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [taxIdentification, setTaxIdentification] = useState("");
//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetch("/api/user/role", { credentials: "same-origin" })
//       .then((response) => response.json())
//       .then((data) => setRoles(data.data))
//       .catch((error) => console.error("Error fetching roles:", error));
//   }, []);

//   const validate = () => {
//     const newErrors: Record<string, string> = {};
//     if (!supplierName) newErrors.supplierName = "Suppliername is required";
//     if (!contactName) newErrors.contactName = "Contactname is required";
//     if (!contactEmail) {
//       newErrors.contactEmail = "Contactemail is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
//       newErrors.contactEmail = "Invalid email address";
//     }
//     if (!contactPhone) newErrors.contactPhone = "Contactphone is required";
//     if (!addressLine1) newErrors.addressLine1 = "AddressLine1 is required";
//     if (!addressLine2) newErrors.addressLine2 = "AddressLine2 is required";
//     if (!province) newErrors.province = "Province is required";
//     if (!websiteUrl) newErrors.websiteUrl = "WebsiteUrl is required";
//     if (!imageUrl) newErrors.imageUrl = "ImageUrl is required";
//     if (!taxIdentification)
//       newErrors.taxIdentification = "TaxIdentification is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!validate()) {
//       setMessage("Please fix the errors before submitting.");
//       return;
//     }

//     setIsLoading(true);

//     const supplierData = {
//       supplierName,
//       contactName,
//       contactEmail,
//       contactPhone,
//       addressLine1,
//       addressLine2,
//       province,
//       websiteUrl,
//       imageUrl,
//       taxIdentification,
//     };

//     try {
//       const response = await fetch("/api/suppliers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(supplierData),
//       });

//       if (response.ok) {
//         setMessage("Supplier added successfully!");
//         setSupplierName("");
//         setContactName("");
//         setContactEmail("");
//         setContactPhone("");
//         setAddressLine1("");
//         setAddressLine2("");
//         setProvince("");
//         setWebsiteUrl("");
//         setImageUrl("");
//         setTaxIdentification("");
//         setErrors({});
//         router.push("/supplier");
//       } else {
//         const errorData = await response.json();
//         setMessage(errorData.message || "Error saving supplier data.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   return (
//     <PageWrapper>
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold">Add Supplier</h1>
//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-4">
            


// <div className="flex flex-col">
//   <label htmlFor="suppliername">Suppliername</label>
//   <input
//     className={`border p-1  bg-gray-100 ${errors.supplierName ? "border-red-500" : ""}`}
//     type="text"
//     name="suppliername"
//     id="suppliername"
//     value={supplierName}
//     onChange={(e) => setSupplierName(e.target.value)}
//     // placeholder="Suppliername"
//   />
//   {errors.supplierName && (
//     <p className="text-sm text-red-600">{errors.supplierName}</p>
//   )}
// </div>


// <div className="flex flex-col">
//   <label htmlFor="contactname">Contactname</label>
//   <input
//     className={`border p-1  bg-gray-100 ${errors.contactName ? "border-red-500" : ""}`}
//     type="text"
//     name="contactname"
//     id="contactname"
//     value={contactName}
//     onChange={(e) => setContactName(e.target.value)}
//     // placeholder="Contactname"
//   />
//   {errors.contactName && (
//     <p className="text-sm text-red-600">{errors.contactName}</p>
//   )}
// </div>

// <div className="flex flex-col">
//   <label htmlFor="contactemail">Contactemail</label>
//   <input
//     className={`border p-1 bg-gray-100 ${errors.contactEmail ? "border-red-500" : ""}`}
//     type="text"
//     name="contactemail"
//     id="contactemail"
//     value={contactEmail}
//     onChange={(e) => setContactEmail(e.target.value)}
//     // placeholder="Contactemail"
//   />
//   {errors.contactEmail && (
//     <p className="text-sm text-red-600">{errors.contactEmail}</p>
//   )}
// </div>
            
            
            
// <div className="flex flex-col">
//   <label htmlFor="contactphone">Contactphone</label>
//   <input
//     className={`border p-1 bg-gray-100 ${errors.contactPhone ? "border-red-500" : ""}`}
//     type="text"
//     name="contactphone"
//     id="contactphone"
//     value={contactPhone}
//     onChange={(e) => setContactPhone(e.target.value)}
//     // placeholder="Contactphone"
//   />
//   {errors.contactPhone && (
//     <p className="text-sm text-red-600">{errors.contactPhone}</p>
//   )}
// </div>

// <div className="flex flex-col">
//   <label htmlFor="addressLine1">AddressLine1</label>
//   <input
//     className={`border p-1 bg-gray-100 ${errors.addressLine1 ? "border-red-500" : ""}`}
//     type="text"
//     name="addressLine1"
//     id="addressLine1"
//     value={addressLine1}
//     onChange={(e) => setAddressLine1(e.target.value)}
//     // placeholder="AddressLine1"
//   />
//   {errors.addressLine1 && (
//     <p className="text-sm text-red-600">{errors.addressLine1}</p>
//   )}
// </div>

// <div className="flex flex-col">
//   <label htmlFor="addressLine2">AddressLine2</label>
//   <input
//     className={`border p-1 bg-gray-100 ${errors.addressLine2 ? "border-red-500" : ""}`}
//     type="text"
//     name="addressLine2"
//     id="addressLine2"
//     value={addressLine2}
//     onChange={(e) => setAddressLine2(e.target.value)}
//     // placeholder="AddressLine2"
//   />
//   {errors.addressLine2 && (
//     <p className="text-sm text-red-600">{errors.addressLine2}</p>
//   )}
// </div>


// <div className="flex flex-col">
//   <label htmlFor="province">Province</label>
//   <input
//     className={`border p-1 bg-gray-100 ${errors.province ? "border-red-500" : ""}`}
//     type="text"
//     name="province"
//     id="province"
//     value={province}
//     onChange={(e) => setProvince(e.target.value)}
//     // placeholder="Province"
//   />
//   {errors.province && (
//     <p className="text-sm text-red-600">{errors.province}</p>
//   )}
// </div>

// <div className="flex flex-col">
//   <label htmlFor="websiteUrl">WebsiteUrl</label>
//   <input
//     className={`border p-1 bg-gray-100 ${errors.websiteUrl ? "border-red-500" : ""}`}
//     type="text"
//     name="websiteUrl"
//     id="websiteUrl"
//     value={websiteUrl}
//     onChange={(e) => setWebsiteUrl(e.target.value)}
//     // placeholder="WebsiteUrl"
//   />
//   {errors.websiteUrl && (
//     <p className="text-sm text-red-600">{errors.websiteUrl}</p>
//   )}
// </div>

// <div className="flex flex-col">
//   <label htmlFor="imageUrl">ImageUrl</label>
//   <input
//     className={`border p-1 bg-gray-100 ${errors.imageUrl ? "border-red-500" : ""}`}
//     type="text"
//     name="imageUrl"
//     id="imageUrl"
//     value={imageUrl}
//     onChange={(e) => setImageUrl(e.target.value)}
//     // placeholder="ImageUrl"
//   />
//   {errors.imageUrl && (
//     <p className="text-sm text-red-600">{errors.imageUrl}</p>
//   )}
// </div>

// <div className="flex flex-col">
//   <label htmlFor="taxIdentification">TaxIdentification</label>
//   <input
//     className={`border p-1 bg-gray-100 ${errors.taxIdentification ? "border-red-500" : ""}`}
//     type="text"
//     name="taxIdentification"
//     id="taxIdentification"
//     value={taxIdentification}
//     onChange={(e) => setTaxIdentification(e.target.value)}
//     // placeholder="TaxIdentification"
//   />
//   {errors.taxIdentification && (
//     <p className="text-sm text-red-600">{errors.taxIdentification}</p>
//   )}
// </div>

//             <div className="flex flex-col">
//               {/* <label htmlFor="imageFile">taxIdentification</label> */}
//               <input
//                 type="file"
//                 name="imageFile"
//                 id="imageFile"
//                 value={taxIdentification}
//                 onChange={(e) => setTaxIdentification(e.target.value)}
//               />
//             </div>

//           </div>
//           <div className="flex gap-2">
//           <Button className="bg-black" type="submit" disabled={isLoading}>
//               {isLoading ? "Updata..." : "Update"}
//             </Button>
//             <Button className="bg-blue-500" type="submit" disabled={isLoading}>
//               {isLoading ? "Saving..." : "Save"}
//             </Button>
//             <Button
//               variant="outline"
//               type="button"
//               onClick={() => router.back()}> Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </PageWrapper>
//   );
// };

// export default AddSupplierPage;




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
  const [addressLine1, setAddressLine1] = useState("");
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
     if (!addressLine1) newErrors.addressLine1 = "AddressLine1 is required";
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            
            <div className="flex flex-col">
              <label htmlFor="supplierName">Supplier Name</label>
              <input
                className="border p-1"
                type="text"
                id="supplierName"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                // placeholder="Supplier Name"
              />
              {errors.supplierName && (
                <p className="text-sm text-red-600">{errors.supplierName}</p>
              )}
            </div>


            <div className="flex flex-col">
              <label htmlFor="contactName">Contact Name</label>
              <input
                className="border p-1"
                type="text"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                // placeholder="Supplier Name"
              />
              {errors.contactName && (
                <p className="text-sm text-red-600">{errors.contactName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                className="border p-1"
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                // placeholder="Contact Email"
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-600">{errors.contactEmail}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                className="border p-1"
                type="text"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                // placeholder="Contact Phone"
              />
              {errors.contactPhone && (
                <p className="text-sm text-red-600">{errors.contactPhone}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                className="border p-1"
                type="text"
                id="addressLine1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                // placeholder="Address Line 1"
              />
              {errors.addressLine1 && (
                <p className="text-sm text-red-600">{errors.addressLine1}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input
                className="border p-1"
                type="text"
                id="addressLine2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                // placeholder="Address Line 2"
              />
              {errors.addressLine2 && (
                <p className="text-sm text-red-600">{errors.addressLine2}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="province">Province</label>
              <input
                className="border p-1"
                type="text"
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                // placeholder="Province"
              />
              {errors.province && (
                <p className="text-sm text-red-600">{errors.province}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="websiteUrl">Website URL</label>
              <input
                className="border p-1"
                type="text"
                id="websiteUrl"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                // placeholder="Website URL"
              />
              {errors.websiteUrl && (
                <p className="text-sm text-red-600">{errors.websiteUrl}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="taxIdentification">Tax Identification</label>
              <input
                className="border p-1"
                type="text"
                id="taxIdentification"
                value={taxIdentification}
                onChange={(e) => setTaxIdentification(e.target.value)}
                // placeholder="Tax Identification"
              />
              {errors.taxIdentification && (
                <p className="text-sm text-red-600">{errors.taxIdentification}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="imageFile">Profile Image</label>
              <input
                type="file"
                id="imageFile"
                onChange={(e) => setImageFile(e.target.files?.[0])}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-500" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AddSupplierPage;


