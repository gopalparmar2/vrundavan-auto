<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\VehicleModel;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->input('year', Carbon::now()->year);
        $brandId = $request->input('brand_id');
        $modelId = $request->input('model_id');

        $brands = Brand::orderBy('name')->get();
        $models = $brandId ? VehicleModel::where('brand_id', $brandId)->orderBy('name')->get() : collect();

        $data = $this->getReportData($year, $brandId, $modelId);

        return Inertia::render('Reports/Index', [
            'data' => $data,
            'brands' => $brands,
            'models' => $models,
            'year' => (int) $year,
            'brandId' => $brandId,
            'modelId' => $modelId,
        ]);
    }

    public function exportCsv(Request $request)
    {
        $year = $request->input('year', Carbon::now()->year);
        $brandId = $request->input('brand_id');
        $modelId = $request->input('model_id');

        $data = $this->getReportData($year, $brandId, $modelId);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"sales_report_{$year}.csv\"",
        ];

        $callback = function () use ($data) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['Month', 'Total Inquiries', 'Total Conversions (Sold)', 'Conversion Rate (%)', 'Total Sales Value ($)']);

            foreach ($data['monthly_breakdown'] as $row) {
                fputcsv($file, [
                    $row['month_name'],
                    $row['inquiries_count'],
                    $row['conversions_count'],
                    number_format($row['conversion_rate'], 1),
                    number_format($row['sales_value'], 2)
                ]);
            }

            fputcsv($file, []);
            fputcsv($file, [
                'TOTAL / AVG',
                $data['total_inquiries'],
                $data['total_conversions'],
                number_format($data['conversion_rate'], 1),
                number_format($data['total_sales_value'], 2)
            ]);

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportPdf(Request $request)
    {
        $year = $request->input('year', Carbon::now()->year);
        $brandId = $request->input('brand_id');
        $modelId = $request->input('model_id');

        $data = $this->getReportData($year, $brandId, $modelId);
        $brandName = $brandId ? Brand::find($brandId)?->name : 'All Brands';
        $modelName = $modelId ? VehicleModel::find($modelId)?->name : 'All Models';

        $pdf = Pdf::loadView('reports.pdf', compact('data', 'year', 'brandName', 'modelName'));
        
        return $pdf->download("sales_report_{$year}.pdf");
    }

    private function getReportData($year, $brandId = null, $modelId = null)
    {
        // Fetch inquiries for the selected year with estimate relations
        $inquiries = Inquiry::with(['estimate', 'model'])
            ->whereYear('created_at', $year)
            ->when($brandId, function ($query, $brandId) {
                $query->where('brand_id', $brandId);
            })
            ->when($modelId, function ($query, $modelId) {
                $query->where('model_id', $modelId);
            })
            ->get();

        $monthlyBreakdown = [];
        $totalInquiries = $inquiries->count();
        $totalConversions = $inquiries->where('status', 'Converted')->count();
        $totalSalesValue = 0;

        for ($m = 1; $m <= 12; $m++) {
            $monthInquiries = $inquiries->filter(function ($inq) use ($m) {
                return $inq->created_at->month === $m;
            });

            $monthConversions = $monthInquiries->where('status', 'Converted');
            $monthSalesValue = 0;

            foreach ($monthConversions as $inq) {
                if ($inq->estimate) {
                    $monthSalesValue += $inq->estimate->total_amount;
                } elseif ($inq->model) {
                    $monthSalesValue += $inq->model->on_road_price;
                }
            }

            $totalSalesValue += $monthSalesValue;

            $monthInqCount = $monthInquiries->count();
            $monthConvCount = $monthConversions->count();

            $monthlyBreakdown[$m] = [
                'month_name' => Carbon::create()->month($m)->format('F'),
                'inquiries_count' => $monthInqCount,
                'conversions_count' => $monthConvCount,
                'conversion_rate' => $monthInqCount > 0 ? ($monthConvCount / $monthInqCount) * 100 : 0,
                'sales_value' => $monthSalesValue,
            ];
        }

        $conversionRate = $totalInquiries > 0 ? ($totalConversions / $totalInquiries) * 100 : 0;

        return [
            'monthly_breakdown' => $monthlyBreakdown,
            'total_inquiries' => $totalInquiries,
            'total_conversions' => $totalConversions,
            'total_sales_value' => $totalSalesValue,
            'conversion_rate' => $conversionRate,
        ];
    }
}
