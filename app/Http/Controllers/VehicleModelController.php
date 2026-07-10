<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\VehicleModel;
use App\Http\Requests\StoreModelRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VehicleModelController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $brandId = $request->input('brand_id');

        $brands = Brand::orderBy('name')->get();

        $models = VehicleModel::with('brand')
            ->when($search, function ($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                      ->orWhere('variant', 'like', '%' . $search . '%');
                });
            })
            ->when($brandId, function ($query, $brandId) {
                $query->where('brand_id', $brandId);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Models/Index', [
            'models' => $models,
            'brands' => $brands,
            'search' => $search,
            'brandId' => $brandId,
        ]);
    }

    public function create()
    {
        $brands = Brand::where('status', 'active')->orderBy('name')->get();
        return Inertia::render('Models/Create', [
            'brands' => $brands,
        ]);
    }

    public function store(StoreModelRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('models', 'public');
        }

        VehicleModel::create($data);

        return redirect()->route('models.index')->with('success', 'Model created successfully.');
    }

    public function edit(VehicleModel $model)
    {
        $brands = Brand::where('status', 'active')->orderBy('name')->get();
        return Inertia::render('Models/Edit', [
            'model' => $model,
            'brands' => $brands,
        ]);
    }

    public function update(StoreModelRequest $request, VehicleModel $model)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($model->image) {
                Storage::disk('public')->delete($model->image);
            }
            $data['image'] = $request->file('image')->store('models', 'public');
        }

        $model->update($data);

        return redirect()->route('models.index')->with('success', 'Model updated successfully.');
    }

    public function destroy(VehicleModel $model)
    {
        if ($model->image) {
            Storage::disk('public')->delete($model->image);
        }
        $model->delete();

        return redirect()->route('models.index')->with('success', 'Model deleted successfully.');
    }
}
