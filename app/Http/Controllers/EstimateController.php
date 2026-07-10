<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Models\Estimate;
use App\Models\InquiryStatusLog;
use App\Http\Requests\StoreEstimateRequest;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class EstimateController extends Controller
{
    public function create(Inquiry $inquiry)
    {
        $inquiry->load(['brand', 'model']);
        
        // If there's already an estimate, redirect back with a message
        if ($inquiry->estimate) {
            return redirect()->route('inquiries.show', $inquiry)->with('info', 'An estimate has already been generated for this inquiry.');
        }

        return Inertia::render('Estimates/Create', [
            'inquiry' => $inquiry,
        ]);
    }

    public function store(StoreEstimateRequest $request)
    {
        $data = $request->validated();
        $inquiry = Inquiry::findOrFail($data['inquiry_id']);

        // Auto-fill price from model
        $onRoadPrice = $inquiry->model->on_road_price;

        $discount = $data['discount'] ?? 0;
        $accessories = $data['accessories_cost'] ?? 0;
        $insurance = $data['insurance'] ?? 0;
        $rto = $data['rto_charges'] ?? 0;

        $totalAmount = $onRoadPrice - $discount + $accessories + $insurance + $rto;

        $estimate = Estimate::create([
            'inquiry_id' => $inquiry->id,
            'on_road_price' => $onRoadPrice,
            'discount' => $discount,
            'accessories_cost' => $accessories,
            'insurance' => $insurance,
            'rto_charges' => $rto,
            'total_amount' => $totalAmount,
        ]);

        // Auto transition status to 'Estimate Sent'
        if (in_array($inquiry->status, ['New', 'Contacted'])) {
            $oldStatus = $inquiry->status;
            $inquiry->update(['status' => 'Estimate Sent']);

            InquiryStatusLog::create([
                'inquiry_id' => $inquiry->id,
                'old_status' => $oldStatus,
                'new_status' => 'Estimate Sent',
                'changed_by' => auth()->id(),
            ]);
        }

        return redirect()->route('inquiries.show', $inquiry)->with('success', 'Estimate generated and inquiry status updated.');
    }

    public function download(Estimate $estimate)
    {
        $estimate->load(['inquiry.brand', 'inquiry.model', 'inquiry.user']);

        $pdf = Pdf::loadView('estimates.pdf', compact('estimate'));
        
        $filename = 'estimate_' . strtolower(str_replace(' ', '_', $estimate->inquiry->customer_name)) . '_' . $estimate->id . '.pdf';
        
        return $pdf->download($filename);
    }
}
