import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Select } from '@/Components/ui/select';
import { ArrowLeft, Download, Pencil, FileText, UserCheck, Calendar, Phone, Mail, Car, Tag } from 'lucide-react';
import { validateForm, inquiryStatusSchema } from '@/lib/validation';

export default function Show({ inquiry }) {
    const { data, setData, patch, processing, errors, setError, clearErrors } = useForm({
        status: inquiry.status || 'New',
    });

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        if (!validateForm(inquiryStatusSchema, data, setError, clearErrors)) {
            return;
        }
        patch(route('inquiries.status.update', inquiry.id));
    };

    const statusColors = {
        'New': 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
        'Contacted': 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30',
        'Estimate Sent': 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
        'Negotiation': 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30',
        'Converted': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30',
        'Lost': 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30',
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + 
               date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Lead: ${inquiry.customer_name}`} />

            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center space-x-3">
                    <Link 
                        href={route('inquiries.index')} 
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center justify-center"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{inquiry.customer_name}</h2>
                            <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${statusColors[inquiry.status] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'} uppercase tracking-wider`}>
                                {inquiry.status}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Customer lead inquiry breakdown & estimate history</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Link 
                        href={route('inquiries.edit', inquiry.id)} 
                        className="py-2.5 px-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit Lead Info</span>
                    </Link>

                    {inquiry.estimate ? (
                        <a 
                            href={route('estimates.download', inquiry.estimate.id)} 
                            className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download Estimate</span>
                        </a>
                    ) : (
                        <Link 
                            href={route('estimates.create', inquiry.id)} 
                            className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
                        >
                            <FileText className="w-4 h-4" />
                            <span>Generate Estimate</span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Desktop 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (2 Cols): Customer Profile & Vehicle Estimate */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Profile Card */}
                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Customer Contact Information</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Phone Number</span>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5 block">{inquiry.phone}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Address</span>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5 block">{inquiry.email || 'Not Provided'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Interest Section */}
                        <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Vehicle Interest Details</h4>
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{inquiry.brand?.name} — {inquiry.model?.name}</span>
                                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">({inquiry.model?.variant})</span>
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                                        Fuel: <strong className="text-slate-700 dark:text-slate-200">{inquiry.model?.fuel_type}</strong> | Transmission: <strong className="text-slate-700 dark:text-slate-200">{inquiry.model?.transmission}</strong>
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Catalog Price</span>
                                    <span className="text-base font-extrabold text-slate-800 dark:text-slate-100 mt-0.5 block">{formatCurrency(inquiry.model?.on_road_price)}</span>
                                </div>
                            </div>
                        </div>

                        {inquiry.notes && (
                            <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Customer Requirements & Notes</h4>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    {inquiry.notes}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Estimate Breakdown Card */}
                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Financial Price Estimate</h3>
                            {inquiry.estimate && (
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/40">
                                    Estimate Active
                                </span>
                            )}
                        </div>

                        {inquiry.estimate ? (
                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                    <span>Base On-Road Price:</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(inquiry.estimate.on_road_price)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                    <span>Special Showroom Discount:</span>
                                    <span className="font-bold text-rose-500">-{formatCurrency(inquiry.estimate.discount)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                    <span>Added Accessories:</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">+{formatCurrency(inquiry.estimate.accessories_cost)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                    <span>Vehicle Insurance:</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">+{formatCurrency(inquiry.estimate.insurance)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                    <span>RTO & Registration Charges:</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">+{formatCurrency(inquiry.estimate.rto_charges)}</span>
                                </div>
                                <div className="flex justify-between pt-3 text-base font-extrabold text-slate-800 dark:text-slate-100">
                                    <span>Total Payable Amount:</span>
                                    <span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(inquiry.estimate.total_amount)}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                <p className="text-xs text-slate-500 dark:text-slate-400">No quotation estimate has been generated for this customer lead yet.</p>
                                <Link 
                                    href={route('estimates.create', inquiry.id)} 
                                    className="mt-4 inline-flex items-center space-x-2 py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>Generate Price Estimate</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column (1 Col): Update Status & Timeline Log */}
                <div className="space-y-6">
                    {/* Status Update Form Card */}
                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Update Pipeline Status</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Advance customer progress through deal stages</p>

                        <form onSubmit={handleStatusUpdate} className="space-y-4">
                            <div>
                                <Select 
                                    value={data.status} 
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full text-xs py-2.5 rounded-xl border-slate-200 dark:border-slate-800"
                                >
                                    {['New', 'Contacted', 'Estimate Sent', 'Negotiation', 'Converted', 'Lost'].map((st) => (
                                        <option key={st} value={st}>{st}</option>
                                    ))}
                                </Select>
                                {errors.status && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.status}</div>}
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
                            >
                                Update Lead Status
                            </Button>
                        </form>
                    </div>

                    {/* Activity Timeline Card */}
                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Lead Activity Timeline</h3>
                        
                        <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-6">
                            {(() => {
                                const logs = inquiry.status_logs || inquiry.statusLogs || [];
                                return logs.map((log) => (
                                    <div key={log.id} className="relative">
                                        <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900 shadow-md"></div>
                                        
                                        <div className="text-xs">
                                            <span className="font-bold text-slate-800 dark:text-slate-100">
                                                Status: <span className="text-indigo-600 dark:text-indigo-400">{log.new_status}</span>
                                            </span>
                                            {log.old_status && (
                                                <span className="text-slate-400 block text-[10px] mt-0.5">From {log.old_status}</span>
                                            )}
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                                                <span>By {log.user?.name}</span> • <span>{formatDate(log.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
