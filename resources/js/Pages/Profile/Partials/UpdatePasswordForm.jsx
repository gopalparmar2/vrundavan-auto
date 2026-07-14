import React, { useRef } from 'react';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Lock } from 'lucide-react';
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
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="space-y-4">
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
                    />

                    {errors.current_password && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.current_password}</div>}
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
                    />

                    {errors.password && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.password}</div>}
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
                    />

                    {errors.password_confirmation && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.password_confirmation}</div>}
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <Button type="submit" disabled={processing} className="w-full">
                        Save Password
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
