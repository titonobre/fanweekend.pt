import { kv } from "@vercel/kv";
import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";
import { type z } from "zod";

import { env, type featureSchema } from "@/env";

import { Storage } from "../lib/utils/storage";

type FeatureName = z.infer<typeof featureSchema>; // string

const MINUTE = 1000 * 60;

const storage = new Storage();

const swr = createStaleWhileRevalidateCache({
  storage,
  minTimeToStale: 5 * MINUTE,
  maxTimeToLive: 10 * MINUTE,
});

export async function getGoogleClientPrivateKey(): Promise<string | undefined> {
  const result = await swr("google-client-private-key", async () => {
    return kv.get<string>("google-client-private-key");
  });

  return result.value ?? undefined;
}

export async function getEnabledFeatures(): Promise<Set<string>> {
  const result = await swr("enabled-features", async () => {
    const features = await kv.get<string[]>("enabled-features");
    return new Set([...(features ?? []), ...env.ENABLED_FEATURES]);
  });

  return result.value;
}

export async function isFeatureEnabled(feature: FeatureName) {
  const enabledFeatures = await getEnabledFeatures();

  return enabledFeatures.has(feature);
}
