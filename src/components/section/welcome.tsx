import NextLink from "next/link";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { default as CalendarEventMessage, frontmatter } from "@/documents/calendar-event.md";
import { parseCalendarEventFrontMatter } from "@/lib/utils/parse-calendar-event-frontmatter";

const { start, end } = parseCalendarEventFrontMatter(frontmatter);

export function Welcome() {
  return (
    <div className="thin-container flex flex-1 flex-col items-center gap-10 overflow-hidden text-center">
      <h2 className="text-3xl">Hi!</h2>
      <CalendarEventMessage />
      <Button asChild>
        <NextLink href="/api/ical" rel="noreferrer">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Add to Your Calendar
        </NextLink>
      </Button>
      <Calendar mode="range" disableNavigation weekStartsOn={1} defaultMonth={start} selected={{ from: start, to: end }} />
    </div>
  );
}
