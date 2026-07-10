<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreModelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'variant' => 'required|string|max:255',
            'on_road_price' => 'required|numeric|min:0',
            'ex_showroom_price' => 'nullable|numeric|min:0',
            'fuel_type' => 'required|string|max:255',
            'transmission' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
