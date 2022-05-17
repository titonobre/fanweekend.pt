import { createClient } from "redis";

import { REDIS_URL } from "../env";

let googleClientPrivateKeyCache: string;

export async function getGoogleClientPrivateKey() {
  if (googleClientPrivateKeyCache) {
    return googleClientPrivateKeyCache;
  }

  console.log("Fetching Google client private key...");

  const client = createClient({ url: REDIS_URL });

  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();

  const value = await client.get("google-client-private-key");

  if (value) {
    googleClientPrivateKeyCache = value;
  }

  client.disconnect();

  return googleClientPrivateKeyCache;
}
