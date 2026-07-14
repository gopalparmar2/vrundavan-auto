import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { validateForm, inquirySchema } from '@/lib/validation';

export default function Create({ brands }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        customer_name: '',
        phone: '',
        email: '',
        brand_id: '',
        model_id: '',
        source: 'walk-in',
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
        fetch(route('api.brands.models', data.brand_id))
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
            <Head title="Create Inquiry" />

            {/* Header */}
            <div className="mb-6 flex items-center space-x-3">
                <Link 
                    href={route('inquiries.index')} 
                    className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 shadow-sm text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-slate-100 tracking-tight">Create Inquiry</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Register a new customer lead</p>
                </div>
            </div>

            {/* Form Container */}
            <Card>
                <CardContent className="p-5">
                    <form onSubmit={submit} className="space-y-4">
                        {/* Customer Name */}
                        <div>
                            <Label htmlFor="customer_name" required>Customer Name</Label>
                            <Input 
                                type="text" 
                                id="customer_name" 
                                value={data.customer_name}
                                onChange={(e) => setData('customer_name', e.target.value)}
                                placeholder="e.g. John Doe" 
                            />
                            {errors.customer_name && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.customer_name}</div>}
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
                            />
                            {errors.phone && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.phone}</div>}
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
                            />
                            {errors.email && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.email}</div>}
                        </div>

                        {/* Brand Selection */}
                        <div>
                            <Label htmlFor="brand_id" required>Interested Brand</Label>
                            <Select 
                                id="brand_id" 
                                value={data.brand_id}
                                onChange={handleBrandChange}
                            >
                                <option value="">Select Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </Select>
                            {errors.brand_id && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.brand_id}</div>}
                        </div>

                        {/* Model Selection */}
                        <div>
                            <Label htmlFor="model_id" required>Interested Model</Label>
                            <Select 
                                id="model_id" 
                                value={data.model_id}
                                onChange={(e) => setData('model_id', e.target.value)}
                                disabled={loadingModels || models.length === 0}
                            >
                                <option value="">Select Model</option>
                                {models.map((model) => (
                                    <option key={model.id} value={model.id}>
                                        {model.name} ({model.variant}) - {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(model.on_road_price)}
                                    </option>
                                ))}
                            </Select>
                            {errors.model_id && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.model_id}</div>}
                        </div>

                        {/* Lead Source */}
                        <div>
                            <Label htmlFor="source" required>Inquiry Source</Label>
                            <Select 
                                id="source" 
                                value={data.source}
                                onChange={(e) => setData('source', e.target.value)}
                            >
                                <option value="walk-in">Walk-In</option>
                                <option value="phone">Phone</option>
                                <option value="online">Online</option>
                            </Select>
                            {errors.source && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.source}</div>}
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
                            />
                            {errors.notes && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.notes}</div>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={processing}
                            >
                                Register Lead
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
