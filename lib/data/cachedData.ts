import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

import fetchEventProgram from "./fetchEventProgram";
import { loadSpreadsheet } from "./spreadsheet";
import storage from "./storage";

const swr = createStaleWhileRevalidateCache({
  storage,
  minTimeToStale: 1000 * 60 * 5, // 5 minutes
  maxTimeToLive: 1000 * 60 * 60 * 24, // 24 hours
});

const CacheKeys = {
  EVENT_PROGRAM: "event-program",
};

export async function fetchCachedEventProgram() {
  return swr(CacheKeys.EVENT_PROGRAM, async () => {
    await loadSpreadsheet();

    return fetchEventProgram();
  });
}

