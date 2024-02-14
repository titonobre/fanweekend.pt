import { currentUser } from "@clerk/nextjs/server";

import { isFeatureEnabled } from "@/config";
import { getUserRegistrationData } from "@/lib/data/registered-users";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export type RegistrationCard = {
  type: "REGISTRATION";
  registrationEnabled: boolean;
};

export type WelcomeCard = {
  type: "WELCOME";
  name: string;
};
export type MessageCard = {
  type: "MESSAGE";
  title: string;
  content: string;
};

export type ProgressCard = {
  type: "PROGRESS";
  formSubmitted: boolean;
  paymentEnabled: boolean;
  paymentReceived: boolean;
};

export type Card = RegistrationCard | WelcomeCard | ProgressCard | MessageCard;

export const dashboard = createTRPCRouter({
  getCards: publicProcedure.query(async (): Promise<Card[]> => {
    const user = await currentUser();

    if (!user) {
      return [];
    }

    const registeredUser = await getUserRegistrationData();

    const registrationEnabled = await isFeatureEnabled("event-registration");

    const cards: Card[] = [
      {
        type: "WELCOME",
        name: `${user.firstName} ${user.lastName}`,
      },
    ];

    if (registeredUser) {
      cards.push({
        type: "PROGRESS",
        formSubmitted: true,
        paymentEnabled: registeredUser.paymentEnabled,
        paymentReceived: registeredUser.paymentReceived,
      });
      cards.push({
        type: "MESSAGE",
        title: "What Next?",
        content: "We are preparing the next steps. Come back later.",
      });
    } else {
      cards.push({
        type: "PROGRESS",
        formSubmitted: false,
        paymentEnabled: false,
        paymentReceived: false,
      });
      cards.push({
        type: "REGISTRATION",
        registrationEnabled,
      });
    }

    return cards;
  }),
});
