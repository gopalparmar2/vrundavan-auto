import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Dialog } from '@/Components/ui/dialog';
import DeleteUserForm from './Partials/DeleteUserForm';
import { User, Lock, LogOut, UserX, ChevronRight, Sun, Moon, ShieldCheck, Mail, Calendar } from 'lucide-react';

export default function Edit({ auth }) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(auth.user.theme || 'dark');

    const handleThemeToggle = () => {
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setCurrentTheme(nextTheme);

        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        router.patch(route('profile.theme.update'), { theme: nextTheme }, {
            preserveScroll: true,
        });
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Account Settings" />

            <div className="w-full space-y-6">
                {/* User Summary Banner (Same design system as Dashboard first section) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/60 dark:from-indigo-950/40 dark:via-slate-900/60 dark:to-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-indigo-500/20 shadow-xs">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/30 flex-shrink-0">
                            {auth.user.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Account Credentials & Profile</span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mt-0.5">
                                {auth.user.name}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                                <Mail className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                                {auth.user.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-900/40 text-xs font-bold shadow-2xs">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Active Dealership Session</span>
                        </span>
                    </div>
                </div>

                {/* Settings Actions List */}
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/80">
                    {/* 1. Update Profile Information */}
                    <Link
                        href={route('profile.edit-info')}
                        className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">Personal Profile Information</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Update your display name and email address</span>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </Link>

                    {/* 2. Change Password */}
                    <Link
                        href={route('profile.change-password')}
                        className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                                <Lock className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">Change Account Password</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Keep your account credentials secure and protected</span>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </Link>

                    {/* 3. Theme Switcher */}
                    <Button
                        onClick={handleThemeToggle}
                        variant="ghost"
                        className="w-full h-auto flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group text-left rounded-none font-normal text-slate-800 dark:text-slate-200"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                                {currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </div>
                            <div>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">
                                    {currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                                    {currentTheme === 'dark' ? 'Prefer a lighter visual experience' : 'Easier on the eyes in low light conditions'}
                                </span>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </Button>

                    {/* 4. Log Out */}
                    <Button
                        onClick={() => setShowLogoutModal(true)}
                        variant="ghost"
                        className="w-full h-auto flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group text-left rounded-none font-normal text-slate-800 dark:text-slate-200"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 transition-colors group-hover:bg-amber-600 group-hover:text-white">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">Log Out</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Sign out of active dealership session</span>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </Button>

                    {/* 5. Delete Account */}
                    <DeleteUserForm
                        trigger={
                            <Button
                                variant="ghost"
                                className="w-full h-auto flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group text-left rounded-none font-normal"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                                        <UserX className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-sm font-bold text-rose-600 dark:text-rose-400 block">Delete Account</span>
                                        <span className="text-xs text-rose-500 dark:text-rose-500 block mt-0.5 font-medium">Permanently erase your dealer profile</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-rose-400 group-hover:text-rose-600 transition-colors" />
                            </Button>
                        }
                    />
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <Dialog show={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
                <div className="p-6 space-y-4">
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                        Confirm Log Out
                    </h2>

                    <p className="text-xs text-slate-400 leading-relaxed">
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
