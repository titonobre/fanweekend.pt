import { currentUser } from "@clerk/nextjs/server";

import { getConfig, isFeatureEnabled } from "@/config";
import { type Accommodation, getAccommodations } from "@/lib/data/accommodations";
import { getUserMOCs } from "@/lib/data/registered-mocs";
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

export type PaymentDetailsCard = {
  type: "PAYMENT_DETAILS";
};

export type EventProgramCard = {
  type: "EVENT_PROGRAM";
};

export type ExtraNightCard = {
  type: "EXTRA_NIGHT";
};

export type MOCsCard = {
  type: "MOCS";
  registeredMOCs: string[];
  mocRegistrationEnabled: boolean;
};

export type MessageCard = {
  type: "MESSAGE";
  title: string;
  content: string;
  cta?: {
    label: string;
    link: string;
    external: boolean;
  };
};

export type ProgressCard = {
  type: "PROGRESS";
  formSubmitted: boolean;
  paymentEnabled: boolean;
  paymentReceived: boolean;
};

export type AccommodationCard = {
  type: "ACCOMMODATION";
  accommodation: Accommodation;
};

export type Card =
  | RegistrationCard
  | WelcomeCard
  | ProgressCard
  | MessageCard
  | PaymentDetailsCard
  | EventProgramCard
  | ExtraNightCard
  | MOCsCard
  | AccommodationCard;

export const dashboard = createTRPCRouter({
  getCards: publicProcedure.query(async (): Promise<Card[]> => {
    const user = await currentUser();

    if (!user) {
      return [];
    }

    const registeredUser = await getUserRegistrationData();

    const registrationEnabled = await isFeatureEnabled("event-registration");
    const mocRegistrationEnabled = await isFeatureEnabled("moc-registration");
    const extraNightEnabled = await isFeatureEnabled("extra-night");
    const accommodationCardEnabled = await isFeatureEnabled("accommodation-card");
    const eventProgramCardEnabled = await isFeatureEnabled("event-program-card");

    const extraNightSelected = !!registeredUser?.extraNight;

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

      if (registeredUser.paymentEnabled && !registeredUser.paymentReceived) {
        cards.push({
          type: "PAYMENT_DETAILS",
        });
      }

      if (extraNightEnabled && !extraNightSelected) {
        cards.push({
          type: "EXTRA_NIGHT",
        });
      }

      if (eventProgramCardEnabled && registeredUser.paymentReceived) {
        cards.push({
          type: "EVENT_PROGRAM",
        });

        const offerLink = await getConfig("offer-link");

        cards.push({
          type: "MESSAGE",
          title: "AFOL Day Portugal",
          content:
            "All Participants will get a discount at the LEGO Store Porto - Norte Shopping. Valid on Monday, June 10. Registration is required.",
          cta: {
            label: "Register Here",
            link: offerLink,
            external: true,
          },
        });
      }

      if (accommodationCardEnabled && registeredUser.accommodation) {
        const accommodations = await getAccommodations();

        const accommodation = accommodations[registeredUser.accommodation];

        if (accommodation) {
          cards.push({
            type: "ACCOMMODATION",
            accommodation,
          });
        }
      }

      const registeredMOCs = await getUserMOCs();

      if (mocRegistrationEnabled || registeredMOCs.length > 0) {
        cards.push({
          type: "MOCS",
          registeredMOCs: registeredMOCs.map((moc) => moc.title),
          mocRegistrationEnabled,
        });
      }
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
