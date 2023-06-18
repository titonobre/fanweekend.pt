import { CalendarIcon } from "lucide-react";
import NextLink from "next/link";
import { type DateRange } from "react-day-picker";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

export function When() {
  const selected: DateRange = { from: new Date(2024, 5, 7), to: new Date(2024, 5, 9) };

  return (
    <div className="thin-container flex flex-1 flex-col items-center gap-10 overflow-hidden text-center">
      <h2 className="text-3xl">When?</h2>

      <p>The event takes place from 7 to 9 of June, 2024. Setup will be on 7 of June.</p>
      <Button asChild>
        <NextLink href="/api/ical" target="_blank" rel="noreferrer">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Add to Your Calendar
        </NextLink>
      </Button>
      <Calendar mode="range" disableNavigation weekStartsOn={1} defaultMonth={selected.from} selected={selected} />
    </div>
  );
}
