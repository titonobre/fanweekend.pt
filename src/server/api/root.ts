import { createTRPCRouter } from "@/server/api/trpc";

import { dashboard } from "./routers/dashboard";
import { eventProgram } from "./routers/event-program";
import { eventRegistrationRouter } from "./routers/event-registration";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  eventRegistration: eventRegistrationRouter,
  eventProgram,
  dashboard,
});

// export type definition of API
export type AppRouter = typeof appRouter;
