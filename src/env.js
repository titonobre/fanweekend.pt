/*eslint sort-keys: ["error", "asc", {allowLineSeparatedGroups: true, natural: true}]*/

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const featureSchema = z.enum(["event-registration"]).describe("Feature");

const sheetIdSchema = z
  .string()
  .transform((s) => parseInt(s, 10))
  .pipe(z.number().positive());

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    ENABLED_FEATURES: z
      .string()
      .optional()
      .refine((value) => value === "" || value === undefined || /^[\w\s,-]+$/.test(value))
      .transform((value) =>
        value
          ? value
              .split(",")
              .filter(Boolean)
              .map((value) => value.trim())
          : [],
      )
      .pipe(z.array(featureSchema)),

    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    REDIS_URL: z.string().url(),

    GOOGLE_CLIENT_EMAIL: z.string().email(),
    SPREADSHEET_ID: z.string().min(1),

    EVENT_PROGRAM_SHEET_ID: sheetIdSchema,
    REGISTERED_USERS_SHEET_ID: sheetIdSchema,

    REGISTRATION_FORM_ID: z.string().min(1),

    MAIL_FROM_ADDRESS: z.string().email(),
    MAIL_FROM_NAME: z.string().min(1),
    SMTP_HOST: z.string().min(1),
    SMTP_PASS: z.string().min(1),
    SMTP_USER: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {},

  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    ENABLED_FEATURES: process.env.ENABLED_FEATURES,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    NODE_ENV: process.env.NODE_ENV,
    REDIS_URL: process.env.REDIS_URL,

    SPREADSHEET_ID: process.env.SPREADSHEET_ID,

    EVENT_PROGRAM_SHEET_ID: process.env.EVENT_PROGRAM_SHEET_ID,
    REGISTERED_USERS_SHEET_ID: process.env.REGISTERED_USERS_SHEET_ID,

    REGISTRATION_FORM_ID: process.env.REGISTRATION_FORM_ID,

    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_USER: process.env.SMTP_USER,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
