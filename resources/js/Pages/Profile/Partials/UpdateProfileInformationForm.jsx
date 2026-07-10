import React from 'react';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { User } from 'lucide-react';
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
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="name" required>Name</Label>

                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoFocus
                        autoComplete="name"
                    />

                    {errors.name && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.name}</div>}
                </div>

                <div>
                    <Label htmlFor="email" required>Email Address</Label>

                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        disabled
                    />

                    {errors.email && <div className="text-rose-500 text-[10px] mt-1 font-medium">{errors.email}</div>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-xl">
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

                <div className="flex items-center gap-4 pt-2">
                    <Button type="submit" disabled={processing} className="w-full">
                        Save Changes
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
