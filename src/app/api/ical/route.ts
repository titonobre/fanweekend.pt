import ical from "ical-generator";

import calendarEvent from "@/documents/calendar-event.md?raw";
import { parseCalendarEventFrontMatter } from "@/lib/utils/parse-calendar-event-frontmatter";
import { parseDocument } from "@/lib/utils/parse-document";

const { plain, html, frontmatter } = await parseDocument(calendarEvent);

const { id, start, end, timezone, summary, location, url } = parseCalendarEventFrontMatter(frontmatter);

const calendar = ical({
  prodId: "//fanweekend.pt//ical//EN",
  events: [
    {
      id,
      start,
      end,
      timezone,
      location,
      summary,
      description: {
        plain,
        html,
      },
      url,
    },
  ],
});

export async function GET() {
  return new Response(calendar.toString(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${id}.ics"`,
    },
  });
}
