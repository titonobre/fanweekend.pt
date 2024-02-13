import { z } from "zod";

const frontmatterSchema = z.object({
  id: z.string().min(1),
  start: z.coerce.date(),
  end: z.coerce.date(),
  timezone: z.string().min(1),
  summary: z.string().min(1),
  location: z.string().min(1),
  url: z.string().url(),
});

export type CalendarEventFrontMatter = z.infer<typeof frontmatterSchema>;

export function parseCalendarEventFrontMatter(frontmatter: Record<string, unknown>): CalendarEventFrontMatter {
  return frontmatterSchema.parse(frontmatter);
}
