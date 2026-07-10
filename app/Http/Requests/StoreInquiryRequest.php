<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'brand_id' => 'required|exists:brands,id',
            'model_id' => 'required|exists:models,id',
            'source' => 'required|string|in:walk-in,phone,online',
            'notes' => 'nullable|string',
        ];
    }
}
