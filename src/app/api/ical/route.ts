import ical from "ical-generator";
import { z } from "zod";

import { parseDocument } from "@/lib/utils/parse-document";

import calendarEvent from "../../../documents/calendar-event.md?raw";

const { plain, html, frontmatter } = await parseDocument(calendarEvent);

const frontmatterSchema = z.object({
  id: z.string().min(1),
  start: z.coerce.date(),
  end: z.coerce.date(),
  timezone: z.string().min(1),
  summary: z.string().min(1),
  location: z.string().min(1),
  url: z.string().url(),
});

const { id, start, end, timezone, summary, location, url } = frontmatterSchema.parse(frontmatter);

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
