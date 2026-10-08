import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { ArrowLeft, Loader2, Calculator } from 'lucide-react';
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

            <div className="w-full">
                {/* Header */}
                <div className="mb-6 flex items-center space-x-3">
                    <Link 
                        href={route('inquiries.show', inquiry.id)} 
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center justify-center"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Generate Quotation / Estimate</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Custom pricing details for {inquiry.customer_name}</p>
                    </div>
                </div>

                {/* Interactive Builder Container */}
                <Card className="rounded-3xl border-slate-200 dark:border-slate-800 shadow-xs">
                    <CardContent className="p-6 sm:p-8">
                        {/* Summary Info Box */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl mb-6 text-xs text-slate-500 dark:text-slate-400">
                            <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-2">Selected Vehicle Specs</span>
                            <div className="flex justify-between items-center mb-1 font-bold text-slate-800 dark:text-slate-100 text-sm">
                                <span>{inquiry.brand?.name} - {inquiry.model?.name}</span>
                                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{formatCurrency(onRoadPrice)}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 dark:text-slate-400 text-xs">
                                <span>Variant: {inquiry.model?.variant}</span>
                                <span>Fuel: {inquiry.model?.fuel_type} | {inquiry.model?.transmission}</span>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Base On-Road Price (Read Only) */}
                            <div>
                                <Label>Base On-Road Price (₹)</Label>
                                <Input 
                                    type="text" 
                                    readOnly 
                                    value={formatCurrency(onRoadPrice)}
                                    className="mt-1 bg-slate-50 dark:bg-slate-950/60 font-bold text-slate-700 dark:text-slate-300 cursor-default"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        placeholder="e.g. 50000"
                                        className="mt-1"
                                    />
                                    {errors.discount && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.discount}</div>}
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
                                        placeholder="e.g. 15000"
                                        className="mt-1"
                                    />
                                    {errors.accessories_cost && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.accessories_cost}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        placeholder="e.g. 45000"
                                        className="mt-1"
                                    />
                                    {errors.insurance && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.insurance}</div>}
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
                                        placeholder="e.g. 25000"
                                        className="mt-1"
                                    />
                                    {errors.rto_charges && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.rto_charges}</div>}
                                </div>
                            </div>

                            {/* Real-Time Total Amount Display */}
                            <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/40 rounded-2xl flex justify-between items-center shadow-xs">
                                <div>
                                    <span className="block text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">Total Payable Amount</span>
                                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Calculated in real-time</span>
                                </div>
                                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                    {formatCurrency(totalPayable)}
                                </span>
                            </div>

                            {/* Action Footer: Proper Submit and Cancel buttons */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end space-x-3">
                                <Link
                                    href={route('inquiries.show', inquiry.id)}
                                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
                                >
                                    Cancel
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center space-x-2 min-w-[150px] justify-center"
                                >
                                    {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>{processing ? 'Generating...' : 'Generate Estimate'}</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
