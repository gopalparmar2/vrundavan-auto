import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';

export default function AuthenticatedLayout({ children }) {
    const { auth, flash } = usePage().props;


    // Toast notifications state
    const [toast, setToast] = useState(null);

    // Sync theme preference with document class list
    useEffect(() => {
        const theme = auth.user?.theme || 'dark';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [auth.user?.theme]);

    useEffect(() => {
        if (flash.success) {
            setToast({ type: 'success', message: flash.success });
        } else if (flash.error) {
            setToast({ type: 'error', message: flash.error });
        } else if (flash.info) {
            setToast({ type: 'info', message: flash.info });
        }
    }, [flash]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div className="w-full max-w-md h-[100dvh] bg-slate-50 text-slate-800 dark:bg-gradient-to-tr dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 dark:text-white relative flex flex-col shadow-2xl border-x border-slate-200 dark:border-slate-950 overflow-hidden">
            {/* Success/Info/Error Toasts */}
            {toast && (
                <div className="fixed safe-toast left-1/2 -translate-x-1/2 w-11/12 max-w-[380px] z-50 transition-all duration-300 transform translate-y-0">
                    {toast.type === 'success' && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl shadow-lg flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs text-center">✓</span>
                            <span className="text-xs font-medium">{toast.message}</span>
                        </div>
                    )}
                    {toast.type === 'error' && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl shadow-lg flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs text-center">!</span>
                            <span className="text-xs font-medium">{toast.message}</span>
                        </div>
                    )}
                    {toast.type === 'info' && (
                        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl shadow-lg flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs text-center">i</span>
                            <span className="text-xs font-medium">{toast.message}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Main Scrollable App Content */}
            <main className="flex-grow overflow-y-auto pb-28">
                {/* Header inside scrollable wrapper (non-sticky) */}
                <header className="px-4 py-4 safe-header flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center space-x-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                            V
                        </div>
                        <span className="font-extrabold text-slate-800 dark:text-slate-100 text-base tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Vrundavan Auto</span>
                    </Link>
                </header>

                <div className="px-4">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation Tab Bar */}
            <Navigation />
        </div>
    );
}
