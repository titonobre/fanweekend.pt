/* eslint-disable @typescript-eslint/dot-notation */

import { currentUser } from "@clerk/nextjs/server";
import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

import { env } from "@/env";
import getRows from "@/lib/data-sources/spreadsheet";
import { Storage } from "@/lib/utils/storage";

const sheetId = env.REGISTERED_MOCS_SHEET_ID;

type RegisteredMOCsRaw = {
  ["User"]: string;
  ["Title"]: string;
};

export type MOCData = {
  user: string;
  title: string;
};

const storage = new Storage();

const swr = createStaleWhileRevalidateCache({
  storage,
  minTimeToStale: 1000 * 60 * 5, // 5 minutes
  maxTimeToLive: 1000 * 60 * 10, // 10 minutes
});

export default async function fetchRegisteredMOCs(): Promise<MOCData[]> {
  const rows = await getRows<RegisteredMOCsRaw>(sheetId);

  return rows.reduce<MOCData[]>((acc, row) => {
    const user = row["User"];
    const title = row["Title"];

    if (user && title) {
      acc.push({
        user,
        title,
      });
    }

    return acc;
  }, []);
}

export async function getRegisteredMOCs(): Promise<MOCData[]> {
  const result = await swr("REGISTERED_MOCS", async () => {
    return fetchRegisteredMOCs();
  });

  return result.value;
}

export async function getUserMOCs(): Promise<MOCData[]> {
  const user = await currentUser();

  if (!user) {
    return [];
  }

  const registeredMOCs = await getRegisteredMOCs();

  return registeredMOCs.filter((entry) => entry.user === user.id);
}

export function invalidateRegisteredMOCs() {
  storage.removeItem("REGISTERED_MOCS");
}
