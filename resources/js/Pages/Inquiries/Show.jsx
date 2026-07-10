import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Select } from '@/Components/ui/select';
import { ArrowLeft, Download } from 'lucide-react';
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
        'New': 'bg-blue-50 text-blue-700 border-blue-100',
        'Contacted': 'bg-indigo-50 text-indigo-700 border-indigo-100',
        'Estimate Sent': 'bg-amber-50 text-amber-700 border-amber-100',
        'Negotiation': 'bg-purple-50 text-purple-700 border-purple-100',
        'Converted': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Lost': 'bg-rose-50 text-rose-700 border-rose-100',
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' - ' + 
               date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Lead Details" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Link 
                        href={route('inquiries.index')} 
                        className="p-2 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Lead Detail</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Customer pipeline status</p>
                    </div>
                </div>
                
                <Link 
                    href={route('inquiries.edit', inquiry.id)} 
                    className="py-2 px-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs rounded-xl shadow-sm transition-all"
                >
                    Edit Details
                </Link>
            </div>

            {/* Customer Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">{inquiry.customer_name}</h3>
                        <span className="block text-xs text-slate-400 mt-1 font-medium">{inquiry.email || 'No email provided'}</span>
                        <span className="block text-xs text-slate-700 font-semibold mt-1">{inquiry.phone}</span>
                    </div>
                    
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusColors[inquiry.status] || 'bg-slate-50 text-slate-700 border-slate-100'} uppercase tracking-wider font-mono`}>
                        {inquiry.status}
                    </span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs">
                    <div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Interested Car</span>
                        <span className="font-bold text-slate-700 mt-1 block">{inquiry.brand?.name} - {inquiry.model?.name}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">{inquiry.model?.variant} ({formatCurrency(inquiry.model?.on_road_price)})</span>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Source</span>
                        <span className="font-bold text-slate-700 mt-1 block uppercase">{inquiry.source}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">By {inquiry.user?.name}</span>
                    </div>
                </div>

                {inquiry.notes && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">Notes</span>
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100/50">{inquiry.notes}</p>
                    </div>
                )}
            </div>

            {/* Status Management Form */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Update Progress Status</h3>
                <form onSubmit={handleStatusUpdate} className="space-y-2">
                    <div className="flex space-x-2">
                        <Select 
                            value={data.status} 
                            onChange={(e) => setData('status', e.target.value)}
                            className="bg-slate-50"
                        >
                            {['New', 'Contacted', 'Estimate Sent', 'Negotiation', 'Converted', 'Lost'].map((st) => (
                                <option key={st} value={st}>{st}</option>
                            ))}
                        </Select>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            size="sm"
                            className="h-11 px-4"
                        >
                            Update
                        </Button>
                    </div>
                    {errors.status && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.status}</div>}
                </form>
            </div>

            {/* Estimate Section */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimate Information</h3>
                    {inquiry.estimate && (
                        <a 
                            href={route('estimates.download', inquiry.estimate.id)} 
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download PDF</span>
                        </a>
                    )}
                </div>

                {inquiry.estimate ? (
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-slate-500">
                            <span>Base Price (On-Road):</span>
                            <span className="font-medium text-slate-800">{formatCurrency(inquiry.estimate.on_road_price)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                            <span>Discount:</span>
                            <span className="font-medium text-rose-600">-{formatCurrency(inquiry.estimate.discount)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                            <span>Accessories:</span>
                            <span className="font-medium text-slate-800">+{formatCurrency(inquiry.estimate.accessories_cost)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                            <span>Insurance:</span>
                            <span className="font-medium text-slate-800">+{formatCurrency(inquiry.estimate.insurance)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                            <span>RTO Charges:</span>
                            <span className="font-medium text-slate-800">+{formatCurrency(inquiry.estimate.rto_charges)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-sm text-slate-800 pt-2 border-t border-slate-100">
                            <span>Total Amount Payable:</span>
                            <span className="text-indigo-600">{formatCurrency(inquiry.estimate.total_amount)}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                        <p className="text-xs text-slate-500">No estimate has been generated for this lead yet.</p>
                        <Link 
                            href={route('estimates.create', inquiry.id)} 
                            className="mt-3 inline-block py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-200 transition-all active:scale-[0.98]"
                        >
                            Generate Estimate
                        </Link>
                    </div>
                )}
            </div>

            {/* Status Change Log / Timeline */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Activity Timeline</h3>
                <div className="relative pl-4 border-l-2 border-slate-100 space-y-5">
                    {(() => {
                        const logs = inquiry.status_logs || inquiry.statusLogs || [];
                        return logs.map((log) => (
                            <div key={log.id} className="relative">
                                {/* Point Indicator */}
                                <div className="absolute -left-[21.5px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white shadow shadow-indigo-200"></div>
                                
                                <div className="text-xs">
                                    <span className="font-bold text-slate-700">Status updated to: <span className="text-indigo-600 font-mono">{log.new_status}</span></span>
                                    {log.old_status ? (
                                        <span className="text-slate-400 block mt-0.5 text-[10px]">Transitioned from {log.old_status}</span>
                                    ) : (
                                        <span className="text-slate-400 block mt-0.5 text-[10px]">Initial registration</span>
                                    )}
                                    <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 mt-1 font-semibold">
                                        <span>By {log.user?.name}</span>
                                        <span>•</span>
                                        <span>{formatDate(log.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        ));
                    })()}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
