import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { env } from "@/env";

const spreadsheetId = env.SPREADSHEET_ID;

const email = env.GOOGLE_CLIENT_EMAIL;
const key = env.GOOGLE_CLIENT_PRIVATE_KEY;

const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const getSpreadsheet = (function () {
  let spreadsheet: GoogleSpreadsheet;

  return async function getSpreadsheet(): Promise<GoogleSpreadsheet> {
    if (!spreadsheet) {
      const serviceAccountAuth = new JWT({ email, key, scopes });

      const googleSpreadsheet = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);

      await googleSpreadsheet.loadInfo();

      spreadsheet = googleSpreadsheet;
    }

    return spreadsheet;
  };
})();

export default async function getRows<K extends Record<string, string | number>>(sheetId: number): Promise<Array<Partial<K>>> {
  const spreadsheet = await getSpreadsheet();

  const sheet = spreadsheet.sheetsById[sheetId];

  if (!sheet) {
    return [];
  }

  const rows = await sheet.getRows<K>();

  return rows.map((row) => row.toObject());
}
