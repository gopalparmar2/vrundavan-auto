import React from 'react';
import { Loader2, Truck } from 'lucide-react';

export default function MobileLoader({ 
    type = 'full', // 'full' | 'overlay' | 'inline' | 'button'
    className = '' 
}) {
    if (type === 'button') {
        return (
            <div className={`flex items-center justify-center space-x-2 ${className}`}>
                <Loader2 className="w-4 h-4 animate-spin text-current" />
            </div>
        );
    }

    if (type === 'inline') {
        return (
            <div className={`py-8 flex flex-col items-center justify-center ${className}`}>
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-500 flex items-center justify-center border border-indigo-500/30 shadow-md">
                    <Truck className="w-5 h-5 animate-pulse" />
                </div>
            </div>
        );
    }

    // Clean Minimal Overlay Loader (Vehicle Icon + Shimmer Bar)
    return (
        <div className={`fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in duration-200 ${className}`}>
            <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 p-6 rounded-3xl shadow-2xl flex flex-col items-center max-w-[200px] w-full relative overflow-hidden backdrop-blur-xl">
                {/* Glowing Background Pulse */}
                <div className="absolute -top-10 -left-10 w-28 h-28 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-purple-500/20 rounded-full blur-xl animate-pulse" />

                {/* Clean Vehicle Icon Container (No outer spinning ring) */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-950 to-indigo-950 border border-indigo-500/40 flex items-center justify-center shadow-xl mb-4 relative overflow-hidden">
                    <Truck className="w-7 h-7 text-indigo-400 animate-pulse" />
                </div>

                {/* Shimmer Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full animate-indeterminate-bar" />
                </div>
            </div>
        </div>
    );
}
