import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { validateForm, estimateSchema } from '@/lib/validation';

export default function Create({ inquiry }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        inquiry_id: inquiry.id,
        discount: '',
        accessories_cost: '',
        insurance: '',
        rto_charges: '',
    });

    const onRoadPrice = parseFloat(inquiry.model?.on_road_price) || 0;
    const discount = parseFloat(data.discount) || 0;
    const accessories = parseFloat(data.accessories_cost) || 0;
    const insurance = parseFloat(data.insurance) || 0;
    const rto = parseFloat(data.rto_charges) || 0;

    const totalPayable = Math.max(0, onRoadPrice - discount + accessories + insurance + rto);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validateForm(estimateSchema, data, setError, clearErrors)) {
            return;
        }
        post(route('estimates.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Generate Estimate" />

            {/* Header */}
            <div className="mb-6 flex items-center space-x-3">
                <Link 
                    href={route('inquiries.show', inquiry.id)} 
                    className="p-2 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center justify-center"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Generate Estimate</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">For inquiry: {inquiry.customer_name}</p>
                </div>
            </div>

            {/* Interactive Builder Container */}
            <Card>
                <CardContent className="p-5">
                    
                    {/* Summary Info Box */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-xl mb-5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-2">Selected Car Specs</span>
                        <div className="flex justify-between items-center mb-1 font-bold text-slate-800 dark:text-slate-100">
                            <span>{inquiry.brand?.name} - {inquiry.model?.name}</span>
                            <span>{formatCurrency(onRoadPrice)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 dark:text-slate-400">
                            <span>Variant: {inquiry.model?.variant}</span>
                            <span>Fuel: {inquiry.model?.fuel_type} | {inquiry.model?.transmission}</span>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Base On-Road Price (Read Only) */}
                        <div>
                            <Label>Base On-Road Price (₹)</Label>
                            <Input 
                                type="text" 
                                readOnly 
                                value={formatCurrency(onRoadPrice)}
                                className="bg-slate-50 dark:bg-slate-950/60 font-bold text-slate-600 dark:text-slate-350 cursor-default shadow-inner"
                            />
                        </div>

                        {/* Discount */}
                        <div>
                            <Label htmlFor="discount">Discounts / Offers (₹)</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                min="0" 
                                id="discount" 
                                value={data.discount}
                                onChange={(e) => setData('discount', e.target.value)}
                                placeholder="e.g. 500"
                            />
                            {errors.discount && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.discount}</div>}
                        </div>

                        {/* Accessories */}
                        <div>
                            <Label htmlFor="accessories_cost">Accessories Cost (₹)</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                min="0" 
                                id="accessories_cost" 
                                value={data.accessories_cost}
                                onChange={(e) => setData('accessories_cost', e.target.value)}
                                placeholder="e.g. 1200"
                            />
                            {errors.accessories_cost && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.accessories_cost}</div>}
                        </div>

                        {/* Insurance */}
                        <div>
                            <Label htmlFor="insurance">Insurance Premium (₹)</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                min="0" 
                                id="insurance" 
                                value={data.insurance}
                                onChange={(e) => setData('insurance', e.target.value)}
                                placeholder="e.g. 950"
                            />
                            {errors.insurance && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.insurance}</div>}
                        </div>

                        {/* RTO Charges */}
                        <div>
                            <Label htmlFor="rto_charges">RTO / Registration Charges (₹)</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                min="0" 
                                id="rto_charges" 
                                value={data.rto_charges}
                                onChange={(e) => setData('rto_charges', e.target.value)}
                                placeholder="e.g. 600"
                            />
                            {errors.rto_charges && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.rto_charges}</div>}
                        </div>

                        {/* Real-Time Total Amount Display */}
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 rounded-xl flex justify-between items-center shadow-sm">
                            <div>
                                <span className="block text-[10px] text-indigo-650 dark:text-indigo-400 font-semibold uppercase tracking-wider">Total Amount Payable</span>
                                <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">Calculated in real-time</span>
                            </div>
                            <span className="text-xl font-black text-indigo-650 dark:text-indigo-400">
                                {formatCurrency(totalPayable)}
                            </span>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={processing}
                            >
                                Generate Estimate
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
