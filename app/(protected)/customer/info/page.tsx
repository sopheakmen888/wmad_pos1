"use client";
import React, { useContext, useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { AppInfoContext } from "@/components/app-wrapper";
import { useSearchParams, useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const UpdateCustomer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [getCustomer, setCustomer] = useState<FormData | null>(null);

  const { token } = useContext(AppInfoContext);
  
  const router = useRouter();
  const SearchParams = useSearchParams();
  const id = SearchParams.get("id");

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/customer/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCustomer(response.data.customer);
          setFormData(response.data.customer);
        } catch (error) {
          console.error("Error fetching customer data:", error);
          alert("Error fetching customer data.");
        }
      };
      
      fetchCustomer();
    }
  }, [id, token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = (): Errors => { 
    const errors: Errors = {};

    if (!formData.firstName) errors.firstName = "First Name is required.";
    if (!formData.lastName) errors.lastName = "Last Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required.";
    if (
      !formData.phone ||
      formData.phone.length < 9 ||
      formData.phone.length > 10 ||
      isNaN(Number(formData.phone))
    )
      errors.phone = "Phone must be 9-10 digits.";
    if (!formData.address) errors.address = "Address is required.";

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
      const response = await axios.put(
        `http://localhost:3000/api/customer/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      setSubmitSuccess(true);
      setErrors({});
      router.push('/customer');
    } catch (error) {
      console.error("Error:", error);
      setSubmitSuccess(false);
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !token) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/customer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Customer deleted successfully!");
        router.push("/customer"); // Redirect to customer list page
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Error deleting customer.");
      }
    }
  };

  if (!getCustomer) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-00">Loading customer data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5">
      <h1 className="text-3xl font-bold">Update Customer</h1>
      <div className="rounded-md border-2 shadow-sm flex justify-center p-5 h-[660px]">
        <div className="rounded-md p-5 w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {["firstName", "lastName", "email", "phone", "address"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label
                    htmlFor={field}
                    className="mb-2 text-sm font-medium text-gray-700 capitalize"
                  >
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    id={field}
                    value={formData[field as keyof FormData] || ""}
                    onChange={handleChange}
                    placeholder={`Enter your ${field}`}
                    className={`border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm ${
                      errors[field as keyof Errors] ? "border-black" : ""
                    }`}
                  />
                  {errors[field as keyof Errors] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors[field as keyof Errors]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="space-x-5 mt-5 flex justify-normal">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete Customer
              </button>
            </div>
            {submitSuccess && (
              <p className="text-blue-500 text-lg mt-4 text-center">
                Customer updated successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default UpdateCustomer;