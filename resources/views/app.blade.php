<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    class="h-full bg-slate-900 {{ auth()->user() && auth()->user()->theme === 'light' ? '' : 'dark' }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    <style>
        body {
            font-family: 'Outfit', sans-serif;
        }

        #app {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: stretch;
        }
    </style>
</head>

<body class="h-full antialiased bg-slate-900 text-slate-100 overflow-hidden">
    @inertia
</body>

</html>
