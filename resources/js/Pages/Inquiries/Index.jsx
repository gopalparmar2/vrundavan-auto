import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { DatePicker } from '@/Components/ui/datepicker';
import { Plus, Search, SlidersHorizontal, Inbox, Eye, ExternalLink } from 'lucide-react';

export default function Index({ inquiries, brands, search: initialSearch, status: initialStatus, brandId: initialBrandId, dateFrom: initialDateFrom, dateTo: initialDateTo }) {
    const [search, setSearch] = useState(initialSearch || '');
    const [status, setStatus] = useState(initialStatus || '');
    const [brandId, setBrandId] = useState(initialBrandId || '');
    const [dateFrom, setDateFrom] = useState(initialDateFrom || '');
    const [dateTo, setDateTo] = useState(initialDateTo || '');

    const [filtersOpen, setFiltersOpen] = useState(true);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const applyFilters = (e) => {
        if (e) e.preventDefault();
        router.get(route('inquiries.index'), {
            search,
            status,
            brand_id: brandId,
            date_from: dateFrom,
            date_to: dateTo
        }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setStatus('');
        setBrandId('');
        setDateFrom('');
        setDateTo('');
        router.get(route('inquiries.index'));
    };

    const statusColors = {
        'New': 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
        'Contacted': 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30',
        'Estimate Sent': 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
        'Negotiation': 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30',
        'Converted': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30',
        'Lost': 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30',
    };

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
            <Head title="Lead Pipeline" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Customer Lead Pipeline</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Track, follow-up and convert customer inquiries</p>
                </div>
                <Link
                    href={route('inquiries.create')}
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition-all active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    <span>Register New Lead</span>
                </Link>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 mb-6 shadow-sm">
                <form onSubmit={applyFilters} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                        <div className="relative flex-grow">
                            <Input
                                type="text"
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="Search by customer name, phone number or email..."
                                className="pl-10 text-xs py-2.5 rounded-xl border-slate-200 dark:border-slate-800"
                            />
                            <div className="absolute left-3 top-3 text-slate-400">
                                <Search className="w-4 h-4" />
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            variant="outline"
                            className="text-xs font-semibold px-4 py-2.5 rounded-xl border-slate-200 dark:border-slate-800"
                        >
                            <SlidersHorizontal className="w-4 h-4 mr-2" />
                            <span>{filtersOpen ? 'Hide Filters' : 'More Filters'}</span>
                        </Button>
                    </div>

                    {/* Desktop Filters Row */}
                    {filtersOpen && (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                                <Label className="mb-1 text-[10px] font-bold text-slate-400 uppercase">Status</Label>
                                <Select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="text-xs py-2 rounded-xl"
                                >
                                    <option value="">All Statuses</option>
                                    {['New', 'Contacted', 'Estimate Sent', 'Negotiation', 'Converted', 'Lost'].map((st) => (
                                        <option key={st} value={st}>{st}</option>
                                    ))}
                                </Select>
                            </div>

                            <div>
                                <Label className="mb-1 text-[10px] font-bold text-slate-400 uppercase">Brand</Label>
                                <Select
                                    value={brandId}
                                    onChange={(e) => setBrandId(e.target.value)}
                                    className="text-xs py-2 rounded-xl"
                                >
                                    <option value="">All Brands</option>
                                    {brands.map((b) => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </Select>
                            </div>

                            <div>
                                <Label className="mb-1 text-[10px] font-bold text-slate-400 uppercase">From Date</Label>
                                <DatePicker
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    placeholder="Start date"
                                    className="text-xs py-2 rounded-xl"
                                />
                            </div>

                            <div>
                                <Label className="mb-1 text-[10px] font-bold text-slate-400 uppercase">To Date</Label>
                                <DatePicker
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    placeholder="End date"
                                    className="text-xs py-2 rounded-xl"
                                />
                            </div>

                            <div className="sm:col-span-2 md:col-span-4 flex justify-end space-x-2 pt-2">
                                <Button type="button" onClick={handleReset} variant="outline" className="text-xs font-semibold px-4 rounded-xl">
                                    Reset Filters
                                </Button>
                                <Button type="submit" className="text-xs font-bold px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md">
                                    Apply Search
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Desktop View: Wide Datatable */}
            <div className="hidden md:block bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm mb-6">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <th className="py-4 px-6">Customer Information</th>
                            <th className="py-4 px-6">Vehicle Interest</th>
                            <th className="py-4 px-6">Lead Source</th>
                            <th className="py-4 px-6">Pipeline Status</th>
                            <th className="py-4 px-6">Received</th>
                            <th className="py-4 px-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                        {inquiries.data && inquiries.data.length > 0 ? (
                            inquiries.data.map((inquiry) => (
                                <tr key={inquiry.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-slate-800 dark:text-slate-100">{inquiry.customer_name}</div>
                                        <div className="text-slate-500 dark:text-slate-400 font-medium text-[11px] mt-0.5">{inquiry.phone}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-indigo-600 dark:text-indigo-400">{inquiry.brand?.name}</div>
                                        <div className="text-slate-600 dark:text-slate-300 font-medium text-[11px] mt-0.5">{inquiry.model?.name} ({inquiry.model?.variant})</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-block bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase">
                                            {inquiry.source}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColors[inquiry.status] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'} uppercase tracking-wider`}>
                                            {inquiry.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-400 font-medium text-[11px]">
                                        {timeAgo(inquiry.created_at)}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Link
                                            href={route('inquiries.show', inquiry.id)}
                                            className="inline-flex items-center space-x-1 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-200/60 dark:border-indigo-800/40 transition-colors"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>View Details</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-16">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                                        <Inbox className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No customer leads found</p>
                                    <p className="text-xs text-slate-400 mt-1">Try adjusting query search terms or filters.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View: Cards Layout */}
            <div className="md:hidden space-y-3 mb-6">
                {inquiries.data && inquiries.data.length > 0 ? (
                    inquiries.data.map((inquiry) => (
                        <Link
                            key={inquiry.id}
                            href={route('inquiries.show', inquiry.id)}
                            className="block p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-150"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight">{inquiry.customer_name}</span>
                                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{inquiry.phone}</span>
                                </div>

                                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[inquiry.status] || 'bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-slate-300 border-slate-200 dark:border-slate-800/80'} uppercase tracking-wider font-mono`}>
                                    {inquiry.status}
                                </span>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center">
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-[10px] font-semibold text-slate-555 dark:text-slate-400">{inquiry.brand?.name}</span>
                                    <span className="text-slate-350 dark:text-slate-600 text-[10px]">•</span>
                                    <span className="text-[10px] text-slate-700 dark:text-slate-300 font-medium">{inquiry.model?.name}</span>
                                </div>
                                <span className="text-[9px] text-slate-450 dark:text-slate-500 font-medium">{timeAgo(inquiry.created_at)}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-950/40 text-slate-500 flex items-center justify-center mx-auto mb-3">
                            <Inbox className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">No inquiries found</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination links={inquiries.links} />
        </AuthenticatedLayout>
    );
}
