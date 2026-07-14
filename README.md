# Vehicle Dealership Management Mobile App (Vrundavan Auto)

A high-fidelity mobile application built using **Laravel 12**, **Tailwind CSS v4**, **Alpine.js**, and packaged for native platform compilation (Android & iOS) via **NativePHP**. 

---

## 🛠️ Tech Stack & Features

- **Core**: Laravel 12 (latest stable), SQLite (default local DB), DomPDF (`barryvdh/laravel-dompdf` for estimate exports).
- **Frontend**: Tailwind CSS v4, Alpine.js (for real-time calculations and dynamic async model loading).
- **Auth**: Laravel Breeze adapted into a dark glassmorphic mobile viewport design.
- **Native Packaging**: NativePHP for Mobile (`nativephp/mobile`) supporting iOS and Android runtimes.

---

## 🚀 Setup & Installation

Follow these steps to run the application locally or prepare it for native compiles.

### Prerequisites

- **PHP 8.2 or 8.3** (Note: NativePHP embeds a PHP 8.3 binary on physical devices).
- **Node.js 20+** and **npm**.
- **Composer**.

### 1. Clone & Install Dependencies

```bash
# Install PHP dependencies
composer install --ignore-platform-reqs

# Install JS dependencies
npm install
```

### 2. Configure Environment

The project is configured to use **SQLite** by default (ideal for local NativePHP applications).

```bash
# Copy env example
copy .env.example .env

# Generate application key
php artisan key:generate
```

Confirm that the database settings in `.env` indicate SQLite:
```ini
DB_CONNECTION=sqlite
```

### 3. Initialize SQLite Database & Seeds

Generate the database file and run all tables migrations along with mock seeders:

```bash
# Create SQLite database file
New-Item -Path "database/database.sqlite" -ItemType File -Force

# Run migrations and seed data
php artisan migrate:refresh --seed
```

This registers the following mock test accounts (all passwords are `password`):
- **Sales Rep**: `sales@dealership.com`
- **Admin**: `admin@dealership.com`
- **Test Sales**: `test@example.com`

---

## 💻 Running the App

### Web Local Development

To run the standard web version inside your browser (simulate mobile views using Chrome Developer Tools):

```bash
# Start Vite asset builder
npm run dev

# Start Laravel backend server
php artisan serve
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 📱 Packaging with NativePHP

NativePHP compiles the Laravel app by bundling a lightweight PHP CLI engine directly inside a native Android/iOS shell.

### Native Run / Live Development

To boot the app instantly inside a simulator or on a physical test device with live hot-reloading:

```bash
# Start NativePHP hot reload server
php artisan native:run
```

*Note: For testing on a physical mobile device instantly without full Xcode or Android Studio configurations, you can use the **NativePHP Jump** tool:*
```bash
php artisan native:jump
```

### Building Release Packages

Compile native `.apk`/`.ipa` packages ready to be signed and shipped to the App Store or Google Play:

```bash
# Compile Android release package
php artisan native:build android

# Compile iOS release package
php artisan native:build ios
```

---

## 🧪 Testing

The application includes a feature test suite covering user authentication, profile edits, and basic routing. To run tests:

```bash
php artisan test
```
