import { currentUser } from "@clerk/nextjs/server";

import { isFeatureEnabled } from "@/config/config";
import { getUserRegistrationData, invalidateRegisteredUsers } from "@/lib/data/registered-users";
import { submitUserRegistration, type UserRegistrationData } from "@/lib/forms/register";
import { sendRegistrationMail } from "@/lib/utils/sendRegistrationMail";
import { registrationSchema } from "@/schema/registration-form.schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type RegistrationResponse = {
  type: "SUCCESS";
};

export const eventRegistrationRouter = createTRPCRouter({
  register: publicProcedure.input(registrationSchema).mutation(async ({ input }): Promise<RegistrationResponse> => {
    const user = await currentUser();

    if (!(await isFeatureEnabled("event-registration"))) {
      throw new Error("The registration is disabled");
    }

    if (!user) {
      throw new Error("Failed to get current user.");
    }

    const primaryEmailAddress = user.emailAddresses.find((emailAddress) => emailAddress.id === user.primaryEmailAddressId);

    if (!primaryEmailAddress) {
      throw new Error("No email configured on your account!");
    }

    const currentUserData = await getUserRegistrationData();

    if (currentUserData) {
      throw new Error("Already registered!");
    }

    // prepare data

    const name = `${user.firstName} ${user.lastName}`;
    const email = primaryEmailAddress.emailAddress;

    // submit form

    const userData: UserRegistrationData = {
      id: user.id,
      email,
      name,
      country: input.country,
      shirtSize: input.shirtSize,
      dateOfBirth: input.dateOfBirth,
      gender: input.gender,
      lug: input.lug,
      notes: input.notes ?? "",
    };

    await submitUserRegistration(userData);

    // invalidate registered users cache
    invalidateRegisteredUsers();

    // send confirmation email
    await sendRegistrationMail({
      name: name,
      address: email,
    });

    return { type: "SUCCESS" };
  }),
});
