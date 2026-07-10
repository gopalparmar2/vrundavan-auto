import React, { useRef, useState } from 'react';
import { Dialog } from '@/Components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { UserX } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { validateForm, deleteUserSchema } from '@/lib/validation';

export default function DeleteUserForm({ trigger, className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        setError,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        if (!validateForm(deleteUserSchema, data, setError, clearErrors)) {
            return;
        }

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    const triggerElement = trigger ? (
        React.cloneElement(trigger, { onClick: confirmUserDeletion })
    ) : (
        <Button variant="destructive" onClick={confirmUserDeletion} className="w-full">
            Delete Account
        </Button>
    );

    if (trigger) {
        return (
            <>
                {triggerElement}
                <Dialog show={confirmingUserDeletion} onClose={closeModal}>
                    <form onSubmit={deleteUser} className="p-6 space-y-4">
                        <h2 className="text-base font-bold text-slate-800">
                            Are you sure you want to delete your account?
                        </h2>

                        <p className="text-xs text-slate-500 leading-relaxed">
                            Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                        </p>

                        <div>
                            <Label htmlFor="password" required>Password</Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="Confirm Password"
                            />

                            {errors.password && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.password}</div>}
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={closeModal} size="sm">
                                Cancel
                            </Button>

                            <Button type="submit" variant="destructive" size="sm" disabled={processing}>
                                Delete Account
                            </Button>
                        </div>
                    </form>
                </Dialog>
            </>
        );
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="flex items-center space-x-2.5 mb-6">
                <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                    <UserX className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-base font-bold text-slate-800">
                        Delete Account
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Permanently delete your account and all of its resources and data.
                    </p>
                </div>
            </header>

            {triggerElement}

            <Dialog show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 space-y-4">
                    <h2 className="text-base font-bold text-slate-800">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="text-xs text-slate-500 leading-relaxed">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div>
                        <Label htmlFor="password" required>Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Confirm Password"
                        />

                        {errors.password && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.password}</div>}
                    </div>

                    <div className="mt-6 flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={closeModal} size="sm">
                            Cancel
                        </Button>

                        <Button type="submit" variant="destructive" size="sm" disabled={processing}>
                            Delete Account
                        </Button>
                    </div>
                </form>
            </Dialog>
        </section>
    );
}
