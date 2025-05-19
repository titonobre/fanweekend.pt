import { type HTMLAttributes, type PropsWithChildren, type RefAttributes } from "react";

import NextLink from "next/link";

import { addMinutes, formatDuration, intervalToDuration, isSameDay, isWithinInterval, parseISO } from "date-fns";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import { AlertCircle, ClockIcon, LocateIcon, User2, Users2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/components/utils";

import { isFeatureEnabled, siteConfig } from "@/config";
import { type EventProgramEntry, getEventProgram } from "@/lib/data/event-program";

type FormattedEventProgramEntry = EventProgramEntry & {
  startTimeFormatted: string;
  durationFormatted?: string;
  isNow?: boolean;
};

type EventProgramCardProps = HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement> & Omit<FormattedEventProgramEntry, "id">;

type DayHeading = {
  heading: string;
};

function isSameDayEntries(entry1: EventProgramEntry, entry2: EventProgramEntry): boolean {
  const tzStartTime1 = utcToZonedTime(parseISO(entry1.startTime), siteConfig.timeZone);

  const tzStartTime2 = utcToZonedTime(parseISO(entry2.startTime), siteConfig.timeZone);

  return isSameDay(tzStartTime1, tzStartTime2);
}

function mapToLayoutItems(entries: EventProgramEntry[]): (FormattedEventProgramEntry | DayHeading)[] {
  const now = new Date();

  return entries.reduce<(FormattedEventProgramEntry | DayHeading)[]>((acc, entry) => {
    const previousEntry = acc.at(-1);

    const dayHeading =
      !previousEntry || ("id" in previousEntry && !isSameDayEntries(previousEntry, entry))
        ? formatInTimeZone(parseISO(entry.startTime), siteConfig.timeZone, "EEEE, MMMM d")
        : undefined;

    if (dayHeading) acc.push({ heading: dayHeading });

    const startTime = parseISO(entry.startTime);
    const endTime = entry.duration && entry.duration > 0 ? addMinutes(startTime, entry.duration) : undefined;

    const startTimeFormatted = formatInTimeZone(startTime, siteConfig.timeZone, "HH:mm");
    const durationFormatted = endTime ? formatDuration(intervalToDuration({ start: startTime, end: endTime })) : undefined;

    const isNow = endTime ? isWithinInterval(now, { start: startTime, end: endTime }) : undefined;

    acc.push({
      ...entry,
      startTimeFormatted,
      durationFormatted,
      isNow,
    });

    return acc;
  }, []);
}

const CustomAlert: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="thin-container mt-10 flex flex-col gap-10">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Whoops!</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
      </Alert>

      <div className="flex justify-center">
        <Button asChild>
          <NextLink href="/dashboard">Back to Dashboard</NextLink>
        </Button>
      </div>
    </div>
  );
};

function EventProgramCard({
  className,
  title,
  description,
  startTimeFormatted,
  durationFormatted,
  keyPeople,
  location,
  directions,
  isNow,
}: EventProgramCardProps) {
  return (
    <Card
      className={cn(className, {
        "border-green-500 dark:border-green-500": isNow,
      })}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1">
            {isNow && <Badge variant={"success"}>Ongoing</Badge>}
            <ClockIcon className="h-4 w-4" />
            {[startTimeFormatted, durationFormatted].filter(Boolean).join(", ")}
          </span>
          {!!keyPeople?.length && (
            <span className="inline-flex items-center gap-1">
              {keyPeople.length === 1 ? <User2 className="h-4 w-4" /> : <Users2 className="h-4 w-4" />}
              {keyPeople.join(", ")}
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1">
              <LocateIcon className="h-4 w-4" />
              {directions ? (
                <a href={directions} className="text-nowrap underline underline-offset-4" target="_blank" rel="noreferrer">
                  {location}
                </a>
              ) : (
                location
              )}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      {description && <CardContent>{description}</CardContent>}
    </Card>
  );
}

export const revalidate = 60; // revalidate every 60 seconds

export default async function EventProgram() {
  const eventProgramEnabled = await isFeatureEnabled("event-program");

  if (!eventProgramEnabled) {
    return (
      <CustomAlert>
        <p>The event program is not currently available!</p>
      </CustomAlert>
    );
  }

  const entries = await getEventProgram();

  const items = mapToLayoutItems(entries);

  return (
    <main className="thin-container mt-10 flex flex-1 flex-col gap-10">
      <h1 className="text-3xl">Event Program</h1>

      <section className="relative flex flex-col gap-4">
        {items?.map((item, i) => {
          if ("heading" in item) {
            return (
              <h2 key={i} className="pt-6 text-2xl">
                {item.heading}
              </h2>
            );
          } else {
            const { id, ...entry } = item;
            return <EventProgramCard key={i} {...entry} id={`${id}`} />;
          }
        })}
      </section>
      <div className="flex justify-center">
        <Button>
          <NextLink href="/dashboard">Back to Dashboard</NextLink>
        </Button>
      </div>
    </main>
  );
}
