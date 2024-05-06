import { zonedTimeToUtc } from "date-fns-tz";
import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

import { siteConfig } from "@/config";
import { env } from "@/env";
import getRows from "@/lib/data-sources/spreadsheet";
import { Storage } from "@/lib/utils/storage";

const sheetId = env.EVENT_PROGRAM_SHEET_ID;

type RawEventProgramEntry = {
  ["ID"]: number;
  ["Title"]: string;
  ["Date"]: string;
  ["Time"]: string;
  ["Duration"]: string;
  ["Location"]: string;
  ["Directions"]: string;
  ["Sign Up Required"]: string;
  ["Participants Limit"]: string;
  ["Registration Notes"]: string;
  ["Key People"]: string;
  ["Description"]: string;
};

export type EventProgramEntry = {
  id: number;
  title: string;
  startTime: string;
  description?: string;
  duration?: number;
  location?: string;
  directions?: string;
  signUpRequired?: boolean;
  participantsLimit?: number;
  registrationNotes?: string;
  keyPeople?: string[];
};

const storage = new Storage();

const swr = createStaleWhileRevalidateCache({
  storage,
  minTimeToStale: 1000, // 5 minutes
  maxTimeToLive: 1000 * 60 * 10, // 10 minutes
});

export async function fetchEventProgram(): Promise<EventProgramEntry[]> {
  const rows = await getRows<RawEventProgramEntry>(sheetId);

  return rows.reduce<EventProgramEntry[]>((acc, row) => {
    const id = row.ID;
    const title = row.Title?.trim() ?? "";
    const date = row.Date;
    const time = row.Time;
    const duration = row.Duration ? parseInt(row.Duration, 10) : undefined;
    const location = row.Location?.trim() ?? undefined;
    const directions = row.Directions?.trim() ?? undefined;
    const signUpRequired = row["Sign Up Required"] === "Yes";
    const participantsLimit = row["Participants Limit"] ? parseInt(row["Participants Limit"], 10) : undefined;
    const registrationNotes = row["Registration Notes"]?.trim() ?? undefined;
    const keyPeople =
      row["Key People"]
        ?.split(",")
        .map((person) => person.trim())
        .filter((person) => !!person) ?? undefined;
    const description = row.Description?.trim() ?? undefined;

    if (id && title && date && time) {
      const startTime = zonedTimeToUtc(`${date}T${time}:00`, siteConfig.timeZone).toISOString();

      acc.push({
        id,
        title,
        startTime,
        duration,
        description,
        location,
        directions,
        signUpRequired,
        participantsLimit,
        registrationNotes,
        keyPeople,
      });
    }
    return acc;
  }, []);
}

export async function getEventProgram(): Promise<EventProgramEntry[]> {
  const result = await swr("EVENT_PROGRAM", async () => {
    const entries = await fetchEventProgram();

    return entries;
  });

  return result.value;
}
