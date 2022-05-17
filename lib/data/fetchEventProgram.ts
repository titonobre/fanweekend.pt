import { zonedTimeToUtc } from "date-fns-tz";
import hashSum from "hash-sum";

import { ACTIVITIES_SHEET_ID } from "../env";

import { getSpreadsheet } from "./spreadsheet";

type RawActivity = {
  title: string;
  date: string;
  time: string;
  type?: string;
  duration?: string;
  location?: string;
  directions?: string;
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
  directions?: string;
  audience?: string;
  signUpRequired?: boolean;
  keyPeople?: string[];
};

export default async function fetchEventProgram(): Promise<Activity[]> {
  const doc = await getSpreadsheet();

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
          directions: row["Directions"] || undefined,
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
        directions: rawActivity.directions?.trim() || undefined,
        audience: rawActivity.audience?.trim() || undefined,
        signUpRequired: rawActivity.signUpRequired === "Yes",
        keyPeople: rawActivity.keyPeople?.split(",").map((person: string) => person.trim()),
      };

      return activity;
    });
}
