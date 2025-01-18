"use client";

import React, { useState } from "react";
// import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Createpage: React.FC = () =>{
  const { toast } = useToast();
  const router = useRouter();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!firstName) errors.firstName = "First Name is required.";
    if (!lastName) errors.lastName = "Last Name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      errors.email = "Valid email is required.";
    if (!phone || phone.length < 9 || phone.length > 10 || isNaN(Number(phone)))
      errors.phone = "Phone must be 9-10 digits.";
    if (!address) errors.address = "Address is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!validate()) return;

    const Data = { firstName, lastName, email, phone, address };
    try {
      const response = await fetch("/api/customer", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      });
      if (response.ok) {
        setMessage("User added successfully");
        toast({
          title: "Success",
          description: "New customer",
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
      setMessage("Customer creation failed");
      toast({
        title: "Falied",
        description: `Customer Creation.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-100 p-5">
    <h1 className="text-3xl font-bold p-5">Add New Customer</h1>
    <div className=" rounded border flex justify-center p-5">
    <div className="w-full bg-white shadow-lg rounded-lg p-5 border border-gray-200">
      {/* <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Customer
      </h2> */}
      {message && <p>{message}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
          <div className="flex flex-col">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700 capitalize mb-1"
            >
              FirstName
            </label>
            <input
              className={`w-full px-4 py-2 rounded-md border "border-red-400" : "border-gray-300"
            } shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200`}
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
              }}
              placeholder="FirstName"
            />
            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName}</p>
            )}{" "}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 capitalize mb-1"
            >
              LastName
            </label>
            <input
              className={`w-full px-4 py-2 rounded-md border "border-red-400" : "border-gray-300"
                } shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200`}
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, lastName: "" }));
              }}
              placeholder="LastName"
            />
            {errors.lastName && (
              <p className="text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 capitalize mb-1"
            >
              Email
            </label>
            <input
              className={`w-full px-4 py-2 rounded-md border "border-red-400" : "border-gray-300"
                } shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200`}
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
              }}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 capitalize mb-1"
            >
              Phone
            </label>
            <input
              className={`w-full px-4 py-2 rounded-md border "border-red-400" : "border-gray-300"
                } shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200`}
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
              }}
              placeholder="Phone"
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 capitalize mb-1"
            >
              Address
            </label>
            <input
              className={`w-full px-4 py-2 rounded-md border "border-red-400" : "border-gray-300"
                } shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200`}
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
              }}
              placeholder="Address"
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-500" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-black hover:text-white"
            variant="outline"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
    </div>
  </div>
  );
};

export default Createpage;
