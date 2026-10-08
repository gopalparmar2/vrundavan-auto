import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function Toast({ toast, onClose }) {
    if (!toast || !toast.message) return null;

    const { type, message } = toast;

    const variantStyles = {
        success: 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-100',
        error: 'bg-destructive text-destructive-foreground border-destructive',
        destructive: 'bg-destructive text-destructive-foreground border-destructive',
        info: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100',
        default: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100',
    };

    const iconColors = {
        success: 'text-emerald-500',
        error: 'text-white',
        destructive: 'text-white',
        info: 'text-indigo-500',
        default: 'text-slate-500',
    };

    const isDestructive = type === 'error' || type === 'destructive';

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`relative flex items-start justify-between space-x-3 rounded-xl border p-4 shadow-lg transition-all ${variantStyles[type] || variantStyles.default}`}>
                <div className="flex items-start space-x-3 min-w-0 flex-1">
                    <div className="flex-shrink-0 pt-0.5">
                        {type === 'success' && <CheckCircle className={`w-4 h-4 ${iconColors.success}`} />}
                        {isDestructive && <AlertCircle className={`w-4 h-4 ${iconColors.error}`} />}
                        {type === 'info' && <Info className={`w-4 h-4 ${iconColors.info}`} />}
                    </div>
                    <div className="grid gap-1 min-w-0">
                        <div className="text-xs font-semibold leading-none tracking-tight">
                            {type === 'success' ? 'Success' : isDestructive ? 'Error' : 'Notification'}
                        </div>
                        <div className={`text-xs opacity-90 leading-normal ${isDestructive ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                            {message}
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className={`rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none ${isDestructive ? 'text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
