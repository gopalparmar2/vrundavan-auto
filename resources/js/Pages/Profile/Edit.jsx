import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Dialog } from '@/Components/ui/dialog';
import DeleteUserForm from './Partials/DeleteUserForm';
import { User, Lock, LogOut, UserX, ChevronRight, Sun, Moon } from 'lucide-react';

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
            <Head title="Settings" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Settings</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage your credentials & account</p>
                </div>
            </div>

            {/* Settings List */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                {/* 1. Update Profile */}
                <Link
                    href={route('profile.edit-info')}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Update Profile</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Edit your name & email address</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                </Link>

                {/* 2. Change Password */}
                <Link
                    href={route('profile.change-password')}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Change Password</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Keep your account credentials secure</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                </Link>

                {/* 3. Theme Switcher */}
                <Button
                    onClick={handleThemeToggle}
                    variant="ghost"
                    className="w-full h-auto flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group text-left rounded-none font-normal text-slate-800 dark:text-slate-200"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50">
                            {currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </div>
                        <div>
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                                {currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                                {currentTheme === 'dark' ? 'Prefer a lighter visual experience' : 'Easier on the eyes in low light'}
                            </span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                </Button>

                {/* 4. Log Out */}
                <Button
                    onClick={() => setShowLogoutModal(true)}
                    variant="ghost"
                    className="w-full h-auto flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group text-left rounded-none font-normal text-slate-800 dark:text-slate-200"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-955/60 text-amber-600 dark:text-amber-400 transition-colors group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Log Out</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Sign out of active dealership session</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                </Button>

                {/* 5. Delete Account */}
                <DeleteUserForm
                    trigger={
                        <Button
                            variant="ghost"
                            className="w-full h-auto flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group text-left rounded-none font-normal"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-955/60 text-rose-600 dark:text-rose-455 transition-colors group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50">
                                    <UserX className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <span className="text-sm font-bold text-rose-600 dark:text-rose-400 block">Delete Account</span>
                                    <span className="text-[10px] text-rose-500 dark:text-rose-500 block mt-0.5 font-medium">Permanently erase your dealer profile</span>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-rose-400 dark:text-rose-500 group-hover:text-rose-600 dark:group-hover:text-rose-350 transition-colors" />
                        </Button>
                    }
                />
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
