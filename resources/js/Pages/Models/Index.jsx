import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Plus, Search, Car, Pencil, Trash2 } from 'lucide-react';

export default function Index({ models, brands, search: initialSearch, brandId: initialBrandId }) {
    const [search, setSearch] = useState(initialSearch || '');
    const [brandId, setBrandId] = useState(initialBrandId || '');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route('models.index'), { search, brand_id: brandId }, { preserveState: true });
    };

    const handleBrandChange = (e) => {
        const selectedBrandId = e.target.value;
        setBrandId(selectedBrandId);
        router.get(route('models.index'), { search, brand_id: selectedBrandId }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this model?')) {
            router.delete(route('models.destroy', id));
        }
    };

    // Helper: group models by brand name
    const groupedModels = {};
    if (models.data) {
        models.data.forEach((model) => {
            const brandName = model.brand?.name || 'Unknown Brand';
            if (!groupedModels[brandName]) {
                groupedModels[brandName] = [];
            }
            groupedModels[brandName].push(model);
        });
    }

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Models" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Models</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage catalog and pricing</p>
                </div>
                <Link 
                    href={route('models.create')} 
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-950/20 flex items-center space-x-1.5 transition-all active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Model</span>
                </Link>
            </div>

            {/* Search & Filter Bar */}
            <form onSubmit={handleSearchSubmit} className="mb-5 flex space-x-2">
                <div className="relative flex-grow">
                    <Input 
                        type="text" 
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search models or variants..." 
                        className="pl-9 text-xs"
                    />
                    <div className="absolute left-3 top-3.5 text-slate-500">
                        <Search className="w-4 h-4" />
                    </div>
                </div>

                <Select 
                    value={brandId} 
                    onChange={handleBrandChange} 
                    className="w-40 text-xs"
                >
                    <option value="">All Brands</option>
                    {brands.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </Select>
            </form>

            {/* Grouped / Listed Models */}
            <div className="space-y-4">
                {Object.keys(groupedModels).length > 0 ? (
                    Object.keys(groupedModels).map((brandName) => (
                        <div key={brandName} className="space-y-2">
                            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wider pl-1">{brandName}</h3>
                            
                            {groupedModels[brandName].map((model) => (
                                <div key={model.id} className="p-3.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm flex items-center justify-between">
                                    <div className="flex items-center space-x-3.5 flex-grow min-w-0">
                                        {/* Model Image */}
                                        <div className="w-16 h-16 rounded-xl bg-slate-55 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {model.image ? (
                                                <img src={`/storage/${model.image}`} alt={model.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="w-full h-full bg-indigo-50 dark:bg-indigo-950/30 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400">
                                                    <Car className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-grow">
                                            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm tracking-tight truncate">{model.name}</h4>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">{model.variant}</p>
                                            
                                            <div className="flex items-center space-x-2 mt-1.5">
                                                <span className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded-md uppercase tracking-wider">{model.fuel_type}</span>
                                                <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-355 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md uppercase tracking-wider">{model.transmission}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price & Actions */}
                                    <div className="flex flex-col items-end space-y-2.5 ml-3 flex-shrink-0">
                                        <div className="text-right">
                                            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{formatCurrency(model.on_road_price)}</span>
                                            <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wide mt-0.5">On-Road</span>
                                        </div>

                                        <div className="flex items-center space-x-1">
                                            <Link 
                                                href={route('models.edit', model.id)} 
                                                className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Link>

                                            <Button 
                                                onClick={() => handleDelete(model.id)}
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-950/40 text-slate-500 flex items-center justify-center mx-auto mb-3">
                            <Car className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">No models found</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Try refining your search or filters.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination links={models.links} />
        </AuthenticatedLayout>
    );
}
