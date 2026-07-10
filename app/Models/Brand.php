<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'logo', 'status'];

    public function models()
    {
        return $this->hasMany(VehicleModel::class, 'brand_id');
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class, 'brand_id');
    }
}
