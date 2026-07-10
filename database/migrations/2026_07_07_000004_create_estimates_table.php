<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('estimates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inquiry_id')->constrained('inquiries')->onDelete('cascade');
            $table->decimal('on_road_price', 12, 2);
            $table->decimal('discount', 12, 2)->default(0.00);
            $table->decimal('accessories_cost', 12, 2)->default(0.00);
            $table->decimal('insurance', 12, 2)->default(0.00);
            $table->decimal('rto_charges', 12, 2)->default(0.00);
            $table->decimal('total_amount', 12, 2);
            $table->string('pdf_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estimates');
    }
};
