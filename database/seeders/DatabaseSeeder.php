<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brand;
use App\Models\VehicleModel;
use App\Models\Inquiry;
use App\Models\Estimate;
use App\Models\InquiryStatusLog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Users
        $admin = User::create([
            'name' => 'Dealer Admin',
            'email' => 'admin@dealership.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $sales = User::create([
            'name' => 'John Sales',
            'email' => 'sales@dealership.com',
            'password' => Hash::make('password'),
            'role' => 'sales',
        ]);

        // Default test user
        $testUser = User::create([
            'name' => 'Test Sales Rep',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'role' => 'sales',
        ]);

        // 2. Create Brands
        $toyota = Brand::create(['name' => 'Toyota', 'status' => 'active']);
        $tesla = Brand::create(['name' => 'Tesla', 'status' => 'active']);
        $bmw = Brand::create(['name' => 'BMW', 'status' => 'active']);
        $ford = Brand::create(['name' => 'Ford', 'status' => 'inactive']); // inactive testing

        // 3. Create Models
        $camry = VehicleModel::create([
            'brand_id' => $toyota->id,
            'name' => 'Camry',
            'variant' => 'XLE Hybrid',
            'on_road_price' => 38500.00,
            'ex_showroom_price' => 32000.00,
            'fuel_type' => 'Hybrid',
            'transmission' => 'Automatic',
        ]);

        $rav4 = VehicleModel::create([
            'brand_id' => $toyota->id,
            'name' => 'RAV4',
            'variant' => 'XSE',
            'on_road_price' => 36200.00,
            'ex_showroom_price' => 31500.00,
            'fuel_type' => 'Petrol',
            'transmission' => 'Automatic',
        ]);

        $model3 = VehicleModel::create([
            'brand_id' => $tesla->id,
            'name' => 'Model 3',
            'variant' => 'Long Range',
            'on_road_price' => 49900.00,
            'ex_showroom_price' => 42400.00,
            'fuel_type' => 'Electric',
            'transmission' => 'Automatic',
        ]);

        $modely = VehicleModel::create([
            'brand_id' => $tesla->id,
            'name' => 'Model Y',
            'variant' => 'Performance',
            'on_road_price' => 56000.00,
            'ex_showroom_price' => 48000.00,
            'fuel_type' => 'Electric',
            'transmission' => 'Automatic',
        ]);

        $m3 = VehicleModel::create([
            'brand_id' => $bmw->id,
            'name' => '3 Series',
            'variant' => '330i M Sport',
            'on_road_price' => 52000.00,
            'ex_showroom_price' => 44500.00,
            'fuel_type' => 'Petrol',
            'transmission' => 'Automatic',
        ]);

        // 4. Create Inquiries, Estimates, and Status Logs
        // Inquiry 1: New Walk-in for Camry
        $inq1 = Inquiry::create([
            'customer_name' => 'Alice Smith',
            'phone' => '+1555123456',
            'email' => 'alice@gmail.com',
            'brand_id' => $toyota->id,
            'model_id' => $camry->id,
            'source' => 'walk-in',
            'status' => 'New',
            'notes' => 'Customer visited showroom and took a brochure. Highly interested in the Hybrid variant.',
            'user_id' => $sales->id,
            'created_at' => Carbon::now()->subDays(10),
        ]);
        InquiryStatusLog::create([
            'inquiry_id' => $inq1->id,
            'old_status' => null,
            'new_status' => 'New',
            'changed_by' => $sales->id,
            'created_at' => Carbon::now()->subDays(10),
        ]);

        // Inquiry 2: Negotiation Phone Inquiry for Tesla Model 3 (with Estimate)
        $inq2 = Inquiry::create([
            'customer_name' => 'Robert Johnson',
            'phone' => '+1555987654',
            'email' => 'robert.j@outlook.com',
            'brand_id' => $tesla->id,
            'model_id' => $model3->id,
            'source' => 'phone',
            'status' => 'Negotiation',
            'notes' => 'Customer called to discuss discounts on Model 3. Sent estimate on July 2.',
            'user_id' => $sales->id,
            'created_at' => Carbon::now()->subDays(8),
        ]);
        InquiryStatusLog::create([
            'inquiry_id' => $inq2->id,
            'old_status' => null,
            'new_status' => 'New',
            'changed_by' => $sales->id,
            'created_at' => Carbon::now()->subDays(8),
        ]);
        InquiryStatusLog::create([
            'inquiry_id' => $inq2->id,
            'old_status' => 'New',
            'new_status' => 'Contacted',
            'changed_by' => $sales->id,
            'created_at' => Carbon::now()->subDays(7),
        ]);
        InquiryStatusLog::create([
            'inquiry_id' => $inq2->id,
            'old_status' => 'Contacted',
            'new_status' => 'Estimate Sent',
            'changed_by' => $sales->id,
            'created_at' => Carbon::now()->subDays(5),
        ]);
        InquiryStatusLog::create([
            'inquiry_id' => $inq2->id,
            'old_status' => 'Estimate Sent',
            'new_status' => 'Negotiation',
            'changed_by' => $sales->id,
            'created_at' => Carbon::now()->subDays(2),
        ]);
        Estimate::create([
            'inquiry_id' => $inq2->id,
            'on_road_price' => 49900.00,
            'discount' => 1500.00,
            'accessories_cost' => 500.00,
            'insurance' => 1200.00,
            'rto_charges' => 800.00,
            'total_amount' => 49900.00 - 1500.00 + 500.00 + 1200.00 + 800.00, // 50900.00
        ]);

        // Inquiry 3: Converted (Sold) Online Inquiry for RAV4
        $inq3 = Inquiry::create([
            'customer_name' => 'Sarah Connor',
            'phone' => '+1555333222',
            'email' => 'sconnor@cyberdyne.com',
            'brand_id' => $toyota->id,
            'model_id' => $rav4->id,
            'source' => 'online',
            'status' => 'Converted',
            'notes' => 'Submitted online lead. Quick conversion. Purchased RAV4 with premium accessories package.',
            'user_id' => $testUser->id,
            'created_at' => Carbon::now()->subDays(15),
        ]);
        InquiryStatusLog::create([
            'inquiry_id' => $inq3->id,
            'old_status' => null,
            'new_status' => 'New',
            'changed_by' => $testUser->id,
            'created_at' => Carbon::now()->subDays(15),
        ]);
        InquiryStatusLog::create([
            'inquiry_id' => $inq3->id,
            'old_status' => 'New',
            'new_status' => 'Converted',
            'changed_by' => $testUser->id,
            'created_at' => Carbon::now()->subDays(12),
        ]);
        Estimate::create([
            'inquiry_id' => $inq3->id,
            'on_road_price' => 36200.00,
            'discount' => 500.00,
            'accessories_cost' => 1800.00,
            'insurance' => 950.00,
            'rto_charges' => 600.00,
            'total_amount' => 36200.00 - 500.00 + 1800.00 + 950.00 + 600.00, // 39050.00
        ]);

        // Inquiry 4: Lost Inquiry for BMW 3 Series
        $inq4 = Inquiry::create([
            'customer_name' => 'Michael Corleone',
            'phone' => '+1555777888',
            'email' => 'michael@genco.com',
            'brand_id' => $bmw->id,
            'model_id' => $m3->id,
            'source' => 'walk-in',
            'status' => 'Lost',
            'notes' => 'Looked at BMW 3 Series. Decided to buy from a competitor offering a better trade-in value.',
            'user_id' => $sales->id,
            'created_at' => Carbon::now()->subDays(20),
        ]);
        InquiryStatusLog::create([
            'inquiry_id' => $inq4->id,
            'old_status' => null,
            'new_status' => 'New',
            'changed_by' => $sales->id,
            'created_at' => Carbon::now()->subDays(20),
        ]);
        InquiryStatusLog::create([
            'inquiry_id' => $inq4->id,
            'old_status' => 'New',
            'new_status' => 'Lost',
            'changed_by' => $sales->id,
            'created_at' => Carbon::now()->subDays(18),
        ]);
    }
}
