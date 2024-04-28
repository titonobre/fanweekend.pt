/* eslint-disable @typescript-eslint/dot-notation */

import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

import { env } from "@/env";
import getRows from "@/lib/data-sources/spreadsheet";
import { Storage } from "@/lib/utils/storage";

const sheetId = env.ACCOMMODATIONS_SHEET_ID;

type AccommodationRaw = {
  ["Name"]: string;
  ["Directions Link"]: string;
  ["Contact"]: string;
  ["Locality"]: string;
  ["Phone"]: string;
  ["Phone 2"]: string;
  ["Phone 3"]: string;
  ["E-mail"]: string;
  ["URL"]: string;
};

export type Accommodation = {
  name: string;
  directionsLink?: string;
  contact?: string;
  locality?: string;
  phones?: string[];
  email?: string;
  url?: string;
};

const storage = new Storage();

const swr = createStaleWhileRevalidateCache({
  storage,
  minTimeToStale: 1000 * 60 * 5, // 5 minutes
  maxTimeToLive: 1000 * 60 * 10, // 10 minutes
});

export default async function fetchAccommodations(): Promise<Accommodation[]> {
  const rows = await getRows<AccommodationRaw>(sheetId);

  return rows.reduce<Accommodation[]>((acc, row) => {
    const name = row["Name"]!;
    const directionsLink = row["Directions Link"] ?? undefined;
    const contact = row["Contact"] ?? undefined;
    const locality = row["Locality"] ?? undefined;
    const phones = [row["Phone"], row["Phone 2"], row["Phone 3"]].filter((phone): phone is string => !!phone);
    const email = row["E-mail"] ?? undefined;
    const url = row["URL"] ?? undefined;

    if (name) {
      acc.push({
        name,
        directionsLink,
        contact,
        locality,
        phones,
        email,
        url,
      });
    }

    return acc;
  }, []);
}

export async function getAccommodations(): Promise<Record<string, Accommodation>> {
  const result = await swr("ACCOMMODATIONS", async () => {
    const accommodations = await fetchAccommodations();

    return accommodations.reduce<Record<string, Accommodation>>((acc, accommodation) => {
      acc[accommodation.name] = accommodation;
      return acc;
    }, {});
  });

  return result.value;
}

export function invalidateAccommodations() {
  storage.removeItem("ACCOMMODATIONS");
}
