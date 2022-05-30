import { ACTIVITIES_SHEET_ID } from "../env";

import { getSpreadsheet } from "./spreadsheet";

export type ActivityFormResponse = {
  user: string;
  activity: string;
  date: string;
  time: string;
  action: string;
};

export default async function fetchActivitiesResponses(): Promise<ActivityFormResponse[]> {
  const doc = await getSpreadsheet();

  console.log("Fetching Activities Form Responses...");

  const sheet = doc.sheetsById[ACTIVITIES_SHEET_ID];
  const rows = await sheet.getRows();

  return rows.map((row) => ({
    user: row["User"],
    activity: row["Activity"],
    date: row["Date"],
    time: row["Time"],
    action: row["Action"],
  }));
}
