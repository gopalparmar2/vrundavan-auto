import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';
import { Toast } from '@/Components/ui/toast';
import PageSkeleton from '@/Components/PageSkeleton';
import {
    CheckCircle,
    AlertCircle,
    Info,
    Menu,
    PanelLeftClose,
    PanelLeft,
    Sun,
    Moon,
    Settings,
    LogOut,
    ChevronDown,
    Car,
    UserPlus,
    X
} from 'lucide-react';

export default function AuthenticatedLayout({ children }) {
    const page = usePage();
    const { auth, flash } = page.props;
    const currentUrl = page.url || '';

    // Layout states
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        return localStorage.getItem('vrundavan_sidebar_collapsed') === 'true';
    });
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
    const userMenuRef = useRef(null);

    // Toast notifications state
    const [toast, setToast] = useState(null);

    // Page navigation loading state
    const [isNavigating, setIsNavigating] = useState(false);
    const [navTargetUrl, setNavTargetUrl] = useState('');

    // Toggle sidebar collapse
    const toggleSidebar = () => {
        const nextState = !sidebarCollapsed;
        setSidebarCollapsed(nextState);
        localStorage.setItem('vrundavan_sidebar_collapsed', String(nextState));
    };

    // Outside click listener for profile dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Navigation progress listener
    useEffect(() => {
        const removeStartEventListener = router.on('start', (event) => {
            setIsNavigating(true);
            setNavTargetUrl(event.detail?.visit?.url?.pathname || currentUrl);
        });
        const removeFinishEventListener = router.on('finish', () => {
            setIsNavigating(false);
            setMobileDrawerOpen(false);
        });

        return () => {
            removeStartEventListener();
            removeFinishEventListener();
        };
    }, [currentUrl]);

    // Determine skeleton type from target URL or current URL
    const getSkeletonType = () => {
        const target = navTargetUrl || currentUrl;
        if (target.includes('/dashboard')) return 'dashboard';
        if (target.includes('/brands')) return 'brands';
        if (target.includes('/models')) return 'models';
        if (target.includes('/inquiries')) return 'inquiries';
        if (target.includes('/reports')) return 'reports';
        return 'default';
    };

    // Theme toggle
    const currentTheme = auth?.user?.theme || 'dark';
    const handleThemeToggle = () => {
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        router.patch(route('profile.theme.update'), { theme: nextTheme }, {
            preserveScroll: true,
        });
    };

    // Theme initialization sync
    useEffect(() => {
        if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [currentTheme]);

    // Flash toast listener
    useEffect(() => {
        if (flash?.success) {
            setToast({ type: 'success', message: flash.success });
        } else if (flash?.error) {
            setToast({ type: 'error', message: flash.error });
        } else if (flash?.info) {
            setToast({ type: 'info', message: flash.info });
        }
    }, [flash]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen w-full bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex relative font-sans">
            {/* Top Navigation Shimmer Loading Bar */}
            {isNavigating && (
                <div className="fixed top-0 left-0 right-0 h-1 bg-indigo-500/20 z-50 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-indeterminate-bar" />
                </div>
            )}

            {/* Sidebar Navigation */}
            <Navigation
                isMobileOpen={mobileDrawerOpen}
                setIsMobileOpen={setMobileDrawerOpen}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />

            {/* Main Web App Layout Wrapper */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
                {/* Global Sticky Desktop & Mobile Top Header Bar */}
                <header className="sticky top-0 z-40 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/90 dark:border-slate-800/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
                    {/* Left section: Drawer Toggle & Page Title */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        {/* Mobile Drawer Open Button */}
                        <button
                            onClick={() => setMobileDrawerOpen(true)}
                            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Open Navigation"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Sidebar Collapse Toggle Button (Desktop) */}
                        <button
                            onClick={toggleSidebar}
                            className="hidden md:flex p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            {sidebarCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Right section: Theme Switcher, Quick Actions, User Avatar Profile */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Dark/Light Theme Toggle */}
                        <button
                            onClick={handleThemeToggle}
                            className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/60 dark:border-slate-800/60"
                            title={currentTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {currentTheme === 'dark' ? (
                                <Sun className="w-4 h-4 text-amber-400" />
                            ) : (
                                <Moon className="w-4 h-4 text-indigo-600" />
                            )}
                        </button>

                        {/* User Profile Dropdown Menu */}
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center space-x-2.5 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border border-slate-200/60 dark:border-slate-800/60"
                            >
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-indigo-500/20">
                                    {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <span className="hidden sm:block text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[120px] truncate">
                                    {auth?.user?.name}
                                </span>
                                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu Box */}
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {/* User Info Header */}
                                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/80">
                                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                                            {auth?.user?.name}
                                        </p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                            {auth?.user?.email}
                                        </p>
                                    </div>

                                    {/* Links */}
                                    <div className="py-1">
                                        <Link
                                            href={route('profile.edit')}
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                                        >
                                            <Settings className="w-4 h-4 mr-2.5 text-slate-400" />
                                            <span>Settings & Account</span>
                                        </Link>
                                    </div>

                                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-1">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center px-4 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4 mr-2.5 text-rose-500" />
                                            <span>Log Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Floating Toast Component */}
                {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

                {/* Full Width Main Content Area */}
                <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
                    {isNavigating ? (
                        <PageSkeleton type={getSkeletonType()} />
                    ) : (
                        children
                    )}
                </main>
            </div>
        </div>
    );
}
