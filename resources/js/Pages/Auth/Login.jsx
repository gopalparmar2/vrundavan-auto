import { Checkbox } from '@/Components/ui/checkbox';
import { InputError } from '@/Components/ui/input-error';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { validateForm, loginSchema } from '@/lib/validation';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        if (!validateForm(loginSchema, data, setError, clearErrors)) {
            return;
        }

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="email" required>Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        autoFocus={true}
                        placeholder="Enter your email address"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password" required>Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) =>
                            setData('remember', checked)
                        }
                    />
                    <Label htmlFor="remember" className="text-sm font-normal text-gray-600 dark:text-gray-400">
                        Remember me
                    </Label>
                </div>

                <div className="mt-6">
                    <Button className="w-full justify-center py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all" disabled={processing}>
                        Log in
                    </Button>
                </div>

                <div className="mt-5 flex flex-col space-y-2 text-center text-xs">
                    <Link
                        href={route('register')}
                        className="text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                        Don't have an account? Register
                    </Link>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-slate-400 hover:text-slate-300"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
            </form>
        </GuestLayout>
    );
}
