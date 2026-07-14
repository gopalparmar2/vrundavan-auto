import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Tag, Car, UserPlus, BarChart3, Inbox } from 'lucide-react';

export default function Dashboard({ totalInquiriesMonth, totalSalesMonth, pendingEstimates, recentInquiries }) {
    const { auth } = usePage().props;

    const statusColors = {
        'New': 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
        'Contacted': 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30',
        'Estimate Sent': 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
        'Negotiation': 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30',
        'Converted': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30',
        'Lost': 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30',
    };

    // Simple diffForHumans fallback logic in JS
    const timeAgo = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHrs / 24);

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHrs < 24) return `${diffHrs}h ago`;
        return `${diffDays}d ago`;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Welcome Header */}
            <div className="mb-6">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Showroom Management</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mt-0.5">Hello, {auth.user.name}!</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Here is your dealership status for today.</p>
            </div>

            {/* Quick Stats Cards (Grid layout) */}
            <div className="grid grid-cols-3 gap-3.5 mb-6">
                {/* Inquiries Stats */}
                <div className="bg-gradient-to-br from-indigo-500/8 to-indigo-600/3 border border-indigo-500/20 p-3.5 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(99,102,241,0.04)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Inquiries</span>
                    <div className="mt-3.5">
                        <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{totalInquiriesMonth}</span>
                        <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-semibold mt-1">This Month</span>
                    </div>
                </div>

                {/* Conversions Stats */}
                <div className="bg-gradient-to-br from-emerald-500/8 to-emerald-600/3 border border-emerald-500/20 p-3.5 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(16,185,129,0.04)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Converted</span>
                    <div className="mt-3.5">
                        <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{totalSalesMonth}</span>
                        <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Sales Month</span>
                    </div>
                </div>

                {/* Pending Estimates Stats */}
                <div className="bg-gradient-to-br from-amber-500/8 to-amber-600/3 border border-amber-500/20 p-3.5 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(245,158,11,0.04)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Pending</span>
                    <div className="mt-3.5">
                        <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{pendingEstimates}</span>
                        <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Estimates</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions Section */}
            <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3.5 pl-1">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3.5">
                    {/* Add Brand */}
                    <Link href={route('brands.create')} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-indigo-500 active:scale-[0.96] transition-all duration-300 group">
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                            <Tag className="w-5.5 h-5.5" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">Add Brand</span>
                    </Link>

                    {/* Add Model */}
                    <Link href={route('models.create')} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-indigo-500 active:scale-[0.96] transition-all duration-300 group">
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                            <Car className="w-5.5 h-5.5" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">Add Model</span>
                    </Link>

                    {/* Add Inquiry */}
                    <Link href={route('inquiries.create')} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-[0_4px_12px_rgba(99,102,241,0.08)] hover:shadow-lg hover:border-indigo-500 active:scale-[0.96] transition-all duration-300 group">
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                            <UserPlus className="w-5.5 h-5.5" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">New Lead</span>
                    </Link>

                    {/* Sales Reports */}
                    <Link href={route('reports.index')} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-[0_4px_12px_rgba(99,102,241,0.08)] hover:shadow-lg hover:border-indigo-500 active:scale-[0.96] transition-all duration-300 group">
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                            <BarChart3 className="w-5.5 h-5.5" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-slate-950 dark:group-hover:text-white">Sales Reports</span>
                    </Link>
                </div>
            </div>

            {/* Recent Inquiries Section */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Recent Inquiries</h3>
                    <Link href={route('inquiries.index')} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">View All</Link>
                </div>

                <div className="space-y-3">
                    {recentInquiries.length > 0 ? (
                        recentInquiries.map((inquiry) => (
                            <Link
                                key={inquiry.id}
                                href={route('inquiries.show', inquiry.id)}
                                className="block p-3.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-150"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{inquiry.customer_name}</span>
                                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{inquiry.phone}</span>
                                    </div>

                                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[inquiry.status] || 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'} uppercase tracking-wider`}>
                                        {inquiry.status}
                                    </span>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
                                    <div className="flex items-center space-x-1.5">
                                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{inquiry.brand?.name}</span>
                                        <span className="text-slate-350 dark:text-slate-600 text-[10px]">•</span>
                                        <span className="text-[10px] text-slate-700 dark:text-slate-300 font-medium">{inquiry.model?.name} ({inquiry.model?.variant})</span>
                                    </div>
                                    <span className="text-[9px] text-slate-505 dark:text-slate-400 font-medium">{timeAgo(inquiry.created_at)}</span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-950/40 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-2.5">
                                <Inbox className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">No inquiries registered yet</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
