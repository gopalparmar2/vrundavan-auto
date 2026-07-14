import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import { ArrowLeft } from 'lucide-react';

export default function ChangePassword() {
    return (
        <AuthenticatedLayout>
            <Head title="Change Password" />

            {/* Header */}
            <div className="mb-6 flex items-center space-x-3">
                <Link 
                    href={route('profile.edit')} 
                    className="p-2 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center justify-center"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Change Password</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Keep your account credentials secure</p>
                </div>
            </div>

            {/* Form Box */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                <UpdatePasswordForm className="max-w-xl" />
            </div>
        </AuthenticatedLayout>
    );
}
