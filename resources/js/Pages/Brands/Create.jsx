import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { ArrowLeft, Upload } from 'lucide-react';
import { validateForm, brandSchema } from '@/lib/validation';

export default function Create() {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        name: '',
        logo: null,
        status: 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        if (!validateForm(brandSchema, data, setError, clearErrors)) {
            return;
        }
        post(route('brands.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Brand" />

            {/* Header */}
            <div className="mb-6 flex items-center space-x-3">
                <Link 
                    href={route('brands.index')} 
                    className="p-2 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Add Brand</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Register a new manufacturer</p>
                </div>
            </div>

            {/* Form Container */}
            <Card>
                <CardContent className="p-5">
                    <form onSubmit={submit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name" required>Brand Name</Label>
                            <Input 
                                type="text" 
                                id="name" 
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Toyota" 
                            />
                            {errors.name && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.name}</div>}
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <Label>Logo (Optional)</Label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-xl hover:border-indigo-400 transition-colors relative">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-8 w-8 text-slate-400" />
                                    <div className="flex text-xs text-slate-600 justify-center">
                                        <label htmlFor="logo" className="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                            <span>{data.logo ? data.logo.name : 'Upload logo'}</span>
                                            <input 
                                                id="logo" 
                                                type="file" 
                                                className="sr-only" 
                                                onChange={(e) => setData('logo', e.target.files[0])}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-[10px] text-slate-400">PNG, JPG up to 2MB</p>
                                </div>
                            </div>
                            {errors.logo && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.logo}</div>}
                        </div>

                        {/* Status */}
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select 
                                id="status" 
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Select>
                            {errors.status && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.status}</div>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={processing}
                            >
                                Save Brand
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
