import { z } from "zod";

const schema = z.object({
  date: z.coerce.date().optional(),

  notes: z.string().max(240).optional(),
});

export type ExtraNightFormSchema = z.infer<typeof schema>;

export const extraNightFormSchema = schema;
export default schema;
