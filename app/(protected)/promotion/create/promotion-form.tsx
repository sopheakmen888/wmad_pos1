"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import FormPage from "@/components/form-input";
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react';
import axios from 'axios';

interface InputData {
    promotionCode: string;
    description: string;
    startDate: string;
    endDate: string;
    discountPercentage: string;
    imageUrl: File | null;
}

interface Props {
    title: string;
}

export const PromotionForm: React.FC<Props> = ({ title }) => {
    const [formData, setFormData] = useState<InputData>({
        promotionCode: '',
        description: '',
        startDate: '',
        endDate: '',
        discountPercentage: '',
        imageUrl: null,
    });

    console.log(formData)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, files } = e.target;

        if (type === 'file' && files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0], // Store the first file for `imageUrl`
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = {
                ...formData,
                imageUrl: formData.imageUrl ? formData.imageUrl.name : null, // Only include the name of the file
            };

            console.log('Payload:', payload);

            const response = await axios.post('/api/promotion', payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleReset = () => {
        setFormData({
            promotionCode: '',
            description: '',
            startDate: '',
            endDate: '',
            discountPercentage: '',
            imageUrl: null,
        });
    };

    return (
        <div>
            <div className="space-y-6 p-5">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="rounded-md border flex justify-center p-5 items-center">
                    <div className="w-full rounded-md  p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col justify-center place-items-center">
                                <div className='space-y-6'>
                                <div>
                                    <FormPage
                                        label="Promotion code"
                                        type="text"
                                        id="promotionCode"
                                        name="promotionCode"
                                        value={formData.promotionCode}
                                        onChange={handleChange}
                                        placeholder="Promotion code"
                                    />
                                </div>
                                <div>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                        className='border border-slate-500'
                                    />
                                </div>
                                <div>
                                    <FormPage
                                        label="Start date"
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <FormPage
                                        label=""
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <FormPage
                                        label="Discount percentage"
                                        type="number"
                                        id="discountPercentage"
                                        name="discountPercentage"
                                        value={formData.discountPercentage}
                                        onChange={handleChange}
                                        placeholder="Percentage %"
                                    />
                                </div>
                                <div>
                                    <FormPage
                                        label="Upload image"
                                        type="file"
                                        id="imageUrl"
                                        name="imageUrl"
                                        value=''
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex gap-5 mt-4">
                                    <Button
                                        type="button"
                                        onClick={handleReset}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Submit
                                    </Button>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

