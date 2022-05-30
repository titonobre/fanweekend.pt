import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

import fetchAccommodations from "./fetchAccommodations";
import fetchActivitiesResponses from "./fetchActivitiesResponses";
import fetchEventProgram from "./fetchEventProgram";
import fetchMocs from "./fetchMocs";
import fetchRegisteredUsers from "./fetchRegisteredUsers";
import { loadSpreadsheet } from "./spreadsheet";
import storage from "./storage";

const swr = createStaleWhileRevalidateCache({
  storage,
  minTimeToStale: 1000 * 60 * 5, // 5 minutes
  maxTimeToLive: 1000 * 60 * 60 * 24, // 24 hours
});

const CacheKeys = {
  MOCS: "mocs",
  EVENT_PROGRAM: "event-program",
  ACCOMMODATIONS: "accommodations",
  REGISTERED_USERS: "registered-users",
  ACTIVITIES_RESPONSES: "activities-responses",
};

export async function fetchCachedEventProgram() {
  return swr(CacheKeys.EVENT_PROGRAM, async () => {
    await loadSpreadsheet();

    return fetchEventProgram();
  });
}

export async function fetchCachedAccommodations() {
  return swr(CacheKeys.ACCOMMODATIONS, async () => {
    await loadSpreadsheet();

    return fetchAccommodations();
  });
}

export async function fetchCachedMOCs() {
  return swr(CacheKeys.MOCS, async () => {
    await loadSpreadsheet();

    return fetchMocs();
  });
}

export async function fetchCachedRegisteredUsers() {
  return swr(CacheKeys.REGISTERED_USERS, async () => {
    return fetchRegisteredUsers();
  });
}

export async function fetchCachedActivitiesResponses() {
  return swr(CacheKeys.ACTIVITIES_RESPONSES, async () => {
    await loadSpreadsheet();

    return fetchActivitiesResponses();
  });
}

export function invalidateMOCs() {
  storage.removeItem(CacheKeys.MOCS);
}

export function invalidateRegisteredUsers() {
  storage.removeItem(CacheKeys.REGISTERED_USERS);
}

export function invalidateActivitiesResponses() {
  storage.removeItem(CacheKeys.ACTIVITIES_RESPONSES);
}
