import type { NextPage } from "next";

import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import GenericPage from "../../components/page/GenericPage";
import Error from "../../components/message/Error";
import Loading from "../../components/Loading";
import useTawkTo from "../../lib/hooks/useTawkTo";
import RegisterCard from "../../components/card/RegisterCard";
import useUserData from "../../lib/hooks/userUserData";
import { FaExclamation, FaWpforms, FaCubes, FaIdCard } from "react-icons/fa";
import VerifyEmailCard from "../../components/card/VerifyEmailCard";
import TimelineItem from "../../components/timeline/TimelineItem";
import ActivitiesCard from "../../components/card/ActivitiesCard";
import UpdateProfileCard from "../../components/card/UpdateProfileCard";
import looksRealName from "../../lib/utils/looksRealName";
import { IconType } from "react-icons";

type Predicate<I> = (item: I) => boolean;

type UserContext = { emailVerified: boolean; nameUpdated: boolean };

type CardDefinition = {
  condition?: (context: UserContext) => boolean;
  icon: IconType;
  iconBg: string;
  iconFg: string;
  content: JSX.Element;
};

function filterContents<T>(contents: [Predicate<T>, T][]): T[] {
  return contents.filter(([condition, content]) => condition(content)).map(([, content]) => content);
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

  const emailVerified = user.emailVerified;
  const userRegistered = user.registered;

  const registerEnabled = emailVerified && !userRegistered;

  const nameUpdated = looksRealName(user.name);

  const userContext = { emailVerified, nameUpdated };

  const always = () => true;
  const emailNotVerified = () => !userContext.emailVerified;
  const nameNotUpdated = () => !userContext.nameUpdated;

  const contents: [Predicate<CardDefinition>, CardDefinition][] = [
    [emailNotVerified, { icon: FaExclamation, iconBg: "red.500", iconFg: "white", content: <VerifyEmailCard /> }],
    [nameNotUpdated, { icon: FaIdCard, iconBg: "orange.400", iconFg: "white", content: <UpdateProfileCard /> }],
    [
      always,
      {
        icon: FaWpforms,
        iconBg: registerEnabled ? "green.500" : "gray.500",
        iconFg: "white",
        content: <RegisterCard enabled={registerEnabled} registered={userRegistered} />,
      },
    ],
    [always, { icon: FaCubes, iconBg: "gray.500", iconFg: "white", content: <ActivitiesCard enabled={false} /> }],
  ];

  const cards: CardDefinition[] = filterContents(contents);

  return (
    <GenericPage>
      <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 18 }}>
        <Heading as="h1" fontWeight={600} fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }} lineHeight="110%">
          Welcome <br />
          <Text as="span" color="green.400">
            {user.name}
          </Text>
        </Heading>
        <Text color="gray.500">This is your account page, your gateway into the Paredes de Coura Fan Weekend.</Text>
      </Stack>

      <Stack spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 18 }}>
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
