"use client";

import { addMinutes, formatDuration, intervalToDuration, isSameDay, parseISO } from "date-fns";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import { Clock, MapPin, Navigation, User2, Users2 } from "lucide-react";

import type { EventProgramEntry } from "@/lib/data/event-program";
import { api } from "@/trpc/react";

const eventTimeZone = "Europe/Lisbon";

type ArrayMin1<T> = [T, ...T[]];

type EventProgramEntryExtended = EventProgramEntry & {
  startTimeFormatted: string;
  durationFormatted?: string;
};

function getEntriesByDay(entries: EventProgramEntry[]) {
  return entries
    .map<EventProgramEntryExtended>((entry: EventProgramEntry) => {
      const parsedStartTime = parseISO(entry.startTime);

      const startTimeFormatted = formatInTimeZone(parsedStartTime, eventTimeZone, "HH:mm");

      const durationFormatted =
        entry.duration && entry.duration > 0
          ? formatDuration(intervalToDuration({ start: parsedStartTime, end: addMinutes(parsedStartTime, entry.duration) }))
          : undefined;

      return {
        ...entry,
        startTimeFormatted,
        durationFormatted,
      };
    })
    .reduce<Array<ArrayMin1<EventProgramEntryExtended>>>((acc, entry) => {
      const lastGroup = acc.at(-1);

      if (!lastGroup) {
        return [[entry]];
      }

      const firstGroups = acc.slice(0, -1);

      const lastEntry = lastGroup.at(-1) ?? lastGroup[0];

      const tzLastStartTime = utcToZonedTime(parseISO(lastEntry.startTime), eventTimeZone);

      const tzCurrStartTime = utcToZonedTime(parseISO(entry.startTime), eventTimeZone);

      if (isSameDay(tzLastStartTime, tzCurrStartTime)) {
        return [...firstGroups, [...lastGroup, entry]];
      }

      return [...firstGroups, lastGroup, [entry]];
    }, [])
    .map((entriesByDay) => {
      const dateLabel = formatInTimeZone(parseISO(entriesByDay[0].startTime), eventTimeZone, "EEEE, MMMM d");

      return {
        dateLabel,
        entries: entriesByDay,
      };
    });
}

export default function EventProgram() {
  const eventProgramResult = api.eventProgram.getEventProgram.useQuery();

  const eventProgramEntries = eventProgramResult.data ?? [];

  const entriesByDay = getEntriesByDay(eventProgramEntries);

  return (
    <>
      {entriesByDay?.map((day, index) => (
        <div key={index}>
          <div>{day.dateLabel}</div>
          {day.entries.map((entry) => (
            <div key={entry.id}>
              <div>
                <div>{entry.startTimeFormatted}</div>
              </div>
              <div>
                <div>{entry.title}</div>
                <div>{entry.description}</div>
                <div>
                  {entry.durationFormatted && (
                    <div>
                      <Clock />
                      <div>{entry.durationFormatted}</div>
                    </div>
                  )}
                  {entry.location && (
                    <div>
                      <MapPin />

                      <div>{entry.location}</div>
                    </div>
                  )}
                  {!!entry.keyPeople?.length && (
                    <div>
                      {entry.keyPeople.length === 1 ? <User2 /> : <Users2 />}
                      <div>{entry.keyPeople.join(", ")}</div>
                    </div>
                  )}
                </div>
              </div>
              {entry.directions && (
                <a href={entry.directions}>
                  <Navigation />
                </a>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
