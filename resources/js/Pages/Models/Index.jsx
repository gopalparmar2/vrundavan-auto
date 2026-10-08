import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import DeleteConfirmModal from '@/Components/DeleteConfirmModal';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Plus, Search, Car, Pencil, Trash2 } from 'lucide-react';

export default function Index({ models, brands, search: initialSearch, brandId: initialBrandId }) {
    const [search, setSearch] = useState(initialSearch || '');
    const [brandId, setBrandId] = useState(initialBrandId || '');

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [modelToDelete, setModelToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const openDeleteModal = (model) => {
        setModelToDelete(model);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!modelToDelete) return;
        setIsDeleting(true);
        router.delete(route('models.destroy', modelToDelete.id), {
            onSuccess: () => {
                setDeleteModalOpen(false);
                setModelToDelete(null);
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
            },
            onFinish: () => {
                setIsDeleting(false);
            }
        });
    };

    const formatCurrency = (val) => {
        if (!val) return '-';
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Vehicle Catalog" />

            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Vehicle Models Inventory</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Showroom vehicle variants, pricing & specifications</p>
                </div>
                <Link 
                    href={route('models.create')} 
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition-all active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Model</span>
                </Link>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 mb-6 shadow-xs">
                <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <Input 
                            type="text" 
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search vehicle model name or variant (e.g. Fortuner, VX)..." 
                            className="pl-10 text-xs py-2.5 rounded-xl border-slate-200 dark:border-slate-800"
                        />
                        <div className="absolute left-3 top-3 text-slate-400">
                            <Search className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="w-full sm:w-52">
                        <Select 
                            value={brandId} 
                            onChange={handleBrandChange} 
                            className="text-xs py-2.5 rounded-xl border-slate-200 dark:border-slate-800"
                        >
                            <option value="">All Brands</option>
                            {brands.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </Select>
                    </div>
                </form>
            </div>

            {/* Desktop View: Wide Data Table */}
            <div className="hidden md:block bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs mb-6">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <th className="py-4 px-6">Vehicle Model & Variant</th>
                            <th className="py-4 px-6">Brand</th>
                            <th className="py-4 px-6">Specifications</th>
                            <th className="py-4 px-6">Ex-Showroom Price</th>
                            <th className="py-4 px-6">On-Road Price</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                        {models.data && models.data.length > 0 ? (
                            models.data.map((model) => (
                                <tr key={model.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-3.5">
                                            <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xs">
                                                {model.image ? (
                                                    <img src={`/storage/${model.image}`} alt={model.name} className="object-cover w-full h-full" />
                                                ) : (
                                                    <Car className="w-6 h-6 text-slate-400" />
                                                )}
                                            </div>
                                            <div>
                                                <span className="font-bold text-slate-800 dark:text-slate-100 text-sm block">{model.name}</span>
                                                <span className="text-slate-500 dark:text-slate-400 font-semibold text-[11px] mt-0.5 block">{model.variant}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px] px-3 py-1 rounded-xl">
                                            {model.brand?.name || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-1.5">
                                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                                                {model.fuel_type}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                                                {model.transmission}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-slate-600 dark:text-slate-400 text-xs">
                                        {formatCurrency(model.ex_showroom_price)}
                                    </td>
                                    <td className="py-4 px-6 font-extrabold text-slate-800 dark:text-slate-100 text-xs">
                                        {formatCurrency(model.on_road_price)}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link 
                                                href={route('models.edit', model.id)} 
                                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-indigo-200/80 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-100 transition-colors"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                                <span>Edit</span>
                                            </Link>

                                            <Button 
                                                onClick={() => openDeleteModal(model)}
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 px-2.5 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-16">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                                        <Car className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No vehicle models found</p>
                                    <p className="text-xs text-slate-400 mt-1">Try refining search parameters or brand selection.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View: Cards Fallback */}
            <div className="md:hidden space-y-4 mb-6">
                {models.data && models.data.length > 0 ? (
                    models.data.map((model) => (
                        <div 
                            key={model.id} 
                            className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
                        >
                            <div className="p-4">
                                <div className="flex items-center space-x-3.5">
                                    <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {model.image ? (
                                            <img src={`/storage/${model.image}`} alt={model.name} className="object-cover w-full h-full" />
                                        ) : (
                                            <Car className="w-6 h-6 text-slate-400" />
                                        )}
                                    </div>

                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{model.name}</h4>
                                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{model.brand?.name}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{model.variant}</p>
                                        <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 block mt-1">{formatCurrency(model.on_road_price)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <Link 
                                    href={route('models.edit', model.id)} 
                                    className="text-xs font-bold text-indigo-600 flex items-center space-x-1"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                    <span>Edit</span>
                                </Link>

                                <Button 
                                    onClick={() => openDeleteModal(model)}
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-rose-500 hover:text-rose-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xs">
                        <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center mx-auto mb-3">
                            <Car className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-slate-500 font-bold">No models found</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination links={models.links} />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal 
                show={deleteModalOpen}
                onClose={() => { setDeleteModalOpen(false); setModelToDelete(null); }}
                onConfirm={handleConfirmDelete}
                title="Delete Vehicle Model"
                message="Are you sure you want to delete this vehicle model from inventory? This action cannot be undone."
                itemName={modelToDelete ? `${modelToDelete.name} (${modelToDelete.variant})` : ''}
                loading={isDeleting}
            />
        </AuthenticatedLayout>
    );
}
