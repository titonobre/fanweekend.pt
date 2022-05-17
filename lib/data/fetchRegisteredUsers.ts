import { REGISTRATION_SPREADSHEET_SHEET_ID } from "../env";

import { getSpreadsheet, loadSpreadsheet } from "./spreadsheet";

export type UserData = {
  id: string;
  plan: string;
  paymentEnabled: string;
  paymentReceived: string;
  volunteer: string;
  extraNight: string;
  accommodation: string;
};

export default async function fetchRegisteredUsers(): Promise<UserData[]> {
  await loadSpreadsheet();

  const doc = await getSpreadsheet();

  const sheet = doc.sheetsById[REGISTRATION_SPREADSHEET_SHEET_ID];
  const rows = await sheet.getRows();

  return rows.map((row) => ({
    id: row["ID"],
    plan: row["Plan"],
    paymentEnabled: row["Payment Enabled"],
    paymentReceived: row["Payment Received"],
    volunteer: row["Volunteer"],
    extraNight: row["Extra Night"],
    accommodation: row["Accommodation"],
  }));
}
