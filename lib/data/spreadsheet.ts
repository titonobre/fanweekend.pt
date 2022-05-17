import { GoogleSpreadsheet } from "google-spreadsheet";

import { GOOGLE_CLIENT_EMAIL, REGISTRATION_SPREADSHEET_ID } from "../env";

import { getGoogleClientPrivateKey } from "./redis";

const doc = new GoogleSpreadsheet(REGISTRATION_SPREADSHEET_ID);

let cached = false;

export async function loadSpreadsheet(): Promise<void> {
  if (cached) return;

  const googleClientPrivateKey = await getGoogleClientPrivateKey();

  await doc.useServiceAccountAuth({
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: googleClientPrivateKey,
  });

  await doc.loadInfo();

  cached = true;
}

export async function getSpreadsheet(): Promise<GoogleSpreadsheet> {
  return doc;
}
