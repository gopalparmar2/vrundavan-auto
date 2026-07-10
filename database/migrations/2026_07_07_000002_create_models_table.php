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
        Schema::create('models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('brands')->onDelete('cascade');
            $table->string('name');
            $table->string('variant');
            $table->decimal('on_road_price', 12, 2);
            $table->decimal('ex_showroom_price', 12, 2)->nullable();
            $table->string('fuel_type'); // Petrol, Diesel, CNG, Electric, Hybrid
            $table->string('transmission'); // Manual, Automatic
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('models');
    }
};
