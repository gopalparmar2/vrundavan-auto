import React from 'react';
import { Dialog } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';

export default function DeleteConfirmModal({
    show = false,
    onClose = () => {},
    onConfirm = () => {},
    title = 'Confirm Deletion',
    message = 'Are you sure you want to delete this item? This action cannot be undone.',
    itemName = '',
    loading = false,
}) {
    return (
        <Dialog show={show} onClose={onClose}>
            <div className="p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {title}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {message}
                </p>

                {itemName && (
                    <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold font-mono truncate">
                        "{itemName}"
                    </div>
                )}

                <div className="mt-6 flex justify-end space-x-2 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        size="sm"
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onConfirm}
                        size="sm"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
