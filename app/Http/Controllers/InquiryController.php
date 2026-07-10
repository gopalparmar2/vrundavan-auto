<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\VehicleModel;
use App\Models\Inquiry;
use App\Models\InquiryStatusLog;
use App\Http\Requests\StoreInquiryRequest;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');
        $brandId = $request->input('brand_id');
        $dateFrom = $request->input('date_from');
        $dateTo = $request->input('date_to');

        $brands = Brand::orderBy('name')->get();

        $inquiries = Inquiry::with(['brand', 'model', 'user'])
            ->when($search, function ($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('customer_name', 'like', '%' . $search . '%')
                      ->orWhere('phone', 'like', '%' . $search . '%')
                      ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($brandId, function ($query, $brandId) {
                $query->where('brand_id', $brandId);
            })
            ->when($dateFrom, function ($query, $dateFrom) {
                $query->whereDate('created_at', '>=', Carbon::parse($dateFrom));
            })
            ->when($dateTo, function ($query, $dateTo) {
                $query->whereDate('created_at', '<=', Carbon::parse($dateTo));
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Inquiries/Index', [
            'inquiries' => $inquiries,
            'brands' => $brands,
            'search' => $search,
            'status' => $status,
            'brandId' => $brandId,
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
        ]);
    }

    public function create()
    {
        $brands = Brand::where('status', 'active')->orderBy('name')->get();
        return Inertia::render('Inquiries/Create', [
            'brands' => $brands,
        ]);
    }

    public function store(StoreInquiryRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['status'] = 'New';

        $inquiry = Inquiry::create($data);

        // Log the status change
        InquiryStatusLog::create([
            'inquiry_id' => $inquiry->id,
            'old_status' => null,
            'new_status' => 'New',
            'changed_by' => auth()->id(),
        ]);

        return redirect()->route('inquiries.show', $inquiry)->with('success', 'Inquiry registered successfully.');
    }

    public function show(Inquiry $inquiry)
    {
        $inquiry->load(['brand', 'model', 'user', 'estimate', 'statusLogs.user']);
        return Inertia::render('Inquiries/Show', [
            'inquiry' => $inquiry,
        ]);
    }

    public function edit(Inquiry $inquiry)
    {
        $brands = Brand::where('status', 'active')->orderBy('name')->get();
        // Load models for currently selected brand
        $models = VehicleModel::where('brand_id', $inquiry->brand_id)->orderBy('name')->get();
        return Inertia::render('Inquiries/Edit', [
            'inquiry' => $inquiry,
            'brands' => $brands,
            'models' => $models,
        ]);
    }

    public function update(StoreInquiryRequest $request, Inquiry $inquiry)
    {
        $data = $request->validated();
        $inquiry->update($data);

        return redirect()->route('inquiries.show', $inquiry)->with('success', 'Inquiry details updated.');
    }

    public function updateStatus(Request $request, Inquiry $inquiry)
    {
        $request->validate([
            'status' => 'required|string|in:New,Contacted,Estimate Sent,Negotiation,Converted,Lost',
        ]);

        $oldStatus = $inquiry->status;
        $newStatus = $request->input('status');

        if ($oldStatus !== $newStatus) {
            $inquiry->update(['status' => $newStatus]);

            InquiryStatusLog::create([
                'inquiry_id' => $inquiry->id,
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
                'changed_by' => auth()->id(),
            ]);

            return redirect()->route('inquiries.show', $inquiry)->with('success', 'Status updated from ' . $oldStatus . ' to ' . $newStatus);
        }

        return redirect()->route('inquiries.show', $inquiry)->with('info', 'Status remains unchanged.');
    }

    public function getModelsForBrand(Brand $brand)
    {
        $models = VehicleModel::where('brand_id', $brand->id)->orderBy('name')->get();
        return response()->json($models);
    }
}
