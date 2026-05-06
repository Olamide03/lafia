Create a Google Sheet and name the first tab `Waitlist`.

In Google Sheets, go to `Extensions -> Apps Script` and paste this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Waitlist");
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.email || "",
    data.source || "",
    data.submittedAt || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}
```

Deploy it:

1. Click `Deploy -> New deployment`
2. Choose `Web app`
3. Set `Who has access` to `Anyone`
4. Copy the `Web app URL`

Create a local `.env` file in the project root with:

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL
```

For Vercel, also add the same variable in the project settings:

`VITE_GOOGLE_SHEETS_WEB_APP_URL`

Suggested sheet columns:

1. `Created At`
2. `Email`
3. `Source`
4. `Submitted At`
