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

export default function Edit({ model, brands }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        brand_id: model.brand_id || '',
        name: model.name || '',
        variant: model.variant || '',
        on_road_price: model.on_road_price || '',
        ex_showroom_price: model.ex_showroom_price || '',
        fuel_type: model.fuel_type || '',
        transmission: model.transmission || '',
        image: null,
        _method: 'PATCH', // Spoofing PATCH for file upload support in PHP multipart forms
    });

    const submit = (e) => {
        e.preventDefault();
        if (!validateForm(modelSchema, data, setError, clearErrors)) {
            return;
        }
        post(route('models.update', model.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Model" />

            {/* Header */}
            <div className="mb-6 flex items-center space-x-3">
                <Link 
                    href={route('models.index')} 
                    className="p-2 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Edit Model</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Modify vehicle model details</p>
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
                            />
                            {errors.variant && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.variant}</div>}
                        </div>

                        {/* On-Road Price */}
                        <div>
                            <Label htmlFor="on_road_price" required>On-Road Price ($)</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                id="on_road_price" 
                                value={data.on_road_price}
                                onChange={(e) => setData('on_road_price', e.target.value)}
                            />
                            {errors.on_road_price && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.on_road_price}</div>}
                        </div>

                        {/* Ex-Showroom Price */}
                        <div>
                            <Label htmlFor="ex_showroom_price">Ex-Showroom Price ($ - Optional)</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                id="ex_showroom_price" 
                                value={data.ex_showroom_price}
                                onChange={(e) => setData('ex_showroom_price', e.target.value)}
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

                        {/* Current Image Preview */}
                        {model.image && (
                            <div>
                                <Label>Current Image</Label>
                                <div className="w-24 h-24 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                                    <img src={`/storage/${model.image}`} alt={model.name} className="object-cover w-full h-full" />
                                </div>
                            </div>
                        )}

                        {/* Image Upload */}
                        <div>
                            <Label>Replace Model Image (Optional)</Label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-xl hover:border-indigo-400 transition-colors relative">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-8 w-8 text-slate-400" />
                                    <div className="flex text-xs text-slate-600 justify-center">
                                        <label htmlFor="image" className="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                            <span>{data.image ? data.image.name : 'Upload new image'}</span>
                                            <input 
                                                id="image" 
                                                type="file" 
                                                className="sr-only" 
                                                onChange={(e) => setData('image', e.target.files[0])}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-[10px] text-slate-400">PNG, JPG up to 2MB</p>
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
                                Update Model
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
