import { z } from "zod";

const schema = z.object({
  title: z.string().min(1).max(140).describe("Title"),
  description: z.string().max(500).describe("Description"),
  elements: z.number().int().min(1).max(10000000).describe("Estimated Number of Parts"),
  width: z.number().int().min(1).max(1000).describe("Width"),
  depth: z.number().int().min(1).max(1000).describe("Depth"),
  photo: z.string().url().optional().describe("Photo URL"),
  buildTime: z.string().max(140).describe("Build Time"),
  notes: z.string().max(240).optional().describe("Notes"),
});

export type RegisterMOCFormSchema = z.infer<typeof schema>;

export const registerMOCFormSchema = schema;
export default schema;
