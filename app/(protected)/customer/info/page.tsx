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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg- p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Update Customer</h1>

        {["firstName", "lastName", "email", "phone", "address"].map((field) => (
          <div key={field} className="mb-6">
            <label htmlFor={field} className="block text-lg font-medium text-gray-700 capitalize">
              {field}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              id={field}
              value={formData[field as keyof FormData] || ""}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              className={`mt-2 block w-full px-4 py-3 rounded-md border ${
                errors[field as keyof Errors] ? "border-black" : "border-gray-300"
              } shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
            />
            {errors[field as keyof Errors] && (
              <p className="text-red-500 text-sm mt-1">{errors[field as keyof Errors]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >

          {loading ? "Updating..." : "Update"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="w-full py-3 px-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-4"
        >
          Delete Customer
        </button>

        {submitSuccess && (
          <p className="text-blue-500 text-lg mt-4 text-center">Customer updated successfully!</p>
        )}
      </form>
    </div>
  );
};

export default UpdateCustomer;