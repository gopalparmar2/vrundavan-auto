import React, { useRef } from 'react';
import { Transition } from '@headlessui/react';
import { useForm, Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { validateForm, updatePasswordSchema } from '@/lib/validation';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
        setError,
        clearErrors,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        if (!validateForm(updatePasswordSchema, data, setError, clearErrors)) {
            return;
        }
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="space-y-5">
                <div>
                    <Label htmlFor="current_password" required>Current Password</Label>

                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter current password"
                        className="mt-1"
                    />

                    {errors.current_password && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.current_password}</div>}
                </div>

                <div>
                    <Label htmlFor="password" required>New Password</Label>

                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter new password"
                        className="mt-1"
                    />

                    {errors.password && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.password}</div>}
                </div>

                <div>
                    <Label htmlFor="password_confirmation" required>Confirm Password</Label>

                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm new password"
                        className="mt-1"
                    />

                    {errors.password_confirmation && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.password_confirmation}</div>}
                </div>

                {/* Action Footer: Proper Submit and Cancel buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end space-x-3">
                    <Link
                        href={route('profile.edit')}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
                    >
                        Cancel
                    </Link>
                    <Button 
                        type="submit" 
                        disabled={processing}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center space-x-2 min-w-[140px] justify-center"
                    >
                        {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                        <span>{processing ? 'Saving...' : 'Save Password'}</span>
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100/50 animate-pulse">
                            Saved
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
