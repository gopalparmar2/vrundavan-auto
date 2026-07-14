import { InputError } from '@/Components/ui/input-error';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { validateForm, forgotPasswordSchema } from '@/lib/validation';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (!validateForm(forgotPasswordSchema, data, setError, clearErrors)) {
            return;
        }

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-slate-300">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="email" required>Email Address</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoFocus={true}
                        placeholder="Enter your email address"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </div>

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-6">
                    <Button className="w-full justify-center py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all" disabled={processing}>
                        Email Password Reset Link
                    </Button>
                </div>

                <div className="mt-4 text-center text-xs">
                    <Link
                        href={route('login')}
                        className="text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                        Back to Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
