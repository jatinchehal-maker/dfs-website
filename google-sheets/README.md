# Connect the website forms to Google Sheets

1. Create a Google Sheet (e.g. "DFS website submissions").
2. Extensions → Apps Script. Delete the sample code, paste `Code.gs`, save.
3. Project Settings (gear) → Script Properties → Add property: `TOKEN` = a long random password you make up.
4. Deploy → New deployment → type **Web app** → Execute as **Me** → Who has access **Anyone** → Deploy → copy the Web app URL.
5. Give the website the URL and token (never paste them in chat):
   - local: add to `.env.local`
     ```
     SHEETS_WEBHOOK_URL=<web app URL>
     SHEETS_WEBHOOK_TOKEN=<the same TOKEN>
     ```
   - live site: `npx wrangler secret put SHEETS_WEBHOOK_URL` and `npx wrangler secret put SHEETS_WEBHOOK_TOKEN`
6. Submit a test from /careers and /contact. Tabs "Job applications" and "Consultation requests" appear with one row each.

Open the sheet in Excel any time: File → Download → Microsoft Excel (.xlsx).
