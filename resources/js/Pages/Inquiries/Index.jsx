import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { DatePicker } from '@/Components/ui/datepicker';
import { Plus, Search, SlidersHorizontal, Inbox } from 'lucide-react';

export default function Index({ inquiries, brands, search: initialSearch, status: initialStatus, brandId: initialBrandId, dateFrom: initialDateFrom, dateTo: initialDateTo }) {
    const [search, setSearch] = useState(initialSearch || '');
    const [status, setStatus] = useState(initialStatus || '');
    const [brandId, setBrandId] = useState(initialBrandId || '');
    const [dateFrom, setDateFrom] = useState(initialDateFrom || '');
    const [dateTo, setDateTo] = useState(initialDateTo || '');

    const [filtersOpen, setFiltersOpen] = useState(false);

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
            <Head title="Inquiries" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Inquiries</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage customer pipeline</p>
                </div>
                <Link
                    href={route('inquiries.create')}
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-950/20 flex items-center space-x-1.5 transition-all active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Inquiry</span>
                </Link>
            </div>

            {/* Collapsible Filters */}
            <div className="mb-5">
                <form onSubmit={applyFilters} className="space-y-3">
                    <div className="flex space-x-2">
                        <div className="relative flex-grow">
                            <Input
                                type="text"
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="Search customer, phone, email..."
                                className="pl-9 text-xs"
                            />
                            <div className="absolute left-3 top-3.5 text-slate-500">
                                <Search className="w-4 h-4" />
                            </div>
                        </div>
                        <Button
                            type="button"
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            variant="outline"
                            size="icon"
                            className="h-11 w-11 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/60"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Filters Grid */}
                    {filtersOpen && (
                        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-4 rounded-2xl shadow-inner space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="mb-1 text-[10px] text-slate-500 dark:text-slate-400">Status</Label>
                                    <Select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="text-xs h-10"
                                    >
                                        <option value="">All Statuses</option>
                                        {['New', 'Contacted', 'Estimate Sent', 'Negotiation', 'Converted', 'Lost'].map((st) => (
                                            <option key={st} value={st}>{st}</option>
                                        ))}
                                    </Select>
                                </div>

                                <div>
                                    <Label className="mb-1 text-[10px] text-slate-500 dark:text-slate-400">Brand</Label>
                                    <Select
                                        value={brandId}
                                        onChange={(e) => setBrandId(e.target.value)}
                                        className="text-xs h-10"
                                    >
                                        <option value="">All Brands</option>
                                        {brands.map((b) => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="mb-1 text-[10px] text-slate-500 dark:text-slate-400">From Date</Label>
                                    <DatePicker
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        placeholder="Select start date"
                                        className="text-xs h-10"
                                    />
                                </div>

                                <div>
                                    <Label className="mb-1 text-[10px] text-slate-500 dark:text-slate-400">To Date</Label>
                                    <DatePicker
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        placeholder="Select end date"
                                        className="text-xs h-10"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-2 pt-1.5">
                                <Button type="submit" className="flex-grow h-10 text-xs">Apply Filters</Button>
                                <Button type="button" onClick={handleReset} variant="outline" className="h-10 text-xs text-slate-500 dark:text-slate-400">Reset</Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Inquiries List */}
            <div className="space-y-3">
                {inquiries.data && inquiries.data.length > 0 ? (
                    inquiries.data.map((inquiry) => (
                        <Link
                            key={inquiry.id}
                            href={route('inquiries.show', inquiry.id)}
                            className="block p-3.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-150"
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
                                    <span className="text-slate-350 dark:text-slate-600 text-[10px]">•</span>
                                    <span className="text-[9px] text-indigo-650 dark:text-indigo-400 font-semibold uppercase bg-indigo-50 dark:bg-indigo-950/60 px-1 py-0.2 rounded-md">{inquiry.source}</span>
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
                        <p className="text-[10px] text-slate-400 dark:text-slate-505 mt-0.5">Try adjusting filters or search query.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination links={inquiries.links} />
        </AuthenticatedLayout>
    );
}
