import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    // Helper to decode HTML entities like &laquo; and &raquo;
    const cleanLabel = (label) => {
        return label
            .replace('&laquo;', '«')
            .replace('&raquo;', '»')
            .replace('Previous', 'Prev')
            .replace('Next', 'Next');
    };

    return (
        <div className="flex flex-wrap justify-center items-center gap-1.5 mt-6">
            {links.map((link, index) => {
                if (link.url === null) {
                    return (
                        <span
                            key={index}
                            className="px-3.5 py-2 text-xs text-slate-400 bg-slate-100 rounded-lg border border-slate-200/50 cursor-not-allowed select-none"
                            dangerouslySetInnerHTML={{ __html: cleanLabel(link.label) }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-3.5 py-2 text-xs rounded-lg border transition-all ${
                            link.active
                                ? 'bg-indigo-600 border-indigo-600 text-white font-bold'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        dangerouslySetInnerHTML={{ __html: cleanLabel(link.label) }}
                    />
                );
            })}
        </div>
    );
}
