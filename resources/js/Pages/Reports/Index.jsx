import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Select } from '@/Components/ui/select';
import { Button, buttonVariants } from '@/Components/ui/button';
import { FileSpreadsheet, FileDown, TrendingUp, DollarSign, Users, Award } from 'lucide-react';

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
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
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
            <Head title="Sales & Revenue Reports" />

            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Sales & Revenue Reports</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Showroom sales performance, conversion metrics & financial analytics</p>
                </div>

                <div className="flex items-center space-x-3">
                    <a
                        href={route('reports.export.csv') + queryString}
                        className={buttonVariants({ variant: 'outline', className: 'py-2.5 px-4 h-10 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center space-x-2 shadow-xs transition-all' })}
                    >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Export CSV</span>
                    </a>
                    <a
                        href={route('reports.export.pdf') + queryString}
                        className={buttonVariants({ variant: 'default', className: 'py-2.5 px-4 h-10 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md transition-all' })}
                    >
                        <FileDown className="w-4 h-4" />
                        <span>Export PDF</span>
                    </a>
                </div>
            </div>

            {/* Filters Bar Card */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 mb-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Financial Year</Label>
                        <Select
                            value={year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="h-10 text-xs py-2 rounded-xl"
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
                        <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Manufacturer Brand</Label>
                        <Select
                            value={brandId || ''}
                            onChange={(e) => handleFilterChange('brand_id', e.target.value)}
                            className="h-10 text-xs py-2 rounded-xl"
                        >
                            <option value="">All Brands</option>
                            {brands.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Vehicle Model</Label>
                        <Select
                            value={modelId || ''}
                            onChange={(e) => handleFilterChange('model_id', e.target.value)}
                            disabled={!models || models.length === 0}
                            className="h-10 text-xs py-2 rounded-xl"
                        >
                            <option value="">All Models</option>
                            {models && models.map((m) => (
                                <option key={m.id} value={m.id}>{m.name} ({m.variant})</option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>

            {/* 4-Column Statistics Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {/* Stat 1: Total Sales Revenue */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Sales Value</span>
                        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{formatCurrency(data.total_sales_value)}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Total revenue closed</span>
                    </div>
                </div>

                {/* Stat 2: Conversion Rate */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversion Ratio</span>
                        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{formatPercent(data.conversion_rate)}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Overall lead closure rate</span>
                    </div>
                </div>

                {/* Stat 3: Total Inquiries */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Inquiries</span>
                        <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{data.total_inquiries}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Total showroom inquiries</span>
                    </div>
                </div>

                {/* Stat 4: Vehicles Sold */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicles Sold</span>
                        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                            <Award className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{data.total_conversions}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Successful deal conversions</span>
                    </div>
                </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm mb-8">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Monthly Lead & Conversion Trends ({year})</h3>

                {/* Chart Bars Grid */}
                <div className="flex items-end justify-between h-48 px-4 border-b border-slate-200 dark:border-slate-800 pb-3 gap-2">
                    {monthlyDataArray.map((row, idx) => {
                        const pct = (row.inquiries_count / maxInquiries) * 100;
                        const convPct = row.inquiries_count > 0 ? (row.conversions_count / row.inquiries_count) * pct : 0;
                        return (
                            <div key={idx} className="flex flex-col items-center flex-grow group relative h-full justify-end">
                                <div className="w-full max-w-[42px] bg-slate-50 dark:bg-slate-800/40 rounded-t-xl h-full relative flex items-end overflow-hidden">
                                    {/* Total Inquiries Bar */}
                                    <div className="w-full bg-indigo-500/30 dark:bg-indigo-600/40 transition-all duration-300 group-hover:bg-indigo-500/50" style={{ height: `${pct}%` }}></div>
                                    {/* Conversions Bar overlaid */}
                                    <div className="w-full bg-emerald-500 absolute bottom-0 left-0 transition-all duration-300 group-hover:bg-emerald-600" style={{ height: `${convPct}%` }}></div>
                                </div>

                                {/* Tooltip info */}
                                <div className="absolute bg-slate-900 text-white text-[10px] p-2.5 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 transform -translate-y-36 shadow-xl font-medium text-center z-20 w-28 border border-slate-700">
                                    <span className="block font-bold text-indigo-300">{row.month_name}</span>
                                    <span className="block mt-1">Leads: {row.inquiries_count}</span>
                                    <span className="block text-emerald-400 font-bold">Conversions: {row.conversions_count}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Chart Month Labels */}
                <div className="flex justify-between px-4 pt-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    {monthlyDataArray.map((row, idx) => (
                        <span key={idx} className="flex-1 text-center truncate">{row.month_name.substring(0, 3)}</span>
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center space-x-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded bg-indigo-500/30 dark:bg-indigo-600/40 border border-indigo-500"></span>
                        <span>Registered Inquiries</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded bg-emerald-500"></span>
                        <span>Converted Sales</span>
                    </div>
                </div>
            </div>

            {/* Detailed Datatable Breakdown */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden mb-6">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Monthly Detailed Breakdown</h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-6">Month</th>
                                <th className="py-3.5 px-6">Inquiries Received</th>
                                <th className="py-3.5 px-6">Deals Closed</th>
                                <th className="py-3.5 px-6">Conversion Ratio</th>
                                <th className="py-3.5 px-6 text-right">Gross Sales Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                            {monthlyDataArray.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="py-3.5 px-6 font-bold text-slate-800 dark:text-slate-100">{row.month_name}</td>
                                    <td className="py-3.5 px-6 text-slate-600 dark:text-slate-300 font-semibold">{row.inquiries_count}</td>
                                    <td className="py-3.5 px-6 text-emerald-600 dark:text-emerald-400 font-bold">{row.conversions_count}</td>
                                    <td className="py-3.5 px-6 font-semibold text-indigo-600 dark:text-indigo-400">{formatPercent(row.conversion_rate)}</td>
                                    <td className="py-3.5 px-6 text-right font-extrabold text-slate-800 dark:text-slate-100">{formatCurrency(row.sales_value)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
