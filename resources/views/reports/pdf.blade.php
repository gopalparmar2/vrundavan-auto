<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Sales & Performance Report - {{ $year }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 20px;
            font-size: 12px;
            line-height: 1.5;
        }
        .header {
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .header table {
            width: 100%;
        }
        .logo-title {
            font-size: 22px;
            font-weight: bold;
            color: #1e1b4b;
        }
        .sub-title {
            font-size: 12px;
            color: #64748b;
        }
        .report-info {
            text-align: right;
            font-size: 11px;
            color: #475569;
        }
        .kpi-container {
            width: 100%;
            margin-bottom: 25px;
        }
        .kpi-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 10px 0;
        }
        .kpi-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px;
            text-align: center;
        }
        .kpi-label {
            font-size: 10px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: bold;
        }
        .kpi-value {
            font-size: 16px;
            font-weight: bold;
            color: #4f46e5;
            margin-top: 4px;
        }
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 10px;
            padding-bottom: 4px;
            border-bottom: 1px solid #e2e8f0;
        }
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        table.data-table th {
            background-color: #4f46e5;
            color: #ffffff;
            font-weight: bold;
            text-align: left;
            padding: 8px 10px;
            font-size: 11px;
        }
        table.data-table td {
            padding: 8px 10px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
        }
        table.data-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        table.data-table tr.total-row {
            background-color: #e0e7ff;
            font-weight: bold;
        }
        table.data-table tr.total-row td {
            border-top: 2px solid #4f46e5;
            border-bottom: 2px solid #4f46e5;
            color: #1e1b4b;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .footer {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <div class="header">
        <table>
            <tr>
                <td>
                    <div class="logo-title">Vrundavan Auto</div>
                    <div class="sub-title">Sales & Performance Analytics Report</div>
                </td>
                <td class="report-info">
                    <strong>Report Year:</strong> {{ $year }}<br>
                    <strong>Brand Filter:</strong> {{ $brandName }}<br>
                    <strong>Model Filter:</strong> {{ $modelName }}<br>
                    <strong>Generated On:</strong> {{ \Carbon\Carbon::now()->format('d M Y, h:i A') }}
                </td>
            </tr>
        </table>
    </div>

    <!-- Key Performance Indicators (KPIs) -->
    <div class="kpi-container">
        <table class="kpi-table">
            <tr>
                <td width="25%">
                    <div class="kpi-box">
                        <div class="kpi-label">Total Inquiries</div>
                        <div class="kpi-value">{{ number_format($data['total_inquiries']) }}</div>
                    </div>
                </td>
                <td width="25%">
                    <div class="kpi-box">
                        <div class="kpi-label">Conversions (Sold)</div>
                        <div class="kpi-value">{{ number_format($data['total_conversions']) }}</div>
                    </div>
                </td>
                <td width="25%">
                    <div class="kpi-box">
                        <div class="kpi-label">Conversion Rate</div>
                        <div class="kpi-value">{{ number_format($data['conversion_rate'], 1) }}%</div>
                    </div>
                </td>
                <td width="25%">
                    <div class="kpi-box">
                        <div class="kpi-label">Total Sales Value</div>
                        <div class="kpi-value">₹{{ number_format($data['total_sales_value'], 2) }}</div>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Monthly Breakdown Table -->
    <div class="section-title">Monthly Breakdown ({{ $year }})</div>
    <table class="data-table">
        <thead>
            <tr>
                <th>Month</th>
                <th class="text-center">Inquiries</th>
                <th class="text-center">Conversions</th>
                <th class="text-center">Conv. Rate (%)</th>
                <th class="text-right">Sales Value (₹)</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data['monthly_breakdown'] as $row)
                <tr>
                    <td>{{ $row['month_name'] }}</td>
                    <td class="text-center">{{ number_format($row['inquiries_count']) }}</td>
                    <td class="text-center">{{ number_format($row['conversions_count']) }}</td>
                    <td class="text-center">{{ number_format($row['conversion_rate'], 1) }}%</td>
                    <td class="text-right">₹{{ number_format($row['sales_value'], 2) }}</td>
                </tr>
            @endforeach
            <tr class="total-row">
                <td>TOTAL / AVERAGE</td>
                <td class="text-center">{{ number_format($data['total_inquiries']) }}</td>
                <td class="text-center">{{ number_format($data['total_conversions']) }}</td>
                <td class="text-center">{{ number_format($data['conversion_rate'], 1) }}%</td>
                <td class="text-right">₹{{ number_format($data['total_sales_value'], 2) }}</td>
            </tr>
        </tbody>
    </table>

    <!-- Footer -->
    <div class="footer">
        Confidential Document — Generated automatically by Vrundavan Auto Management System
    </div>

</body>
</html>
