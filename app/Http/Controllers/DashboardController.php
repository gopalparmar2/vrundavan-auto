<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $totalInquiriesMonth = Inquiry::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
        
        $totalSalesMonth = Inquiry::where('status', 'Converted')
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->count();
            
        $pendingEstimates = Inquiry::where('status', 'Estimate Sent')->count();

        $recentInquiries = Inquiry::with(['brand', 'model'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'totalInquiriesMonth' => $totalInquiriesMonth,
            'totalSalesMonth' => $totalSalesMonth,
            'pendingEstimates' => $pendingEstimates,
            'recentInquiries' => $recentInquiries,
        ]);
    }
}
