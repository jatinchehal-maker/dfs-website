/**
 * DFS website → Google Sheets.
 * Paste into the sheet: Extensions → Apps Script. Then set the token (see README.md) and deploy as a web app.
 * Each form gets its own tab; columns are created from the first submission.
 */
const TABS = { application: "Job applications", consultation: "Consultation requests" };

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const token = PropertiesService.getScriptProperties().getProperty("TOKEN");
    if (!token || body.token !== token) return reply({ ok: false, error: "unauthorized" });
    const tabName = TABS[body.form];
    if (!tabName || typeof body.data !== "object") return reply({ ok: false, error: "bad request" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      let headers = sheet.getLastRow() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
      if (!headers.length) {
        headers = ["Received"].concat(body.labels);
        sheet.appendRow(headers);
        sheet.setFrozenRows(1);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      }
      const row = headers.map((h) => (h === "Received" ? new Date() : safe(body.data[h])));
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: "server error" });
  }
}

// Stops spreadsheet formulas being injected through form fields.
function safe(value) {
  const s = value == null ? "" : String(value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
