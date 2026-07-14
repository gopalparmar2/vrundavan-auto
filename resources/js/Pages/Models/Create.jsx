import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { ArrowLeft, Upload } from 'lucide-react';
import { validateForm, modelSchema } from '@/lib/validation';

export default function Create({ brands }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        brand_id: '',
        name: '',
        variant: '',
        on_road_price: '',
        ex_showroom_price: '',
        fuel_type: '',
        transmission: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (!validateForm(modelSchema, data, setError, clearErrors)) {
            return;
        }
        post(route('models.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Model" />

            {/* Header */}
            <div className="mb-6 flex items-center space-x-3">
                <Link 
                    href={route('models.index')} 
                    className="p-2 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center justify-center"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Add Model</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Register new vehicle model details</p>
                </div>
            </div>

            {/* Form Container */}
            <Card>
                <CardContent className="p-5">
                    <form onSubmit={submit} className="space-y-4">
                        {/* Brand */}
                        <div>
                            <Label htmlFor="brand_id" required>Brand</Label>
                            <Select 
                                id="brand_id" 
                                value={data.brand_id}
                                onChange={(e) => setData('brand_id', e.target.value)}
                            >
                                <option value="">Select Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </Select>
                            {errors.brand_id && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.brand_id}</div>}
                        </div>

                        {/* Model Name */}
                        <div>
                            <Label htmlFor="name" required>Model Name</Label>
                            <Input 
                                type="text" 
                                id="name" 
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Model Y" 
                            />
                            {errors.name && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.name}</div>}
                        </div>

                        {/* Variant */}
                        <div>
                            <Label htmlFor="variant" required>Variant</Label>
                            <Input 
                                type="text" 
                                id="variant" 
                                value={data.variant}
                                onChange={(e) => setData('variant', e.target.value)}
                                placeholder="e.g. Long Range AWD" 
                            />
                            {errors.variant && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.variant}</div>}
                        </div>

                        {/* On-Road Price */}
                        <div>
                            <Label htmlFor="on_road_price" required>On-Road Price (₹)</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                id="on_road_price" 
                                value={data.on_road_price}
                                onChange={(e) => setData('on_road_price', e.target.value)}
                                placeholder="e.g. 54000" 
                            />
                            {errors.on_road_price && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.on_road_price}</div>}
                        </div>

                        {/* Ex-Showroom Price */}
                        <div>
                            <Label htmlFor="ex_showroom_price">Ex-Showroom Price (₹ - Optional)</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                id="ex_showroom_price" 
                                value={data.ex_showroom_price}
                                onChange={(e) => setData('ex_showroom_price', e.target.value)}
                                placeholder="e.g. 48000"
                            />
                            {errors.ex_showroom_price && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.ex_showroom_price}</div>}
                        </div>

                        {/* Fuel Type */}
                        <div>
                            <Label htmlFor="fuel_type" required>Fuel Type</Label>
                            <Select 
                                id="fuel_type" 
                                value={data.fuel_type}
                                onChange={(e) => setData('fuel_type', e.target.value)}
                            >
                                <option value="">Select Fuel Type</option>
                                {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map((fuel) => (
                                    <option key={fuel} value={fuel}>{fuel}</option>
                                ))}
                            </Select>
                            {errors.fuel_type && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.fuel_type}</div>}
                        </div>

                        {/* Transmission */}
                        <div>
                            <Label htmlFor="transmission" required>Transmission</Label>
                            <Select 
                                id="transmission" 
                                value={data.transmission}
                                onChange={(e) => setData('transmission', e.target.value)}
                            >
                                <option value="">Select Transmission</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </Select>
                            {errors.transmission && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.transmission}</div>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <Label>Model Image (Optional)</Label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 dark:border-slate-800 border-dashed rounded-xl hover:border-indigo-500 transition-colors relative">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
                                    <div className="flex text-xs text-slate-500 dark:text-slate-400 justify-center">
                                        <label htmlFor="image" className="relative cursor-pointer rounded-md font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none">
                                            <span>{data.image ? data.image.name : 'Upload image'}</span>
                                            <input 
                                                id="image" 
                                                type="file" 
                                                className="sr-only" 
                                                onChange={(e) => setData('image', e.target.files[0])}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-555">PNG, JPG up to 2MB</p>
                                </div>
                            </div>
                            {errors.image && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.image}</div>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={processing}
                            >
                                Save Model
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
