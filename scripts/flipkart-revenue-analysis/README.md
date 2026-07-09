# Flipkart Revenue Analysis

A Google Apps Script that turns a Flipkart order export sitting in a Google
Sheet into an automated revenue report — no formulas or pivot tables to
maintain by hand.

## What it does

Given an `Orders` sheet with one row per order line, it generates a
`Revenue Summary` sheet containing:

- Total revenue
- Revenue by category
- Revenue by month, with a column chart of the trend
- Top 10 products by revenue

## Setup

1. Open (or create) a Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Delete the default `Code.gs` contents and paste in this repo's
   [`Code.gs`](./Code.gs).
4. Save, then reload the spreadsheet.
5. A **Flipkart Analytics** menu appears in the sheet's menu bar.

## Usage

- **Flipkart Analytics → Load Sample Order Data** — populates an `Orders`
  sheet with sample rows so you can see the report work end to end.
- **Flipkart Analytics → Generate Revenue Report** — reads the `Orders`
  sheet and writes/refreshes the `Revenue Summary` sheet.

To use your own data, replace the sample rows in `Orders` with a real
Flipkart export using the same columns:

| Order ID | Order Date | SKU | Product Name | Category | Quantity | Unit Price |
|----------|------------|-----|---------------|----------|----------|-------------|
