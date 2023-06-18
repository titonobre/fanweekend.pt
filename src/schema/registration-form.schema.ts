import { z } from "zod";

import countries from "../data/countries.json";
import lugs from "../data/lugs.json";

enum Gender {
  "Male" = "male",
  "Female" = "female",
  "Other" = "other",
  "Rather not say" = "rather not say",
}

enum ShirtSize {
  "S" = "S",
  "M" = "M",
  "L" = "L",
  "XL" = "XL",
  "XXL" = "XXL",
  "3XL" = "3XL",
}

const schema = z.object({
  acceptTerms: z
    .boolean()
    .describe("Accept terms and conditions.")
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
      path: ["acceptTerms"],
    }),

  country: z.enum(countries as [string, ...string[]]),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.coerce.date(),

  lug: z
    .enum(lugs as [string, ...string[]])
    .optional()
    .describe("LUG"),

  shirtSize: z.nativeEnum(ShirtSize),

  notes: z.string().max(240).optional(),
});

export type RegistrationSchema = z.infer<typeof schema>;

export { Gender, ShirtSize };

export const registrationSchema = schema;
export default schema;
