import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { z } from "zod";

import { getGoogleClientPrivateKey } from "~/config";
import { env } from "~/env.js";

const privateKeySchema = z.string().nonempty();

const spreadsheetId = env.SPREADSHEET_ID;

const email = env.GOOGLE_CLIENT_EMAIL;
const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const getSpreadsheet = (function () {
  let spreadsheet: GoogleSpreadsheet;

  return async function getSpreadsheet(): Promise<GoogleSpreadsheet> {
    if (!spreadsheet) {
      const googleClientPrivateKey = await getGoogleClientPrivateKey();

      const key = privateKeySchema.parse(googleClientPrivateKey);

      const serviceAccountAuth = new JWT({ email, key, scopes });

      spreadsheet = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);

      await spreadsheet.loadInfo();
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
