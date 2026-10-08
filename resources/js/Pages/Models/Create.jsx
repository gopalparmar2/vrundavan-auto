import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
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
            <Head title="Add Vehicle Model" />

            <div className="w-full">
                {/* Header */}
                <div className="mb-6 flex items-center space-x-3">
                    <Link 
                        href={route('models.index')} 
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center justify-center"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Add New Vehicle Model</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Register vehicle model specifications and showroom pricing</p>
                    </div>
                </div>

                {/* Form Container */}
                <Card className="rounded-3xl border-slate-200 dark:border-slate-800 shadow-xs">
                    <CardContent className="p-6 sm:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Grid 1: Brand & Model Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="brand_id" required>Manufacturer Brand</Label>
                                    <Select 
                                        id="brand_id" 
                                        value={data.brand_id}
                                        onChange={(e) => setData('brand_id', e.target.value)}
                                        className="mt-1"
                                    >
                                        <option value="">Select Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </Select>
                                    {errors.brand_id && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.brand_id}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="name" required>Model Name</Label>
                                    <Input 
                                        type="text" 
                                        id="name" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. Fortuner" 
                                        className="mt-1"
                                    />
                                    {errors.name && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.name}</div>}
                                </div>
                            </div>

                            {/* Grid 2: Variant & Transmission */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="variant" required>Variant / Trim Name</Label>
                                    <Input 
                                        type="text" 
                                        id="variant" 
                                        value={data.variant}
                                        onChange={(e) => setData('variant', e.target.value)}
                                        placeholder="e.g. 2.8 4x4 AT" 
                                        className="mt-1"
                                    />
                                    {errors.variant && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.variant}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="transmission" required>Transmission</Label>
                                    <Select 
                                        id="transmission" 
                                        value={data.transmission}
                                        onChange={(e) => setData('transmission', e.target.value)}
                                        className="mt-1"
                                    >
                                        <option value="">Select Transmission</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                    </Select>
                                    {errors.transmission && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.transmission}</div>}
                                </div>
                            </div>

                            {/* Grid 3: Fuel Type & On-Road Price */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="fuel_type" required>Fuel Type</Label>
                                    <Select 
                                        id="fuel_type" 
                                        value={data.fuel_type}
                                        onChange={(e) => setData('fuel_type', e.target.value)}
                                        className="mt-1"
                                    >
                                        <option value="">Select Fuel Type</option>
                                        {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map((fuel) => (
                                            <option key={fuel} value={fuel}>{fuel}</option>
                                        ))}
                                    </Select>
                                    {errors.fuel_type && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.fuel_type}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="on_road_price" required>On-Road Price (₹)</Label>
                                    <Input 
                                        type="number" 
                                        step="0.01" 
                                        id="on_road_price" 
                                        value={data.on_road_price}
                                        onChange={(e) => setData('on_road_price', e.target.value)}
                                        placeholder="e.g. 4500000" 
                                        className="mt-1"
                                    />
                                    {errors.on_road_price && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.on_road_price}</div>}
                                </div>
                            </div>

                            {/* Grid 4: Ex-Showroom Price */}
                            <div>
                                <Label htmlFor="ex_showroom_price">Ex-Showroom Price (₹ - Optional)</Label>
                                <Input 
                                    type="number" 
                                    step="0.01" 
                                    id="ex_showroom_price" 
                                    value={data.ex_showroom_price}
                                    onChange={(e) => setData('ex_showroom_price', e.target.value)}
                                    placeholder="e.g. 3800000"
                                    className="mt-1"
                                />
                                {errors.ex_showroom_price && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.ex_showroom_price}</div>}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <Label>Vehicle Model Image (Optional)</Label>
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 dark:border-slate-800 border-dashed rounded-2xl hover:border-indigo-500 transition-colors relative">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
                                        <div className="flex text-xs text-slate-500 dark:text-slate-400 justify-center">
                                            <label htmlFor="image" className="relative cursor-pointer rounded-md font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none">
                                                <span>{data.image ? data.image.name : 'Upload vehicle photo'}</span>
                                                <input 
                                                    id="image" 
                                                    type="file" 
                                                    className="sr-only" 
                                                    onChange={(e) => setData('image', e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-[10px] text-slate-400">PNG, JPG or WebP up to 2MB</p>
                                    </div>
                                </div>
                                {errors.image && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.image}</div>}
                            </div>

                            {/* Action Footer: Proper Submit and Cancel buttons */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end space-x-3">
                                <Link 
                                    href={route('models.index')} 
                                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
                                >
                                    Cancel
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center space-x-2 min-w-[120px] justify-center"
                                >
                                    {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>{processing ? 'Saving...' : 'Save Model'}</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
