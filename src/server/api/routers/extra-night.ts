import { currentUser } from "@clerk/nextjs/server";

import { isFeatureEnabled } from "@/config/config";
import { getUserRegistrationData, invalidateRegisteredUsers } from "@/lib/data/registered-users";
import { type ExtraNightData, submitExtraNight } from "@/lib/forms/extra-night";
import { extraNightFormSchema } from "@/schema/extra-night-form.schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

type ExtraNightResponse = {
  type: "SUCCESS";
};

export const extraNightRouter = createTRPCRouter({
  setExtraNight: publicProcedure.input(extraNightFormSchema).mutation(async ({ input }): Promise<ExtraNightResponse> => {
    const user = await currentUser();

    if (!(await isFeatureEnabled("extra-night"))) {
      throw new Error("The extra night is disabled");
    }

    if (!user) {
      throw new Error("Failed to get current user.");
    }

    const currentUserData = await getUserRegistrationData();

    if (!currentUserData) {
      throw new Error("User not registered!");
    }

    // submit form

    const data: ExtraNightData = {
      id: user.id,
      date: input.date,
      notes: input.notes ?? "",
    };

    await submitExtraNight(data);

    // invalidate registered users cache
    invalidateRegisteredUsers();

    return { type: "SUCCESS" };
  }),
});
