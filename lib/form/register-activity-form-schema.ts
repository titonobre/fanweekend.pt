import { z } from "zod";

export const RegisterActivityFormData = z
  .object({
    activity: z.string().max(500),
  })
  .required()
  .strict();

export type RegisterActivityFormData = z.infer<typeof RegisterActivityFormData>;
