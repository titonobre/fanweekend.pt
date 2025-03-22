import { get } from "@vercel/edge-config";
import { kv } from "@vercel/kv";
import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";
import { type z } from "zod";

import { env, type featureSchema } from "@/env";
import { Storage } from "@/lib/utils/storage";

type FeatureName = z.infer<typeof featureSchema>; // string

type Config = {
  "offer-link": string;
};

const MINUTE = 1000 * 60;

const storage = new Storage();

const swr = createStaleWhileRevalidateCache({
  storage,
  minTimeToStale: 5 * MINUTE,
  maxTimeToLive: 10 * MINUTE,
});

export async function getEnabledFeatures(): Promise<Set<string>> {
  const result = await swr("enabled-features", async () => {
    const features = await kv.smembers("enabled-features");
    return new Set([...(features ?? []), ...env.ENABLED_FEATURES]);
  });

  return result.value;
}

export async function getConfig<K extends keyof Config>(key: K): Promise<Config[K]> {
  const result = await swr("config", async () => {
    const value = await get(key);
    return value as Config[K];
  });

  return result.value;
}

export async function isFeatureEnabled(feature: FeatureName) {
  const enabledFeatures = await getEnabledFeatures();

  return enabledFeatures.has(feature);
}
