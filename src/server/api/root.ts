import { createTRPCRouter } from "@/server/api/trpc";

import { dashboard } from "./routers/dashboard";
import { eventRegistrationRouter } from "./routers/event-registration";
import { extraNightRouter } from "./routers/extra-night";
import { mocsRouter } from "./routers/mocs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  eventRegistration: eventRegistrationRouter,
  extraNight: extraNightRouter,
  dashboard,
  mocs: mocsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
