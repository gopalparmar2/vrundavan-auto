import React from 'react';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { validateForm, updateProfileSchema } from '@/lib/validation';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, setError, clearErrors } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        if (!validateForm(updateProfileSchema, data, setError, clearErrors)) {
            return;
        }
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <Label htmlFor="name" required>Display Name</Label>

                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoFocus
                        autoComplete="name"
                        placeholder="Enter your name"
                        className="mt-1"
                    />

                    {errors.name && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.name}</div>}
                </div>

                <div>
                    <Label htmlFor="email">Email Address</Label>

                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        placeholder="Enter your email address"
                        disabled
                        className="mt-1 bg-slate-50 dark:bg-slate-950/60 cursor-not-allowed"
                    />

                    {errors.email && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.email}</div>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-2xl">
                        <p className="text-xs text-amber-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="block font-bold underline text-amber-900 mt-1 hover:text-amber-950 focus:outline-none"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-[10px] font-semibold text-emerald-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

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
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center space-x-2 min-w-[130px] justify-center"
                    >
                        {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                        <span>{processing ? 'Saving...' : 'Save Changes'}</span>
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
