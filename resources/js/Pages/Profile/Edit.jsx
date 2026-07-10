import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Dialog } from '@/Components/ui/dialog';
import DeleteUserForm from './Partials/DeleteUserForm';
import { ArrowLeft, User, Lock, LogOut, UserX, ChevronRight } from 'lucide-react';

export default function Edit() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Settings" />

            {/* Header */}
            <div className="mb-6 flex items-center space-x-3">
                <Link 
                    href={route('dashboard')} 
                    className="p-2 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Settings</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Manage your credentials & account</p>
                </div>
            </div>

            {/* Settings List */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm divide-y divide-slate-100/60 overflow-hidden">
                {/* 1. Update Profile */}
                <Link 
                    href={route('profile.edit-info')} 
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-all group"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="text-sm font-bold text-slate-800 block">Update Profile</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Edit your name & email address</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </Link>

                {/* 2. Change Password */}
                <Link 
                    href={route('profile.change-password')} 
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-all group"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="text-sm font-bold text-slate-800 block">Change Password</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Keep your account credentials secure</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </Link>

                {/* 3. Log Out */}
                <Button 
                    onClick={() => setShowLogoutModal(true)} 
                    variant="ghost"
                    className="w-full h-auto flex items-center justify-between p-4 hover:bg-slate-50/50 transition-all group text-left rounded-none font-normal text-slate-800"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-slate-800 block">Log Out</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Sign out of active dealership session</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </Button>

                {/* 4. Delete Account */}
                <DeleteUserForm 
                    trigger={
                        <Button 
                            variant="ghost"
                            className="w-full h-auto flex items-center justify-between p-4 hover:bg-rose-50/20 transition-all group text-left rounded-none font-normal"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-xl bg-rose-50 text-rose-600 transition-colors group-hover:bg-rose-100">
                                    <UserX className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <span className="text-sm font-bold text-rose-600 block">Delete Account</span>
                                    <span className="text-[10px] text-rose-400 block mt-0.5 font-medium">Permanently erase your dealer profile</span>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-rose-300 group-hover:text-rose-500 transition-colors" />
                        </Button>
                    }
                />
            </div>

            {/* Logout Confirmation Modal */}
            <Dialog show={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
                <div className="p-6 space-y-4">
                    <h2 className="text-base font-bold text-slate-800">
                        Confirm Log Out
                    </h2>
                    
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Are you sure you want to log out of your dealership account? You will need to sign in again to access client pipeline reports and estimates.
                    </p>

                    <div className="mt-6 flex justify-end space-x-2">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setShowLogoutModal(false)}
                            size="sm"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="button" 
                            variant="destructive" 
                            onClick={handleLogout}
                            size="sm"
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </Dialog>
        </AuthenticatedLayout>
    );
}
