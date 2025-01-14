"use client"

import React, { useState } from 'react';
import PageWrapper from '@/components/page-wrapper';
import { Button } from "@/components/ui/button";


 const Createpage = () => {
    const [firstName, serfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{

    }
    // return (
    //     <PageWrapper>
    //       <div className="space-y-6">
    //         <h1 className="text-3xl font-bold">Add customer</h1>

    //         <form onSubmit = {handleSubmit}>
    //         <div className="grid grid-cols-2">
    //           <div className="flex flex-col">
    //             <label htmlFor="firstName">FirstName</label>
    //             <input
    //               className="border p-1"
    //               type="text"
    //               name="firstName"
    //               id="firstName"
    //               placeholder="FirstName"
    //             />
    //             <span>Error</span>
    //           </div>
              

    //           <div className="flex flex-col">
    //             <label htmlFor="lastName">LastName</label>
    //             <input
    //               className="border p-1"
    //               type="text"
    //               name="lastName"
    //               id="lastName"
    //               placeholder="LastName"
    //             />
    //             <span>Error</span>
    //           </div>


    //           <div className="flex flex-col">
    //             <label htmlFor="email">Email</label>
    //             <input
    //               className="border p-1"
    //               type="text"
    //               name="email"
    //               id="email"
    //               placeholder="Email"
    //             />
    //             <span>Error</span>
    //           </div>


    //           <div className="flex flex-col">
    //             <label htmlFor="phone">Phone</label>
    //             <input
    //               className="border p-1"
    //               type="text"
    //               name="phone"
    //               id="phone"
    //               placeholder="Phone"
    //             />
    //             <span>Error</span>
    //           </div>


    //           <div className="flex flex-col">
    //             <label htmlFor="address">Address</label>
    //             <input
    //               className="border p-1"
    //               type="text"
    //               name="adress"
    //               id="address"
    //               placeholder="Adress"
    //             />
    //             <span>Error</span>
    //           </div>
              
              
              
    //           <div>
    //           <Button className="bg-blue-500">Save</Button>
    //           <Button className="bg-blue-500">Cancel</Button> 
    //           </div>

    //         </div>
    //         </form>
    //       </div>
    //     </PageWrapper>
    //   );
    // };

    return (
        <PageWrapper>
          <div className="space-y-6 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Add Customer</h1>
    
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* First Name  */}
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="text-lg font-medium text-gray-700">First Name</label>
                  <input
                    className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                  />
                  <span className="text-sm text-red-500 mt-1">Error</span>
                </div>
    
                {/* Last Name */}
                <div className="flex flex-col">
                  <label htmlFor="lastName" className="text-lg font-medium text-gray-700">Last Name</label>
                  <input
                    className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                  />
                  <span className="text-sm text-red-500 mt-1">Error</span>
                </div>
    
                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
                  <input
                    className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                  <span className="text-sm text-red-500 mt-1">Error</span>
                </div>
    
                {/* Phone */}
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-lg font-medium text-gray-700">Phone</label>
                  <input
                    className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                  />
                  <span className="text-sm text-red-500 mt-1">Error</span>
                </div>
    
                {/* Address */}
                <div className="flex flex-col">
                  <label htmlFor="address" className="text-lg font-medium text-gray-700">Address</label>
                  <input
                    className="border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                  />
                  <span className="text-sm text-red-500 mt-1">Error</span>
                </div>
    
                {/* Action buttons */}
                <div className="col-span-2 flex justify-between mt-6">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-200">
                    Save
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-200">
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
