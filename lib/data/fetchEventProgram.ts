import { zonedTimeToUtc } from "date-fns-tz";

import { EVENT_PROGRAM_SHEET_ID } from "../env";

import { getSpreadsheet } from "./spreadsheet";

type RawActivity = {
  id: string;
  title: string;
  date: string;
  time: string;
  type?: string;
  duration?: string;
  location?: string;
  directions?: string;
  audience?: string;
  signUpRequired?: string;
  participantsLimit?: string;
  registrationNotes?: string;
  keyPeople?: string;
  description?: string;
};

export type Activity = {
  id: string;
  title: string;
  startTime: string;
  date: string;
  time: string;
  type?: string;
  description?: string;
  duration?: number;
  location?: string;
  directions?: string;
  audience?: string;
  signUpRequired?: boolean;
  participantsLimit?: number;
  registrationNotes?: string;
  keyPeople?: string[];
};

export default async function fetchEventProgram(): Promise<Activity[]> {
  const doc = await getSpreadsheet();

  const sheet = doc.sheetsById[EVENT_PROGRAM_SHEET_ID];
  const rows = await sheet.getRows();

  return rows
    .map<RawActivity>((row) => ({
      id: row["ID"],
      type: row["Type"],
      title: row["Title"],
      date: row["Date"],
      time: row["Time"],
      duration: row["Duration"],
      location: row["Location"],
      directions: row["Directions"],
      audience: row["Audience"],
      signUpRequired: row["Sign Up Required"],
      participantsLimit: row["Participants Limit"],
      registrationNotes: row["Registration Notes"],
      keyPeople: row["Key People"],
      description: row["Description"],
    }))
    .filter((activity) => !!activity.id && !!activity.title && !!activity.date && !!activity.time)
    .map((rawActivity) => {
      const title = rawActivity.title?.trim() || "";
      const startTime = zonedTimeToUtc(`${rawActivity.date}T${rawActivity.time}:00`, "Europe/Lisbon").toISOString();

      const activity: Activity = {
        id: rawActivity.id,
        title,
        startTime,
        date: rawActivity.date,
        time: rawActivity.time,
        duration: rawActivity.duration ? parseInt(rawActivity.duration, 10) : undefined,
        type: rawActivity.type?.trim() || undefined,
        description: rawActivity.description?.trim() || undefined,
        location: rawActivity.location?.trim() || undefined,
        directions: rawActivity.directions?.trim() || undefined,
        audience: rawActivity.audience?.trim() || undefined,
        signUpRequired: rawActivity.signUpRequired === "Yes",
        participantsLimit: rawActivity.participantsLimit ? parseInt(rawActivity.participantsLimit, 10) : undefined,
        registrationNotes: rawActivity.registrationNotes?.trim() || undefined,
        keyPeople:
          rawActivity.keyPeople
            ?.split(",")
            .map((person: string) => person.trim())
            .filter((person) => !!person) || undefined,
      };

      return activity;
    });
}
