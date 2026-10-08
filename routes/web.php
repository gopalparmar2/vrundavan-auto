<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\VehicleModelController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::middleware(['auth'])->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile/edit-info', [ProfileController::class, 'editInfo'])->name('profile.edit-info');
    Route::get('/profile/change-password', [ProfileController::class, 'changePassword'])->name('profile.change-password');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/theme', [ProfileController::class, 'updateTheme'])->name('profile.theme.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Brands CRUD
    Route::resource('brands', BrandController::class)->except(['show']);
    // API routes for dynamic form options
    Route::get('api/brands', function() {
        return response()->json(\App\Models\Brand::where('status', 'active')->orderBy('name')->get());
    })->name('api.brands.index');
    Route::get('brands/{brand}/models', [InquiryController::class, 'getModelsForBrand'])->name('brands.models');

    // Models CRUD
    Route::resource('models', VehicleModelController::class)->except(['show']);

    // Inquiries CRUD & Status Transitions
    Route::resource('inquiries', InquiryController::class);
    Route::patch('inquiries/{inquiry}/status', [InquiryController::class, 'updateStatus'])->name('inquiries.status.update');

    // Estimate Generation & Downloads
    Route::get('inquiries/{inquiry}/estimates/create', [EstimateController::class, 'create'])->name('estimates.create');
    Route::post('estimates', [EstimateController::class, 'store'])->name('estimates.store');
    Route::get('estimates/{estimate}/download', [EstimateController::class, 'download'])->name('estimates.download');

    // Reports & Exports
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('reports/export/csv', [ReportController::class, 'exportCsv'])->name('reports.export.csv');
    Route::get('reports/export/pdf', [ReportController::class, 'exportPdf'])->name('reports.export.pdf');
});

require __DIR__.'/auth.php';
