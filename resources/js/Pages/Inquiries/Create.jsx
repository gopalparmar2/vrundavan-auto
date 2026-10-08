import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { validateForm, inquirySchema } from '@/lib/validation';

export default function Create({ brands }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        customer_name: '',
        phone: '',
        email: '',
        brand_id: '',
        model_id: '',
        source: '',
        notes: '',
    });

    const [models, setModels] = useState([]);
    const [loadingModels, setLoadingModels] = useState(false);

    // Fetch models of selected brand
    useEffect(() => {
        if (!data.brand_id) {
            setModels([]);
            return;
        }

        setLoadingModels(true);
        fetch(route('brands.models', data.brand_id))
            .then((res) => res.json())
            .then((data) => {
                setModels(data);
                setLoadingModels(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingModels(false);
            });
    }, [data.brand_id]);

    const handleBrandChange = (e) => {
        setData((prev) => ({
            ...prev,
            brand_id: e.target.value,
            model_id: '', // Reset model selection when brand changes
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validateForm(inquirySchema, data, setError, clearErrors)) {
            return;
        }
        post(route('inquiries.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Register Lead" />

            <div className="w-full">
                {/* Header */}
                <div className="mb-6 flex items-center space-x-3">
                    <Link 
                        href={route('inquiries.index')} 
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center justify-center"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Register New Lead</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Capture customer inquiry and interest specifications</p>
                    </div>
                </div>

                {/* Form Container */}
                <Card className="rounded-3xl border-slate-200 dark:border-slate-800 shadow-xs">
                    <CardContent className="p-6 sm:p-8">
                        <form onSubmit={submit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Customer Name */}
                                <div>
                                    <Label htmlFor="customer_name" required>Customer Name</Label>
                                    <Input 
                                        type="text" 
                                        id="customer_name" 
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                        placeholder="e.g. John Doe" 
                                        className="mt-1"
                                    />
                                    {errors.customer_name && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.customer_name}</div>}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <Label htmlFor="phone" required>Phone Number</Label>
                                    <Input 
                                        type="tel" 
                                        id="phone" 
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="e.g. +1 555-0199" 
                                        className="mt-1"
                                    />
                                    {errors.phone && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.phone}</div>}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <Label htmlFor="email">Email Address (Optional)</Label>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="e.g. john@example.com"
                                    className="mt-1"
                                />
                                {errors.email && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.email}</div>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Brand Selection */}
                                <div>
                                    <Label htmlFor="brand_id" required>Interested Brand</Label>
                                    <Select 
                                        id="brand_id" 
                                        value={data.brand_id}
                                        onChange={handleBrandChange}
                                        className="mt-1"
                                    >
                                        <option value="">Select Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </Select>
                                    {errors.brand_id && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.brand_id}</div>}
                                </div>

                                {/* Model Selection */}
                                <div>
                                    <Label htmlFor="model_id" required>Interested Model</Label>
                                    <Select 
                                        id="model_id" 
                                        value={data.model_id}
                                        onChange={(e) => setData('model_id', e.target.value)}
                                        disabled={loadingModels || !data.brand_id || models.length === 0}
                                        className="mt-1"
                                    >
                                        <option value="">
                                            {loadingModels ? 'Loading models...' : !data.brand_id ? 'Select Brand first' : models.length === 0 ? 'No models available' : 'Select Model'}
                                        </option>
                                        {models.map((model) => (
                                            <option key={model.id} value={model.id}>
                                                {model.name} ({model.variant}) - {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(model.on_road_price)}
                                            </option>
                                        ))}
                                    </Select>
                                    {errors.model_id && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.model_id}</div>}
                                </div>
                            </div>

                            {/* Lead Source */}
                            <div>
                                <Label htmlFor="source" required>Inquiry Source</Label>
                                <Select 
                                    id="source" 
                                    value={data.source}
                                    onChange={(e) => setData('source', e.target.value)}
                                    className="mt-1"
                                >
                                    <option value="">Select Source</option>
                                    <option value="walk-in">Walk-In</option>
                                    <option value="phone">Phone</option>
                                    <option value="online">Online</option>
                                </Select>
                                {errors.source && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.source}</div>}
                            </div>

                            {/* Notes */}
                            <div>
                                <Label htmlFor="notes">Inquiry Notes</Label>
                                <Textarea 
                                    id="notes" 
                                    rows="4" 
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Mention customer preferences, trade-in interest, etc..."
                                    className="mt-1"
                                />
                                {errors.notes && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.notes}</div>}
                            </div>

                            {/* Action Footer: Proper Submit and Cancel buttons */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end space-x-3">
                                <Link
                                    href={route('inquiries.index')}
                                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
                                >
                                    Cancel
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center space-x-2 min-w-[130px] justify-center"
                                >
                                    {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>{processing ? 'Registering...' : 'Register Lead'}</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
