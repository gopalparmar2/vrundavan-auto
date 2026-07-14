import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Select } from '@/Components/ui/select';
import { Button, buttonVariants } from '@/Components/ui/button';
import { FileSpreadsheet, FileDown } from 'lucide-react';

export default function Index({ data, brands, models, year, brandId, modelId }) {
    
    const handleFilterChange = (field, value) => {
        const filters = {
            year: field === 'year' ? value : year,
            brand_id: field === 'brand_id' ? value : brandId,
            model_id: field === 'model_id' ? value : modelId,
        };

        if (field === 'brand_id') {
            filters.model_id = ''; // Reset model when brand changes
        }

        router.get(route('reports.index'), filters, { preserveState: true });
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    const formatPercent = (val) => {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val) + '%';
    };

    // Calculate maximum inquiries to scale chart bars
    const monthlyDataArray = Object.values(data.monthly_breakdown || {});
    const maxInquiries = Math.max(...monthlyDataArray.map((row) => row.inquiries_count)) || 1;

    // Generate query parameters for export links
    const queryParams = new URLSearchParams();
    if (year) queryParams.append('year', year);
    if (brandId) queryParams.append('brand_id', brandId);
    if (modelId) queryParams.append('model_id', modelId);
    const queryString = queryParams.toString() ? '?' + queryParams.toString() : '';

    return (
        <AuthenticatedLayout>
            <Head title="Sales Reports" />

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Sales Reports</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Dealership conversions & analytics</p>
            </div>

            {/* Filters Form */}
            <Card className="mb-5">
                <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <Label className="block text-[9px] font-semibold text-slate-550 dark:text-slate-500 uppercase tracking-wider mb-1">Year</Label>
                            <Select 
                                value={year}
                                onChange={(e) => handleFilterChange('year', e.target.value)}
                                className="h-9 text-xs"
                            >
                                {(() => {
                                    const currentYear = new Date().getFullYear();
                                    const years = [];
                                    for (let y = currentYear; y >= currentYear - 5; y--) {
                                        years.push(y);
                                    }
                                    return years.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ));
                                })()}
                            </Select>
                        </div>

                        <div>
                            <Label className="block text-[9px] font-semibold text-slate-550 dark:text-slate-500 uppercase tracking-wider mb-1">Brand</Label>
                            <Select 
                                value={brandId || ''}
                                onChange={(e) => handleFilterChange('brand_id', e.target.value)}
                                className="h-9 text-xs"
                            >
                                <option value="">All Brands</option>
                                {brands.map((b) => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <Label className="block text-[9px] font-semibold text-slate-550 dark:text-slate-500 uppercase tracking-wider mb-1">Model</Label>
                            <Select 
                                value={modelId || ''}
                                onChange={(e) => handleFilterChange('model_id', e.target.value)}
                                disabled={!models || models.length === 0}
                                className="h-9 text-xs"
                            >
                                <option value="">All Models</option>
                                {models && models.map((m) => (
                                    <option key={m.id} value={m.id}>{m.name} ({m.variant})</option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Export Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
                <a 
                    href={route('reports.export.csv') + queryString} 
                    className={buttonVariants({ variant: 'outline', className: 'py-2.5 h-10 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all' })}
                >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Export CSV</span>
                </a>
                <a 
                    href={route('reports.export.pdf') + queryString} 
                    className={buttonVariants({ variant: 'default', className: 'py-2.5 h-10 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-950/20 transition-all active:scale-[0.98]' })}
                >
                    <FileDown className="w-4 h-4 text-indigo-200" />
                    <span>Export PDF</span>
                </a>
            </div>

            {/* Overall Statistics Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                    <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider block">Total Sales Value</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1 block">{formatCurrency(data.total_sales_value)}</span>
                    <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase bg-indigo-50 dark:bg-indigo-950/60 px-1 py-0.5 rounded mt-1.5 inline-block">Conversions</span>
                </div>

                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                    <span className="text-[9px] font-semibold text-slate-505 dark:text-slate-505 uppercase tracking-wider block">Conversion Rate</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1 block">{formatPercent(data.conversion_rate)}</span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium block mt-1.5">{data.total_conversions} of {data.total_inquiries} leads sold</span>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm mb-6">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-5">Monthly Lead Breakdown</h3>
                
                {/* Chart Grid */}
                <div className="flex items-end justify-between h-36 px-2 border-b border-slate-200 dark:border-slate-850 pb-2">
                    {monthlyDataArray.map((row, idx) => {
                        const pct = (row.inquiries_count / maxInquiries) * 100;
                        const convPct = row.inquiries_count > 0 ? (row.conversions_count / row.inquiries_count) * pct : 0;
                        return (
                            <div key={idx} className="flex flex-col items-center flex-grow group relative">
                                <div className="w-5 bg-slate-50 dark:bg-slate-950/40 rounded-t-md h-28 relative flex items-end overflow-hidden">
                                    {/* Total Inquiries Bar */}
                                    <div className="w-full bg-indigo-100 dark:bg-indigo-750/60 transition-all duration-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-700" style={{ height: `${pct}%` }}></div>
                                    {/* Conversions Bar overlaid */}
                                    <div className="w-full bg-emerald-500 absolute bottom-0 left-0 transition-all duration-300 group-hover:bg-emerald-600" style={{ height: `${convPct}%` }}></div>
                                </div>
                                
                                {/* Tooltip info */}
                                <div className="absolute bg-white dark:bg-slate-950 text-slate-850 dark:text-white text-[9px] p-2 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 transform -translate-y-24 shadow-md font-semibold text-center z-10 w-24 border border-slate-200 dark:border-slate-800">
                                    <span className="block text-indigo-600 dark:text-indigo-200">{row.month_name}</span>
                                    <span className="block mt-0.5">Leads: {row.inquiries_count}</span>
                                    <span className="block text-emerald-500 dark:text-emerald-400">Sold: {row.conversions_count}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Chart Labels */}
                <div className="flex justify-between px-2 pt-2 text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                    {monthlyDataArray.map((row, idx) => (
                        <span key={idx} className="w-5 text-center">{row.month_name.substring(0, 1)}</span>
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center justify-center space-x-4 text-[9px] font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-1">
                        <span className="w-2.5 h-2.5 rounded bg-indigo-100 dark:bg-indigo-750"></span>
                        <span>Total Inquiries</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
                        <span>Converted (Sold)</span>
                    </div>
                </div>
            </div>

            {/* Monthly Stats Table / List */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Breakdown Details</h3>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-850/60 max-h-64 overflow-y-auto">
                    {monthlyDataArray.map((row, idx) => (
                        <div key={idx} className="p-3.5 flex justify-between items-center text-xs">
                            <div>
                                <span className="font-bold text-slate-800 dark:text-slate-100">{row.month_name}</span>
                                <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                                    <span>Leads: {row.inquiries_count}</span>
                                    <span>•</span>
                                    <span>Sales: {row.conversions_count}</span>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <span className="font-extrabold text-slate-800 dark:text-slate-100">{formatCurrency(row.sales_value)}</span>
                                <span className="block text-[9px] text-indigo-650 dark:text-indigo-400 font-semibold mt-0.5">{formatPercent(row.conversion_rate)} CR</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
