import { zonedTimeToUtc } from "date-fns-tz";
import { GoogleSpreadsheet } from "google-spreadsheet";
import hashSum from "hash-sum";
import { createClient } from "redis";

import { GOOGLE_CLIENT_EMAIL, REDIS_URL, REGISTRATION_SPREADSHEET_ID, ACTIVITIES_SHEET_ID } from "../env";

const doc = new GoogleSpreadsheet(REGISTRATION_SPREADSHEET_ID);

type RawActivity = {
  title: string;
  date: string;
  time: string;
  type?: string;
  duration?: string;
  location?: string;
  audience?: string;
  signUpRequired?: string;
  keyPeople?: string;
  description?: string;
};

export type Activity = {
  id: string;
  title: string;
  startTime: string;
  type?: string;
  description?: string;
  duration?: number;
  location?: string;
  audience?: string;
  signUpRequired?: boolean;
  keyPeople?: string[];
};

let googleClientPrivateKeyCache: string;

async function getGoogleClientPrivateKey() {
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

export default async function fetchEventProgram(): Promise<Activity[]> {
  const googleClientPrivateKey = await getGoogleClientPrivateKey();

  await doc.useServiceAccountAuth({
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: googleClientPrivateKey,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsById[ACTIVITIES_SHEET_ID];
  const rows = await sheet.getRows();

  return rows
    .map(
      (row) =>
        ({
          type: row["Type"],
          title: row["Title"],
          date: row["Date"],
          time: row["Time"],
          duration: row["Duration"],
          location: row["Location"] || undefined,
          audience: row["Audience"],
          signUpRequired: row["Sign Up Required"],
          keyPeople: row["Key People"],
          description: row["Description"],
        } as RawActivity)
    )
    .filter((activity) => !!activity.title && !!activity.date && !!activity.time)
    .map((rawActivity) => {
      const title = rawActivity.title?.trim() || "";
      const startTime = zonedTimeToUtc(`${rawActivity.date}T${rawActivity.time}:00`, "Europe/Lisbon").toISOString();

      const id = hashSum({ startTime, title });

      const activity: Activity = {
        id,
        title,
        startTime,
        duration: rawActivity.duration ? parseInt(rawActivity.duration, 10) : undefined,
        type: rawActivity.type?.trim() || undefined,
        description: rawActivity.description?.trim() || undefined,
        location: rawActivity.location?.trim() || undefined,
        audience: rawActivity.audience?.trim() || undefined,
        signUpRequired: rawActivity.signUpRequired === "Yes",
        keyPeople: rawActivity.keyPeople?.split(",").map((person: string) => person.trim()),
      };

      return activity;
    });
}
