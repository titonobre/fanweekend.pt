"use client";

import { type ReactNode } from "react";

import { AlertCircle } from "lucide-react";

import { AccommodationCard } from "@/components/card/accommodation-card";
import { EventProgramCard } from "@/components/card/event-program-card";
import { ExtraNightCard } from "@/components/card/extra-night-card";
import { MessageCard } from "@/components/card/message-card";
import { MOCsCard } from "@/components/card/mocs-card";
import { PaymentDetailsCard } from "@/components/card/payment-details";
import { ProgressCard } from "@/components/card/progress-card";
import { RegistrationCard } from "@/components/card/registration-card";
import { WelcomeCard } from "@/components/card/welcome-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";

type CardDef = RouterOutputs["dashboard"]["getCards"][number];

function renderCard(card: CardDef): ReactNode {
  switch (card.type) {
    case "WELCOME":
      return <WelcomeCard {...card} />;
    case "MESSAGE":
      return <MessageCard {...card} />;
    case "REGISTRATION":
      return <RegistrationCard {...card}></RegistrationCard>;
    case "PROGRESS":
      return <ProgressCard {...card}></ProgressCard>;
    case "PAYMENT_DETAILS":
      return <PaymentDetailsCard />;
    case "MOCS":
      return <MOCsCard {...card} />;
    case "EXTRA_NIGHT":
      return <ExtraNightCard />;
    case "ACCOMMODATION":
      return <AccommodationCard {...card} />;
    case "EVENT_PROGRAM":
      return <EventProgramCard />;
  }
}

export default function Account() {
  const cardsQuery = api.dashboard.getCards.useQuery();

  if (cardsQuery.status === "loading") {
    return (
      <div className="thin-container mt-10 flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[36px] w-1/2 rounded-lg" />
          <Skeleton className="h-[24px] w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (cardsQuery.status === "error" || !cardsQuery.data) {
    return (
      <div className="thin-container mt-10 flex flex-col gap-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Whoops!</AlertTitle>
          <AlertDescription>Something wrong is not right. If the problem persists, please contact us.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <section className="thin-container mt-10 flex flex-col gap-10">
      {cardsQuery.data.map((card, i) => {
        return (
          <div key={i} className="contents">
            {renderCard(card)}
          </div>
        );
      })}
    </section>
  );
}
