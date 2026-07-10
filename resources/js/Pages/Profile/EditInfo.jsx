import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { ArrowLeft } from 'lucide-react';

export default function EditInfo({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Update Profile" />

            {/* Header */}
            <div className="mb-6 flex items-center space-x-3">
                <Link 
                    href={route('profile.edit')} 
                    className="p-2 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Update Profile</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Edit your account name and email address</p>
                </div>
            </div>

            {/* Form Box */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </div>
        </AuthenticatedLayout>
    );
}
