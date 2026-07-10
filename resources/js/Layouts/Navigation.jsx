import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Home, Layers, Car, MessageSquare, Settings } from 'lucide-react';

export default function Navigation() {
    const { url, props } = usePage();
    const { auth } = props;

    const isActive = (path) => {
        // Matches base route or child routes
        if (path === '/dashboard') {
            return url === '/dashboard';
        }
        return url.startsWith(path);
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 max-w-[calc(100%-2rem)] w-[400px] z-50 bg-white/85 border border-slate-100/80 px-2.5 py-1.5 rounded-2xl flex justify-around items-center shadow-[0_12px_32px_rgba(99,102,241,0.12)] backdrop-blur-lg transition-all duration-300">
            {/* Home / Dashboard */}
            <Link 
                href={route('dashboard')} 
                className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all duration-300 relative ${isActive('/dashboard') ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
            >
                <Home className={`w-5 h-5 mb-0.5 transition-all duration-300 ${isActive('/dashboard') ? 'scale-110 -translate-y-0.5' : 'hover:scale-105'}`} />
                <span className="text-[9px] font-medium tracking-wide uppercase">Home</span>
                {isActive('/dashboard') && (
                    <span className="absolute bottom-0 w-1 h-1 rounded-full bg-indigo-600 animate-pulse"></span>
                )}
            </Link>

            {/* Brands */}
            <Link 
                href={route('brands.index')} 
                className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all duration-300 relative ${isActive('/brands') ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
            >
                <Layers className={`w-5 h-5 mb-0.5 transition-all duration-300 ${isActive('/brands') ? 'scale-110 -translate-y-0.5' : 'hover:scale-105'}`} />
                <span className="text-[9px] font-medium tracking-wide uppercase">Brands</span>
                {isActive('/brands') && (
                    <span className="absolute bottom-0 w-1 h-1 rounded-full bg-indigo-600 animate-pulse"></span>
                )}
            </Link>

            {/* Models */}
            <Link 
                href={route('models.index')} 
                className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all duration-300 relative ${isActive('/models') ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
            >
                <Car className={`w-5 h-5 mb-0.5 transition-all duration-300 ${isActive('/models') ? 'scale-110 -translate-y-0.5' : 'hover:scale-105'}`} />
                <span className="text-[9px] font-medium tracking-wide uppercase">Models</span>
                {isActive('/models') && (
                    <span className="absolute bottom-0 w-1 h-1 rounded-full bg-indigo-600 animate-pulse"></span>
                )}
            </Link>

            {/* Inquiries */}
            <Link 
                href={route('inquiries.index')} 
                className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all duration-300 relative ${isActive('/inquiries') ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
            >
                <MessageSquare className={`w-5 h-5 mb-0.5 transition-all duration-300 ${isActive('/inquiries') ? 'scale-110 -translate-y-0.5' : 'hover:scale-105'}`} />
                <span className="text-[9px] font-medium tracking-wide uppercase">Leads</span>
                {isActive('/inquiries') && (
                    <span className="absolute bottom-0 w-1 h-1 rounded-full bg-indigo-600 animate-pulse"></span>
                )}
            </Link>

            {/* Settings */}
            <Link 
                href={route('profile.edit')} 
                className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all duration-300 relative ${isActive('/profile') ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
            >
                <Settings className={`w-5 h-5 mb-0.5 transition-all duration-300 ${isActive('/profile') ? 'scale-110 -translate-y-0.5' : 'hover:scale-105'}`} />
                <span className="text-[9px] font-medium tracking-wide uppercase">Settings</span>
                {isActive('/profile') && (
                    <span className="absolute bottom-0 w-1 h-1 rounded-full bg-indigo-600 animate-pulse"></span>
                )}
            </Link>
        </div>
    );
}
