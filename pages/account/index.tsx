import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { IconType } from "react-icons";
import { FaExclamation, FaWpforms, FaCubes, FaIdCard, FaClipboardList, FaFileInvoice, FaBed, FaChild } from "react-icons/fa";

import ActivitiesCard from "../../components/card/ActivitiesCard";
import PaymentDetailsCard from "../../components/card/PaymentDetailsCard";
import ProgressCard from "../../components/card/ProgressCard";
import RegisterCard from "../../components/card/RegisterCard";
import RegisterMOCCard from "../../components/card/RegisterMOCCard";
import SelectExtraNightCard from "../../components/card/SelectExtraNightCard";
import UpdateProfileCard from "../../components/card/UpdateProfileCard";
import VerifyEmailCard from "../../components/card/VerifyEmailCard";
import Loading from "../../components/Loading";
import Error from "../../components/message/Error";
import GenericPage from "../../components/page/GenericPage";
import TimelineItem from "../../components/timeline/TimelineItem";
import { REGISTRATION_ENABLED } from "../../lib/env";
import useTawkTo from "../../lib/hooks/useTawkTo";
import useUserData from "../../lib/hooks/useUserData";
import looksRealName from "../../lib/utils/looksRealName";

type Predicate<I> = (item: I) => boolean;

type UserContext = { emailVerified: boolean; nameUpdated: boolean };

type CardDefinition = {
  condition?: (context: UserContext) => boolean;
  icon: IconType;
  iconBg: string;
  iconFg: string;
  content: JSX.Element;
};

function filterContents<T>(contents: [boolean | Predicate<T>, T][]): T[] {
  return contents
    .filter(([condition, content]) => (typeof condition === "function" ? condition(content) : condition))
    .map(([, content]) => content);
}

const MePage: NextPage = () => {
  const { user, isLoading } = useUserData();
  useTawkTo(user);

  if (isLoading) {
    return (
      <GenericPage>
        <Loading />
      </GenericPage>
    );
  }

  if (!user) {
    return (
      <GenericPage>
        <Error title="Something went Sideways" message="Please logout and login again." />
      </GenericPage>
    );
  }

  const always = true;
  const registrationEnabled = REGISTRATION_ENABLED;
  const emailVerified = user.emailVerified;
  const emailNotVerified = !user.emailVerified;
  const isVolunteer = user.isVolunteer;
  const nameUpdated = looksRealName(user.name);
  const nameNotUpdated = !nameUpdated;
  const formSubmitted = user.formSubmitted;
  const formNotSubmitted = !formSubmitted;
  const registerEnabled = registrationEnabled && emailVerified && !formSubmitted;
  const showPaymentDetails = user.paymentEnabled && !user.paymentReceived;
  const showExtraNightSelection = formSubmitted && !user.extraNightSelected;
  const showMOCRegistration = formSubmitted;

  const progress = {
    paymentEnabled: user.paymentEnabled,
    paymentReceived: user.paymentReceived,
  };

  const contents: [boolean, CardDefinition][] = [
    [formSubmitted, { icon: FaClipboardList, iconBg: "blue.500", iconFg: "white", content: <ProgressCard progress={progress} /> }],
    [emailNotVerified, { icon: FaExclamation, iconBg: "red.500", iconFg: "white", content: <VerifyEmailCard /> }],
    [nameNotUpdated, { icon: FaIdCard, iconBg: "orange.400", iconFg: "white", content: <UpdateProfileCard /> }],
    [
      formNotSubmitted,
      {
        icon: FaWpforms,
        iconBg: registerEnabled ? "green.500" : "gray.500",
        iconFg: "white",
        content: <RegisterCard enabled={registerEnabled} registered={formSubmitted} />,
      },
    ],
    [
      showPaymentDetails,
      {
        icon: FaFileInvoice,
        iconBg: "pink.500",
        iconFg: "white",
        content: <PaymentDetailsCard plan={user.plan} isVolunteer={isVolunteer} />,
      },
    ],
    [showExtraNightSelection, { icon: FaBed, iconBg: "orange.700", iconFg: "white", content: <SelectExtraNightCard /> }],

    [showMOCRegistration, { icon: FaCubes, iconBg: "teal.500", iconFg: "white", content: <RegisterMOCCard /> }],
    [always, { icon: FaChild, iconBg: "gray.500", iconFg: "white", content: <ActivitiesCard enabled={false} /> }],
  ];

  const cards: CardDefinition[] = filterContents(contents);

  return (
    <GenericPage>
      <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} my={{ base: 10, md: 18 }}>
        <Heading as="h1" fontWeight={600} fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }} lineHeight="110%">
          Welcome <br />
          <Text as="span" color="green.400">
            {user.name}
          </Text>
        </Heading>
        <Text color="gray.500">This is your account page, your gateway into the Paredes de Coura Fan Weekend.</Text>
      </Stack>

      <Stack spacing={{ base: 8, md: 14 }} my={{ base: 10, md: 18 }}>
        {cards.map((card, index) => (
          <TimelineItem key={index} icon={card.icon} iconBg={card.iconBg} iconFg={card.iconFg}>
            {card.content}
          </TimelineItem>
        ))}
      </Stack>

      <SimpleGrid columns={{ base: 1 }} spacing={10}></SimpleGrid>
    </GenericPage>
  );
};

export default withPageAuthRequired(MePage);
