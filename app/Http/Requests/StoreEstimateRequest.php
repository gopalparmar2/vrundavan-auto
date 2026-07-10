<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEstimateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'inquiry_id' => 'required|exists:inquiries,id',
            'discount' => 'nullable|numeric|min:0',
            'accessories_cost' => 'nullable|numeric|min:0',
            'insurance' => 'nullable|numeric|min:0',
            'rto_charges' => 'nullable|numeric|min:0',
        ];
    }
}
