<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estimate extends Model
{
    use HasFactory;

    protected $fillable = [
        'inquiry_id',
        'on_road_price',
        'discount',
        'accessories_cost',
        'insurance',
        'rto_charges',
        'total_amount',
        'pdf_path'
    ];

    public function inquiry()
    {
        return $this->belongsTo(Inquiry::class, 'inquiry_id');
    }
}
