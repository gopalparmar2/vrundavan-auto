<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'phone',
        'email',
        'brand_id',
        'model_id',
        'source',
        'status',
        'notes',
        'user_id'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function model()
    {
        return $this->belongsTo(VehicleModel::class, 'model_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function estimate()
    {
        return $this->hasOne(Estimate::class, 'inquiry_id');
    }

    public function statusLogs()
    {
        return $this->hasMany(InquiryStatusLog::class, 'inquiry_id');
    }
}
