<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Vehicle Price Estimate - #{{ $estimate->id }}</title>
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
        .company-name {
            font-size: 22px;
            font-weight: bold;
            color: #1e1b4b;
        }
        .company-sub {
            font-size: 12px;
            color: #64748b;
        }
        .doc-title {
            text-align: right;
        }
        .doc-title h2 {
            margin: 0;
            font-size: 18px;
            color: #4f46e5;
        }
        .doc-meta {
            font-size: 11px;
            color: #64748b;
        }
        .details-grid {
            width: 100%;
            margin-bottom: 20px;
        }
        .details-grid td {
            vertical-align: top;
        }
        .box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px;
        }
        .box-title {
            font-size: 11px;
            font-weight: bold;
            color: #4f46e5;
            text-transform: uppercase;
            margin-bottom: 6px;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 4px;
        }
        table.cost-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        table.cost-table th {
            background-color: #4f46e5;
            color: #ffffff;
            font-weight: bold;
            text-align: left;
            padding: 10px;
            font-size: 11px;
        }
        table.cost-table td {
            padding: 10px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
        }
        table.cost-table tr.total-row {
            background-color: #e0e7ff;
            font-weight: bold;
            font-size: 13px;
        }
        table.cost-table tr.total-row td {
            border-top: 2px solid #4f46e5;
            border-bottom: 2px solid #4f46e5;
            color: #1e1b4b;
        }
        .text-right {
            text-align: right;
        }
        .text-emerald {
            color: #059669;
        }
        .footer {
            margin-top: 40px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
        }
        .signature-section {
            margin-top: 50px;
            width: 100%;
        }
        .signature-box {
            border-top: 1px solid #94a3b8;
            width: 180px;
            text-align: center;
            font-size: 11px;
            color: #475569;
            padding-top: 5px;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <div class="header">
        <table>
            <tr>
                <td>
                    <div class="company-name">Vrundavan Auto</div>
                    <div class="company-sub">Official Vehicle Price Quotation & Estimate</div>
                </td>
                <td class="doc-title">
                    <h2>ESTIMATE #{{ $estimate->id }}</h2>
                    <div class="doc-meta">
                        Date: {{ \Carbon\Carbon::parse($estimate->created_at)->format('d M Y') }}
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Customer & Vehicle Info Grid -->
    <table class="details-grid">
        <tr>
            <td width="48%">
                <div class="box">
                    <div class="box-title">Customer Details</div>
                    <strong>Name:</strong> {{ $estimate->inquiry->customer_name }}<br>
                    <strong>Phone:</strong> {{ $estimate->inquiry->phone }}<br>
                    <strong>Email:</strong> {{ $estimate->inquiry->email ?? 'N/A' }}<br>
                    <strong>Inquiry Source:</strong> {{ ucfirst($estimate->inquiry->source) }}
                </div>
            </td>
            <td width="4%"></td>
            <td width="48%">
                <div class="box">
                    <div class="box-title">Vehicle Specifications</div>
                    <strong>Brand:</strong> {{ $estimate->inquiry->brand->name }}<br>
                    <strong>Model:</strong> {{ $estimate->inquiry->model->name }}<br>
                    <strong>Variant:</strong> {{ $estimate->inquiry->model->variant }}<br>
                    <strong>Fuel / Trans:</strong> {{ $estimate->inquiry->model->fuel_type }} ({{ $estimate->inquiry->model->transmission }})
                </div>
            </td>
        </tr>
    </table>

    <!-- Price Calculation Breakdown Table -->
    <table class="cost-table">
        <thead>
            <tr>
                <th>Item Description</th>
                <th class="text-right">Amount (₹)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Base Vehicle On-Road Price</td>
                <td class="text-right">₹{{ number_format($estimate->on_road_price, 2) }}</td>
            </tr>
            @if ($estimate->discount > 0)
                <tr>
                    <td class="text-emerald">Special Discount / Promotional Offer</td>
                    <td class="text-right text-emerald">- ₹{{ number_format($estimate->discount, 2) }}</td>
                </tr>
            @endif
            @if ($estimate->accessories_cost > 0)
                <tr>
                    <td>Accessories & Add-ons Package</td>
                    <td class="text-right">+ ₹{{ number_format($estimate->accessories_cost, 2) }}</td>
                </tr>
            @endif
            @if ($estimate->insurance > 0)
                <tr>
                    <td>Insurance Premium</td>
                    <td class="text-right">+ ₹{{ number_format($estimate->insurance, 2) }}</td>
                </tr>
            @endif
            @if ($estimate->rto_charges > 0)
                <tr>
                    <td>RTO / Registration & Handling Charges</td>
                    <td class="text-right">+ ₹{{ number_format($estimate->rto_charges, 2) }}</td>
                </tr>
            @endif
            <tr class="total-row">
                <td>TOTAL PAYABLE AMOUNT</td>
                <td class="text-right">₹{{ number_format($estimate->total_amount, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <!-- Signatures -->
    <table class="signature-section">
        <tr>
            <td>
                <div class="signature-box">
                    Customer Signature
                </div>
            </td>
            <td class="text-right">
                <div class="signature-box" style="margin-left: auto;">
                    Authorized Representative<br>
                    <strong>Vrundavan Auto</strong>
                </div>
            </td>
        </tr>
    </table>

    <!-- Footer -->
    <div class="footer">
        Thank you for choosing Vrundavan Auto. This quotation is valid for 15 days from the date of issue.
    </div>

</body>
</html>
