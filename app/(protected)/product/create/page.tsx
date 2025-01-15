"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
    nameEn: string;
    nameKh?: string;
    categoryId: string;
    sku?: string;
    address?: string;
    createdBy: number;
    updatedBy: number;
}

interface Errors {
    nameEn?: string;
    nameKh?: string;
    categoryId?: string;
    sku?: string;
}

const AddCustomer: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nameEn: '',
        nameKh: '',
        categoryId: '',
        sku: '',
        address: '',
        createdBy: 1, // Example user ID
        updatedBy: 1,
    });
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = (): Errors => {
        const errors: Errors = {};
        if (!formData.nameEn) errors.nameEn = 'Name (English) is required.';
        if (!formData.categoryId) errors.categoryId = 'Category ID is required.';
        if (formData.sku && (formData.sku.length < 9 || formData.sku.length > 10 || isNaN(Number(formData.sku)))) {
            errors.sku = 'SKU must be 9-10 digits.';
        }
        return errors;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('No token found');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/product', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Form submitted successfully:', response.data);
            setSubmitSuccess(true);
            setErrors({});
        } catch (error: any) {
            console.error('Error:', error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
                <h1 className="text-3xl font-semibold mb-8 text-center">Add New Customer</h1>

                {['nameEn', 'nameKh', 'categoryId', 'sku', 'address'].map((field) => (
                    <div key={field} className="mb-6">
                        <label htmlFor={field} className="block text-lg font-medium capitalize">
                            {field}
                        </label>
                        <input
                            type={field === 'sku' ? 'number' : 'text'}
                            name={field}
                            id={field}
                            value={formData[field as keyof FormData] || ''}
                            onChange={handleChange}
                            placeholder={`Enter your ${field}`}
                            className={`mt-2 block w-full px-4 py-3 rounded-md border ${
                                errors[field as keyof Errors] ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
                        />
                        {errors[field as keyof Errors] && (
                            <p className="text-red-500 text-sm mt-1">{errors[field as keyof Errors]}</p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>

                {submitSuccess && <p className="text-green-500 text-lg mt-4 text-center">Customer added successfully!</p>}
            </form>
        </div>
    );
};

export default AddCustomer;
