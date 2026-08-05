import React from 'react';

export default function PageSkeleton({ type = 'dashboard' }) {
    // Helper pulse block
    const Pulse = ({ className = '' }) => (
        <div className={`bg-slate-200 dark:bg-slate-800/80 animate-pulse rounded-xl ${className}`} />
    );

    if (type === 'dashboard') {
        return (
            <div className="space-y-6 animate-in fade-in duration-200">
                {/* Header Skeleton */}
                <div className="space-y-2">
                    <Pulse className="w-28 h-3" />
                    <Pulse className="w-48 h-7" />
                    <Pulse className="w-64 h-3.5" />
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-3.5 rounded-2xl space-y-3 shadow-xs">
                            <Pulse className="w-12 h-2.5" />
                            <Pulse className="w-10 h-7" />
                            <Pulse className="w-16 h-2" />
                        </div>
                    ))}
                </div>

                {/* Quick Actions Skeleton */}
                <div className="space-y-3">
                    <Pulse className="w-24 h-3" />
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-4 rounded-2xl flex flex-col items-center justify-center space-y-2.5">
                                <Pulse className="w-10 h-10 rounded-xl" />
                                <Pulse className="w-16 h-3" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Inquiries Skeleton */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Pulse className="w-32 h-3" />
                        <Pulse className="w-14 h-3" />
                    </div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-3.5 rounded-2xl space-y-3 shadow-xs">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1.5">
                                    <Pulse className="w-32 h-4" />
                                    <Pulse className="w-24 h-3" />
                                </div>
                                <Pulse className="w-16 h-5 rounded-full" />
                            </div>
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
                                <Pulse className="w-36 h-3" />
                                <Pulse className="w-12 h-3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'brands' || type === 'models') {
        return (
            <div className="space-y-5 animate-in fade-in duration-200">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="space-y-1.5">
                        <Pulse className="w-24 h-6" />
                        <Pulse className="w-40 h-3" />
                    </div>
                    <Pulse className="w-24 h-9 rounded-xl" />
                </div>

                {/* Search & Filter */}
                <div className="flex space-x-2">
                    <Pulse className="flex-grow h-10 rounded-xl" />
                    <Pulse className="w-28 h-10 rounded-xl" />
                </div>

                {/* List Items Skeleton */}
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-3.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl flex items-center justify-between shadow-xs">
                            <div className="flex items-center space-x-3.5">
                                <Pulse className="w-12 h-12 rounded-xl" />
                                <div className="space-y-2">
                                    <Pulse className="w-28 h-4" />
                                    <Pulse className="w-16 h-3 rounded-full" />
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Pulse className="w-7 h-7 rounded-lg" />
                                <Pulse className="w-7 h-7 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'inquiries') {
        return (
            <div className="space-y-5 animate-in fade-in duration-200">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="space-y-1.5">
                        <Pulse className="w-28 h-6" />
                        <Pulse className="w-44 h-3" />
                    </div>
                    <Pulse className="w-28 h-9 rounded-xl" />
                </div>

                {/* Search & Filter */}
                <div className="flex space-x-2">
                    <Pulse className="flex-grow h-10 rounded-xl" />
                    <Pulse className="w-10 h-10 rounded-xl" />
                </div>

                {/* Lead List Items Skeleton */}
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-3.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-3 shadow-xs">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1.5">
                                    <Pulse className="w-36 h-4" />
                                    <Pulse className="w-24 h-3" />
                                </div>
                                <Pulse className="w-20 h-5 rounded-full" />
                            </div>
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <Pulse className="w-40 h-3" />
                                <Pulse className="w-14 h-3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'reports') {
        return (
            <div className="space-y-5 animate-in fade-in duration-200">
                {/* Header */}
                <div className="space-y-1.5">
                    <Pulse className="w-32 h-6" />
                    <Pulse className="w-48 h-3" />
                </div>

                {/* Filters */}
                <div className="p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                        <Pulse className="h-9 rounded-xl" />
                        <Pulse className="h-9 rounded-xl" />
                        <Pulse className="h-9 rounded-xl" />
                    </div>
                </div>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <Pulse className="h-10 rounded-xl" />
                    <Pulse className="h-10 rounded-xl" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                        <Pulse className="w-24 h-3" />
                        <Pulse className="w-28 h-6" />
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                        <Pulse className="w-24 h-3" />
                        <Pulse className="w-20 h-6" />
                    </div>
                </div>

                {/* Chart Box Skeleton */}
                <div className="p-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <Pulse className="w-40 h-4" />
                    <div className="h-32 flex items-end justify-between px-2 gap-2">
                        {[40, 65, 80, 50, 90, 70, 85, 60, 75, 55, 95, 60].map((h, idx) => (
                            <div key={idx} className="w-5 bg-slate-200 dark:bg-slate-800/80 rounded-t-md animate-pulse" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Default Generic Page Skeleton
    return (
        <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-2">
                <Pulse className="w-36 h-6" />
                <Pulse className="w-56 h-3" />
            </div>

            <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                        <Pulse className="w-3/4 h-4" />
                        <Pulse className="w-1/2 h-3" />
                    </div>
                ))}
            </div>
        </div>
    );
}
