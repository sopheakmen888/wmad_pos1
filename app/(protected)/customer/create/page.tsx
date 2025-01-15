"use client";

import React, { useEffect, useState } from "react";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Createpage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [firstName, serfirstName] = useState("");
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
          description: "New user added.",
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
      setMessage("User creation failed");
      toast({
        title: "Falied",
        description: `User Creation.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-6 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add Customer
        </h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name  */}
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="text-lg font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  serfirstName(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
                }}
                id="firstName"
                placeholder="First Name"
              />
              {/* <span className="text-sm text-red-500 mt-1">Error</span> */}
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-lg font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  setlastName(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
                }}
                id="lastName"
                placeholder="Last Name"
              />
              {/* <span className="text-sm text-red-500 mt-1">Error</span> */}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
                }}
                id="email"
                placeholder="Email"
              />
              {/* <span className="text-sm text-red-500 mt-1">Error</span> */}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-lg font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setphone(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
                }}
                id="phone"
                placeholder="Phone"
              />
              {/* <span className="text-sm text-red-500 mt-1">Error</span> */}
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="text-lg font-medium text-gray-700"
              >
                Address
              </label>
              <input
                className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="text"
                name="address"
                value={address}
                onChange={(e) => {
                  setaddress(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
                }}
                id="address"
                placeholder="Address"
              />
              {/* <span className="text-sm text-red-500 mt-1">Error</span> */}
            </div>

            {/* Action buttons */}
            <div className="col-span-2 flex justify-between mt-6">
              <Button
                className="bg-blue-500"
                type="submit"
                disabled={isLoading}
              >
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
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Createpage;
