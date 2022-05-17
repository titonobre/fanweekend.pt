import { MOCS_SHEET_ID } from "../env";

import { getSpreadsheet } from "./spreadsheet";

export type MOCData = {
  user: string;
  title: string;
};

export default async function fetchMocs(): Promise<MOCData[]> {
  const doc = await getSpreadsheet();

  console.log("Fetching MOCs...");

  const sheet = doc.sheetsById[MOCS_SHEET_ID];
  const rows = await sheet.getRows();

  return rows.map((row) => ({
    user: row["User"],
    title: row["Title"],
  }));
}
