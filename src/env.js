/*eslint sort-keys: ["error", "asc", {allowLineSeparatedGroups: true, natural: true}]*/

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const featureSchema = z
  .enum(["event-registration", "moc-registration", "extra-night", "accommodation-card", "event-program", "event-program-card"])
  .describe("Feature");

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
    GOOGLE_CLIENT_PRIVATE_KEY: z.string().min(1),

    SPREADSHEET_ID: z.string().min(1),

    ACCOMMODATIONS_SHEET_ID: sheetIdSchema,
    EVENT_PROGRAM_SHEET_ID: sheetIdSchema,
    REGISTERED_MOCS_SHEET_ID: sheetIdSchema,
    REGISTERED_USERS_SHEET_ID: sheetIdSchema,

    REGISTRATION_FORM_ID: z.string().min(1),

    EXTRA_NIGHT_FORM_ID: z.string().min(1),

    REGISTER_MOC_FORM_ID: z.string().min(1),

    MAIL_FROM_ADDRESS: z.string().email(),
    MAIL_FROM_NAME: z.string().min(1),
    SMTP_HOST: z.string().min(1),
    SMTP_PASS: z.string().min(1),
    SMTP_USER: z.string().min(1),

    PRISMIC_TOKEN: z.string().min(1),
    PRISMIC_WEBHOOK_SECRET: z.string().min(1),
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
    GOOGLE_CLIENT_PRIVATE_KEY: process.env.GOOGLE_CLIENT_PRIVATE_KEY,

    NODE_ENV: process.env.NODE_ENV,

    REDIS_URL: process.env.REDIS_URL,

    SPREADSHEET_ID: process.env.SPREADSHEET_ID,

    ACCOMMODATIONS_SHEET_ID: process.env.ACCOMMODATIONS_SHEET_ID,
    EVENT_PROGRAM_SHEET_ID: process.env.EVENT_PROGRAM_SHEET_ID,
    REGISTERED_MOCS_SHEET_ID: process.env.REGISTERED_MOCS_SHEET_ID,
    REGISTERED_USERS_SHEET_ID: process.env.REGISTERED_USERS_SHEET_ID,

    REGISTRATION_FORM_ID: process.env.REGISTRATION_FORM_ID,

    EXTRA_NIGHT_FORM_ID: process.env.EXTRA_NIGHT_FORM_ID,

    REGISTER_MOC_FORM_ID: process.env.REGISTER_MOC_FORM_ID,

    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_USER: process.env.SMTP_USER,

    PRISMIC_TOKEN: process.env.PRISMIC_TOKEN,
    PRISMIC_WEBHOOK_SECRET: process.env.PRISMIC_WEBHOOK_SECRET,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
