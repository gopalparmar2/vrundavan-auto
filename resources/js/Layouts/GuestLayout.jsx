import React from 'react';
import { Link } from '@inertiajs/react';
import { Car, ShieldCheck, BarChart3, Users } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-stretch justify-center relative overflow-hidden font-sans">
            {/* Ambient Background Blur Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="w-full flex min-h-screen">
                {/* Left Side: Desktop Branding Showcase Banner (Hidden on small screens) */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-955 p-12 flex-col justify-between relative overflow-hidden border-r border-indigo-500/20">
                    {/* Top Logo */}
                    <div className="flex items-center space-x-3 z-10">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-indigo-500/40 flex items-center justify-center shadow-xl shadow-indigo-500/30 overflow-hidden">
                            <img src="/assets/app_icon.png" alt="Vrundavan Auto" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold text-white tracking-tight">Vrundavan Auto</h2>
                            <p className="text-xs text-indigo-300 font-medium">Vehicle Dealership Suite</p>
                        </div>
                    </div>

                    {/* Middle Hero Showcase */}
                    <div className="my-auto z-10 max-w-lg space-y-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            Enterprise Showroom ERP
                        </span>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
                            Manage Your Vehicle Sales & Lead Pipeline Effortlessly
                        </h1>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Streamline inventory catalog, track customer inquiries, generate price estimates, and analyze monthly sales performance from a single unified workspace.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
                                    <Car className="w-4 h-4" />
                                </div>
                                <h4 className="text-xs font-bold text-white">Smart Inventory</h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">Manage brands & model variants</p>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
                                    <Users className="w-4 h-4" />
                                </div>
                                <h4 className="text-xs font-bold text-white">Lead Tracking</h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">Convert customer inquiries faster</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Footer Info */}
                    <div className="z-10 text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Vrundavan Auto Inc. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Auth Form Container */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 z-10">
                    <div className="w-full max-w-md">
                        {/* Mobile Header (Shown on LG and smaller) */}
                        <div className="lg:hidden flex flex-col items-center mb-8">
                            <Link href="/" className="flex flex-col items-center group mb-4">
                                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-xl shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                                    <img src="/assets/app_icon.png" alt="Vrundavan Auto" className="w-full h-full object-cover" />
                                </div>
                            </Link>
                            <h1 className="text-2xl font-bold tracking-tight text-white">Vrundavan Auto</h1>
                            <p className="text-xs text-slate-400 mt-1">Vehicle Dealership Management</p>
                        </div>

                        {/* Glassmorphic Form Container Card */}
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50 text-slate-100">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
