import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
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
        'New': 'bg-blue-50 text-blue-700 border-blue-100',
        'Contacted': 'bg-indigo-50 text-indigo-700 border-indigo-100',
        'Estimate Sent': 'bg-amber-50 text-amber-700 border-amber-100',
        'Negotiation': 'bg-purple-50 text-purple-700 border-purple-100',
        'Converted': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Lost': 'bg-rose-50 text-rose-700 border-rose-100',
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
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Inquiries</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Manage customer pipeline</p>
                </div>
                <Link 
                    href={route('inquiries.create')} 
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-200 flex items-center space-x-1.5 transition-all active:scale-[0.98]"
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
                            <div className="absolute left-3 top-3.5 text-slate-400">
                                <Search className="w-4 h-4" />
                            </div>
                        </div>
                        <Button 
                            type="button" 
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            variant="outline"
                            size="icon"
                            className="h-11 w-11 text-slate-500 bg-white"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Filters Grid */}
                    {filtersOpen && (
                        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-inner space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="mb-1 text-[10px] text-slate-400">Status</Label>
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
                                    <Label className="mb-1 text-[10px] text-slate-400">Brand</Label>
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
                                    <Label className="mb-1 text-[10px] text-slate-400">From Date</Label>
                                    <Input 
                                        type="date" 
                                        value={dateFrom} 
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        className="text-xs h-10"
                                    />
                                </div>

                                <div>
                                    <Label className="mb-1 text-[10px] text-slate-400">To Date</Label>
                                    <Input 
                                        type="date" 
                                        value={dateTo} 
                                        onChange={(e) => setDateTo(e.target.value)}
                                        className="text-xs h-10"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-2 pt-1.5">
                                <Button type="submit" className="flex-grow h-10 text-xs">Apply Filters</Button>
                                <Button type="button" onClick={handleReset} variant="outline" className="h-10 text-xs text-slate-500">Reset</Button>
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
                            className="block p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-150"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold text-slate-800 tracking-tight">{inquiry.customer_name}</span>
                                    <span className="block text-[10px] text-slate-400 mt-0.5">{inquiry.phone}</span>
                                </div>

                                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[inquiry.status] || 'bg-slate-50 text-slate-700 border-slate-100'} uppercase tracking-wider font-mono`}>
                                    {inquiry.status}
                                </span>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-slate-100/60 flex justify-between items-center">
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-[10px] font-semibold text-slate-500">{inquiry.brand?.name}</span>
                                    <span className="text-slate-300 text-[10px]">•</span>
                                    <span className="text-[10px] text-slate-600 font-medium">{inquiry.model?.name}</span>
                                    <span className="text-slate-300 text-[10px]">•</span>
                                    <span className="text-[9px] text-indigo-600 font-semibold uppercase bg-indigo-50 px-1 py-0.2 rounded-md">{inquiry.source}</span>
                                </div>
                                <span className="text-[9px] text-slate-400 font-medium">{timeAgo(inquiry.created_at)}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                            <Inbox className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-slate-500 font-semibold">No inquiries found</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Try adjusting filters or search query.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination links={inquiries.links} />
        </AuthenticatedLayout>
    );
}
