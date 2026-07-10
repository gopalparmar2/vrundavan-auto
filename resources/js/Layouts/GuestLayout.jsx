import React from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="w-full max-w-md min-h-[100dvh] bg-slate-50 relative flex flex-col justify-center px-6 safe-guest-wrapper shadow-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white">
            <div className="flex flex-col items-center mb-8">
                {/* Large Logo */}
                <Link href="/" className="flex flex-col items-center group">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-indigo-500/25 mb-4 group-hover:scale-105 transition-transform duration-200">
                        V
                    </div>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">VeloDrive</h1>
                <p className="text-xs text-slate-400 mt-1">Vehicle Dealership Management</p>
            </div>

            {/* Form Card */}
            <div className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-6 shadow-xl text-white">
                {children}
            </div>
        </div>
    );
}
