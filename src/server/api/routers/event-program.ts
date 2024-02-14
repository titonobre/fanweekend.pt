import fetchEventProgram from "@/lib/data/event-program";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const eventProgram = createTRPCRouter({
  getEventProgram: publicProcedure.query(async () => {
    const eventProgram = await fetchEventProgram();

    return eventProgram;
  }),
});
