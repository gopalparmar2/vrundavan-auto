<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleModel extends Model
{
    use HasFactory;

    protected $table = 'models';

    protected $fillable = [
        'brand_id',
        'name',
        'variant',
        'on_road_price',
        'ex_showroom_price',
        'fuel_type',
        'transmission',
        'image'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class, 'model_id');
    }
}
