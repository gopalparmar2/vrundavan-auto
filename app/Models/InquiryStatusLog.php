<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InquiryStatusLog extends Model
{
    use HasFactory;

    protected $table = 'inquiry_status_logs';

    protected $fillable = [
        'inquiry_id',
        'old_status',
        'new_status',
        'changed_by'
    ];

    public function inquiry()
    {
        return $this->belongsTo(Inquiry::class, 'inquiry_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
