import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

import fetchEventProgram from "../../lib/data/fetchEventProgram";

export const storage = (function () {
  const store: Record<string, unknown> = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: unknown) {
      store[key] = value;
    },
  };
})();

const swr = createStaleWhileRevalidateCache({
  storage,
  minTimeToStale: 1000 * 60 * 5, // 5 minutes
  maxTimeToLive: 1000 * 60 * 60 * 24, // 24 hours
});

const cacheKey = "event-program";

export default async function fetchCachedEventProgram() {
  return swr(cacheKey, () => fetchEventProgram());
}
