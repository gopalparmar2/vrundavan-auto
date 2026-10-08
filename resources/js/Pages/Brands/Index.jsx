import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import DeleteConfirmModal from '@/Components/DeleteConfirmModal';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Plus, Search, Pencil, Trash2, Layers } from 'lucide-react';

export default function Index({ brands, search: initialSearch, status: initialStatus }) {
    const [search, setSearch] = useState(initialSearch || '');
    const [status, setStatus] = useState(initialStatus || '');

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route('brands.index'), { search, status }, { preserveState: true });
    };

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);
        router.get(route('brands.index'), { search, status: selectedStatus }, { preserveState: true });
    };

    const openDeleteModal = (brand) => {
        setBrandToDelete(brand);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!brandToDelete) return;
        setIsDeleting(true);
        router.delete(route('brands.destroy', brandToDelete.id), {
            onSuccess: () => {
                setDeleteModalOpen(false);
                setBrandToDelete(null);
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

    return (
        <AuthenticatedLayout>
            <Head title="Brands" />

            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Brand Directory</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage partner vehicle manufacturers & status</p>
                </div>
                <Link 
                    href={route('brands.create')} 
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition-all active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Brand</span>
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
                            placeholder="Search manufacturer brands..." 
                            className="pl-10 text-xs py-2.5 rounded-xl border-slate-200 dark:border-slate-800"
                        />
                        <div className="absolute left-3 top-3 text-slate-400">
                            <Search className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="w-full sm:w-48">
                        <Select 
                            value={status} 
                            onChange={handleStatusChange} 
                            className="text-xs py-2.5 rounded-xl border-slate-200 dark:border-slate-800"
                        >
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Select>
                    </div>
                </form>
            </div>

            {/* Desktop View: Wide Data Table */}
            <div className="hidden md:block bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs mb-6">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <th className="py-4 px-6">Brand / Manufacturer</th>
                            <th className="py-4 px-6">Active Status</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                        {brands.data && brands.data.length > 0 ? (
                            brands.data.map((brand) => (
                                <tr key={brand.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-3.5">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xs">
                                                {brand.logo ? (
                                                    <img src={`/storage/${brand.logo}`} alt={brand.name} className="object-contain w-full h-full p-1.5" />
                                                ) : (
                                                    <span className="font-extrabold text-slate-500 text-base uppercase">{brand.name.substring(0, 2)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{brand.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${brand.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-900/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'} uppercase tracking-wider`}>
                                            {brand.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link 
                                                href={route('brands.edit', brand.id)} 
                                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-indigo-200/80 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-100 transition-colors"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                                <span>Edit</span>
                                            </Link>

                                            <Button 
                                                onClick={() => openDeleteModal(brand)}
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
                                <td colSpan="3" className="text-center py-16">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                                        <Layers className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No brands found</p>
                                    <p className="text-xs text-slate-400 mt-1">Try refining search query or filters.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View: Cards Fallback */}
            <div className="md:hidden space-y-3 mb-6">
                {brands.data && brands.data.length > 0 ? (
                    brands.data.map((brand) => (
                        <div key={brand.id} className="p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xs flex items-center justify-between">
                            <div className="flex items-center space-x-3.5">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {brand.logo ? (
                                        <img src={`/storage/${brand.logo}`} alt={brand.name} className="object-contain w-full h-full p-1.5" />
                                    ) : (
                                        <span className="font-extrabold text-slate-500 text-base uppercase">{brand.name.substring(0, 2)}</span>
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm tracking-tight">{brand.name}</h4>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border mt-1 ${brand.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100' : 'bg-slate-100 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 border-slate-200'} uppercase tracking-wider`}>
                                        {brand.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-1.5">
                                <Link 
                                    href={route('brands.edit', brand.id)} 
                                    className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Link>

                                <Button 
                                    onClick={() => openDeleteModal(brand)}
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-500 hover:text-rose-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xs">
                        <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center mx-auto mb-3">
                            <Layers className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-slate-500 font-bold">No brands found</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination links={brands.links} />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal 
                show={deleteModalOpen}
                onClose={() => { setDeleteModalOpen(false); setBrandToDelete(null); }}
                onConfirm={handleConfirmDelete}
                title="Delete Manufacturer Brand"
                message="Are you sure you want to delete this brand? This action will remove the brand and all associated vehicle models permanently."
                itemName={brandToDelete?.name}
                loading={isDeleting}
            />
        </AuthenticatedLayout>
    );
}
