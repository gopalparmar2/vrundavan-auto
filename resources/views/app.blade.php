<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    class="h-full bg-slate-900 {{ auth()->user() && auth()->user()->theme === 'light' ? '' : 'dark' }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- App Icon & Favicon -->
    <link rel="icon" type="image/png" href="/assets/app_icon.png">
    <link rel="apple-touch-icon" href="/assets/app_icon.png">
    <link rel="shortcut icon" href="/assets/app_icon.png">

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
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
    </style>
</head>

<body class="min-h-screen antialiased bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
    <!-- Initial Splash Loader -->
    <div id="initial-page-loader" style="position: fixed; inset: 0; z-index: 9999; background: #020617; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Outfit', sans-serif; transition: opacity 0.4s ease, visibility 0.4s ease;">
        <div style="width: 56px; height: 56px; border-radius: 18px; background: rgba(99, 102, 241, 0.15); border: 1.5px solid rgba(99, 102, 241, 0.3); display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.3);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
                <path d="M15 18H9"/>
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
                <circle cx="17" cy="18" r="2"/>
                <circle cx="7" cy="18" r="2"/>
            </svg>
        </div>
    </div>

    @inertia

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(function () {
                var loader = document.getElementById('initial-page-loader');
                if (loader) {
                    loader.style.opacity = '0';
                    loader.style.visibility = 'hidden';
                    setTimeout(function () { loader.remove(); }, 400);
                }
            }, 300);
        });
    </script>
</body>

</html>
