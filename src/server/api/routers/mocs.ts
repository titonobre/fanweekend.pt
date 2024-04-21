import { currentUser } from "@clerk/nextjs/server";

import { isFeatureEnabled } from "@/config/config";
import { invalidateRegisteredMOCs } from "@/lib/data/registered-mocs";
import { getUserRegistrationData } from "@/lib/data/registered-users";
import { registerMOC, type RegisterMOCData } from "@/lib/forms/register-moc";
import { registerMOCFormSchema } from "@/schema/register-moc-form.schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

type RegisterMOCResponse = {
  type: "SUCCESS";
};

export const mocsRouter = createTRPCRouter({
  registerMOC: publicProcedure.input(registerMOCFormSchema).mutation(async ({ input }): Promise<RegisterMOCResponse> => {
    const user = await currentUser();

    if (!(await isFeatureEnabled("moc-registration"))) {
      throw new Error("The MOC registration is disabled");
    }

    if (!user) {
      throw new Error("Failed to get current user.");
    }

    const currentUserData = await getUserRegistrationData();

    if (!currentUserData) {
      throw new Error("User not registered!");
    }

    // submit form

    const data: RegisterMOCData = {
      user: user.id,
      title: input.title,
      description: input.description,
      photo: input.photo ?? "",
      elements: input.elements,
      width: input.width,
      depth: input.depth,
      buildTime: input.buildTime,
      notes: input.notes ?? "",
    };

    await registerMOC(data);

    // invalidate registered mocs cache
    invalidateRegisteredMOCs();

    return { type: "SUCCESS" };
  }),
});
