/**
 * Flipkart Revenue Analysis
 *
 * Google Apps Script bound to a Google Sheet containing a Flipkart order
 * export. Adds a custom menu that turns the raw "Orders" rows into a
 * "Revenue Summary" sheet: total revenue, revenue by category, a
 * month-over-month trend (with chart), and the top 10 products by revenue.
 */

const ORDERS_SHEET_NAME = "Orders";
const SUMMARY_SHEET_NAME = "Revenue Summary";

const ORDER_HEADERS = [
  "Order ID",
  "Order Date",
  "SKU",
  "Product Name",
  "Category",
  "Quantity",
  "Unit Price",
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Flipkart Analytics")
    .addItem("Generate Revenue Report", "generateRevenueReport")
    .addItem("Load Sample Order Data", "seedSampleData")
    .addToUi();
}

/** Reads the Orders sheet and (re)writes the Revenue Summary sheet. */
function generateRevenueReport() {
  const orders = getOrders_();
  if (orders.length === 0) {
    SpreadsheetApp.getUi().alert(
      'No order data found. Add rows to the "Orders" sheet or run ' +
        '"Load Sample Order Data" first.'
    );
    return;
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.revenue, 0);
  const byCategory = groupRevenue_(orders, (o) => o.category);
  const byMonth = groupRevenue_(orders, (o) => monthKey_(o.orderDate));
  const topProducts = topN_(
    groupRevenue_(orders, (o) => o.productName),
    10
  );

  writeSummary_(totalRevenue, byCategory, byMonth, topProducts);
}

function getOrders_() {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) return [];

  const rows = sheet.getDataRange().getValues().slice(1);

  return rows
    .filter((row) => row[0] !== "")
    .map((row) => {
      const [, orderDate, , productName, category, quantity, unitPrice] = row;
      return {
        orderDate: new Date(orderDate),
        productName,
        category,
        revenue: Number(quantity) * Number(unitPrice),
      };
    });
}

function groupRevenue_(orders, keyFn) {
  const totals = {};
  orders.forEach((o) => {
    const key = keyFn(o);
    totals[key] = (totals[key] || 0) + o.revenue;
  });
  return totals;
}

function topN_(totalsByKey, n) {
  return Object.entries(totalsByKey)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

function monthKey_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM");
}

function writeSummary_(totalRevenue, byCategory, byMonth, topProducts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SUMMARY_SHEET_NAME);
  if (sheet) {
    sheet.clear();
  } else {
    sheet = ss.insertSheet(SUMMARY_SHEET_NAME);
  }

  let row = 1;
  sheet.getRange(row, 1).setValue("Total Revenue").setFontWeight("bold");
  sheet.getRange(row, 2).setValue(totalRevenue);
  row += 2;

  row = writeTable_(sheet, row, "Revenue by Category", byCategory, false);
  row = writeTable_(sheet, row, "Revenue by Month", byMonth, true);
  writeRankedTable_(sheet, row, "Top 10 Products by Revenue", topProducts);

  sheet.autoResizeColumns(1, 2);
  insertMonthlyTrendChart_(sheet);
}

function writeTable_(sheet, startRow, title, totalsByKey, sortByKey) {
  sheet.getRange(startRow, 1).setValue(title).setFontWeight("bold");
  startRow += 1;

  const entries = Object.entries(totalsByKey);
  entries.sort(sortByKey ? (a, b) => (a[0] < b[0] ? -1 : 1) : (a, b) => b[1] - a[1]);

  entries.forEach(([key, value]) => {
    sheet.getRange(startRow, 1).setValue(key);
    sheet.getRange(startRow, 2).setValue(value);
    startRow += 1;
  });

  return startRow + 1;
}

function writeRankedTable_(sheet, startRow, title, entries) {
  sheet.getRange(startRow, 1).setValue(title).setFontWeight("bold");
  startRow += 1;

  entries.forEach(([key, value], i) => {
    sheet.getRange(startRow, 1).setValue(`${i + 1}. ${key}`);
    sheet.getRange(startRow, 2).setValue(value);
    startRow += 1;
  });

  return startRow + 1;
}

function insertMonthlyTrendChart_(sheet) {
  const headerRow = findRowWithLabel_(sheet, "Revenue by Month");
  if (!headerRow) return;

  const dataStartRow = headerRow + 1;
  let dataEndRow = dataStartRow;
  while (sheet.getRange(dataEndRow, 1).getValue() !== "") {
    dataEndRow += 1;
  }
  dataEndRow -= 1;
  if (dataEndRow < dataStartRow) return;

  const range = sheet.getRange(dataStartRow, 1, dataEndRow - dataStartRow + 1, 2);
  const chart = sheet
    .newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(range)
    .setPosition(2, 4, 0, 0)
    .setOption("title", "Monthly Revenue Trend")
    .build();
  sheet.insertChart(chart);
}

function findRowWithLabel_(sheet, label) {
  const values = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === label) return i + 1;
  }
  return null;
}

/** Populates the Orders sheet with sample Flipkart order data for demoing the report. */
function seedSampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ORDERS_SHEET_NAME);
  if (sheet) {
    sheet.clear();
  } else {
    sheet = ss.insertSheet(ORDERS_SHEET_NAME);
  }

  sheet.getRange(1, 1, 1, ORDER_HEADERS.length).setValues([ORDER_HEADERS]);
  sheet
    .getRange(2, 1, SAMPLE_ORDERS.length, ORDER_HEADERS.length)
    .setValues(SAMPLE_ORDERS);
  sheet.autoResizeColumns(1, ORDER_HEADERS.length);
}

const SAMPLE_ORDERS = [
  ["FK10001", new Date(2025, 0, 4), "WTC-2201", "Chrono Steel Watch", "Watches", 2, 3499],
  ["FK10002", new Date(2025, 0, 9), "JWL-1042", "Gold Plated Necklace", "Jewelry", 1, 1899],
  ["FK10003", new Date(2025, 0, 14), "EYE-3305", "Polarized Aviators", "Eyewear", 3, 999],
  ["FK10004", new Date(2025, 0, 22), "WTC-2202", "Minimalist Leather Watch", "Watches", 1, 2799],
  ["FK10005", new Date(2025, 1, 2), "JWL-1043", "Silver Hoop Earrings", "Jewelry", 4, 599],
  ["FK10006", new Date(2025, 1, 11), "EYE-3306", "Blue Light Glasses", "Eyewear", 2, 799],
  ["FK10007", new Date(2025, 1, 19), "WTC-2203", "Smart Fitness Watch", "Watches", 2, 4499],
  ["FK10008", new Date(2025, 1, 25), "JWL-1044", "Pearl Drop Pendant", "Jewelry", 1, 2199],
  ["FK10009", new Date(2025, 2, 3), "EYE-3307", "Round Metal Frames", "Eyewear", 3, 1099],
  ["FK10010", new Date(2025, 2, 10), "WTC-2201", "Chrono Steel Watch", "Watches", 1, 3499],
  ["FK10011", new Date(2025, 2, 17), "JWL-1042", "Gold Plated Necklace", "Jewelry", 2, 1899],
  ["FK10012", new Date(2025, 2, 28), "EYE-3305", "Polarized Aviators", "Eyewear", 2, 999],
];
