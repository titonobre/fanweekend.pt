import { ACCOMMODATIONS_SHEET_ID } from "../env";

import { getSpreadsheet } from "./spreadsheet";

export type HouseData = {
  name: string;
  directionsLink?: string;
  contact?: string;
  locality?: string;
  phones?: string[];
  email?: string;
};

export default async function fetchAccommodations(): Promise<Record<string, HouseData>> {
  const doc = await getSpreadsheet();

  console.log("Fetching accommodations...");

  const sheet = doc.sheetsById[ACCOMMODATIONS_SHEET_ID];
  const rows = await sheet.getRows();

  return rows
    .map((row) => ({
      name: row["Name"] as string,
      directionsLink: row["Directions Link"] || undefined,
      contact: row["Contact"] || undefined,
      locality: row["Locality"] || undefined,
      phones: [row["Phone"], row["Phone 2"], row["Phone 3"]].filter((phone) => !!phone),
      email: row["E-mail"] || undefined,
    }))
    .reduce((acc, house) => {
      acc[house.name] = house;
      return acc;
    }, {} as Record<string, HouseData>);
}
