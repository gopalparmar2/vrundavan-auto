import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Input } from '@/Components/ui/input';
import { Select } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Plus, Search, Pencil, Trash2, Folder } from 'lucide-react';

export default function Index({ brands, search: initialSearch, status: initialStatus }) {
    const [search, setSearch] = useState(initialSearch || '');
    const [status, setStatus] = useState(initialStatus || '');

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

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this brand and all its models?')) {
            router.delete(route('brands.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Brands" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Brands</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Manage manufacturers and status</p>
                </div>
                <Link 
                    href={route('brands.create')} 
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-200 flex items-center space-x-1.5 transition-all active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Brand</span>
                </Link>
            </div>

            {/* Search & Filter Bar */}
            <form onSubmit={handleSearchSubmit} className="mb-5 flex space-x-2">
                <div className="relative flex-grow">
                    <Input 
                        type="text" 
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search brands..." 
                        className="pl-9 text-xs"
                    />
                    <div className="absolute left-3 top-3.5 text-slate-400">
                        <Search className="w-4 h-4" />
                    </div>
                </div>

                <Select 
                    value={status} 
                    onChange={handleStatusChange} 
                    className="w-32 text-xs"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>
            </form>

            {/* Brands List */}
            <div className="space-y-3">
                {brands.data && brands.data.length > 0 ? (
                    brands.data.map((brand) => (
                        <div key={brand.id} className="p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between">
                            <div className="flex items-center space-x-3.5">
                                {/* Logo / Avatar */}
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {brand.logo ? (
                                        <img src={`/storage/${brand.logo}`} alt={brand.name} className="object-contain w-full h-full p-1.5" />
                                    ) : (
                                        <span className="font-extrabold text-slate-400 text-lg uppercase">{brand.name.substring(0, 2)}</span>
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm tracking-tight">{brand.name}</h4>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border mt-1 ${brand.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200'} uppercase tracking-wider`}>
                                        {brand.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-1.5">
                                <Link 
                                    href={route('brands.edit', brand.id)} 
                                    className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Link>

                                <Button 
                                    onClick={() => handleDelete(brand.id)}
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                            <Folder className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-slate-500 font-semibold">No brands found</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Try refining your search or filters.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination links={brands.links} />
        </AuthenticatedLayout>
    );
}
