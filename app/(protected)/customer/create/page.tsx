"use client";
import React from "react";

function AddCustomer() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-sky-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-black-800 text-center mb-8">
          Add New Customer
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-lg font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-lg font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-lg font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-lg font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;
