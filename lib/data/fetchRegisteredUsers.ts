import { GoogleSpreadsheet } from "google-spreadsheet";
import { createClient } from "redis";

import { GOOGLE_CLIENT_EMAIL, REDIS_URL, REGISTRATION_SPREADSHEET_ID, REGISTRATION_SPREADSHEET_SHEET_ID } from "../env";

const doc = new GoogleSpreadsheet(REGISTRATION_SPREADSHEET_ID);

export type UserData = {
  id: string;
  plan: string;
  paymentEnabled: string;
  paymentReceived: string;
};

let googleClientPrivateKeyCache: string;

async function getGoogleClientPrivateKey() {
  if (googleClientPrivateKeyCache) {
    return googleClientPrivateKeyCache;
  }

  console.log("Fetching Google client private key...");

  const client = createClient({ url: REDIS_URL });

  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();

  const value = await client.get("google-client-private-key");

  if (value) {
    googleClientPrivateKeyCache = value;
  }

  client.disconnect();

  return googleClientPrivateKeyCache;
}

export default async function fetchRegisteredUsers(): Promise<UserData[]> {
  const googleClientPrivateKey = await getGoogleClientPrivateKey();

  await doc.useServiceAccountAuth({
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: googleClientPrivateKey,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsById[REGISTRATION_SPREADSHEET_SHEET_ID];
  const rows = await sheet.getRows();

  return rows.map((row) => ({
    id: row["ID"],
    plan: row["Plan"],
    paymentEnabled: row["Payment Enabled"],
    paymentReceived: row["Payment Received"],
  }));
}
