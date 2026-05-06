Create a Google Sheet and name the first tab `Waitlist`.

If you already have a working bound Apps Script, replace the code with this improved version so
you can store more fields and prevent duplicate emails.

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Waitlist");
  const data = JSON.parse(e.postData.contents);
  const email = String(data.email || "").trim().toLowerCase();

  if (!email) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "Missing email" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const existingEmails =
    lastRow > 1
      ? sheet
          .getRange(2, 3, lastRow - 1, 1)
          .getValues()
          .flat()
          .map((value) => String(value || "").trim().toLowerCase())
      : [];

  if (existingEmails.includes(email)) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, duplicate: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    new Date(),
    data.name || "",
    email,
    data.hospital || "",
    data.role || "",
    data.phone || "",
    data.source || "",
    data.submittedAt || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}
```

Deploy it:

1. Open the Google Sheet you want to use
2. Go to `Extensions -> Apps Script`
3. Paste the code above
4. Click `Deploy -> New deployment`
5. Choose `Web app`
6. Set `Execute as` to `Me`
7. Set `Who has access` to `Anyone`
8. Copy the `Web app URL`

Create a local `.env` file in the project root with:

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL
```

For Vercel, also add the same variable in the project settings:

`VITE_GOOGLE_SHEETS_WEB_APP_URL`

Suggested sheet columns:

1. `Created At`
2. `Name`
3. `Email`
4. `Hospital`
5. `Role`
6. `Phone`
7. `Source`
8. `Submitted At`

Cleanup:

Delete these test rows if you no longer need them:

1. `codex-test@example.com`
2. `codex-second-test@example.com`
