import type { NextPage } from "next";

import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import GenericPage from "../../components/page/GenericPage";
import Error from "../../components/message/Error";
import Loading from "../../components/Loading";
import useTawkTo from "../../lib/hooks/useTawkTo";
import RegisterCard from "../../components/card/RegisterCard";
import useUserData from "../../lib/hooks/userUserData";
import { FaExclamation, FaWpforms, FaCubes } from "react-icons/fa";
import VerifyEmailCard from "../../components/card/VerifyEmailCard";
import TimelineItem from "../../components/timeline/TimelineItem";
import ActivitiesCard from "../../components/card/ActivitiesCard";

const MePage: NextPage = () => {
  const { user, isLoading } = useUserData();
  useTawkTo();

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
        {!emailVerified ? (
          <>
            <TimelineItem icon={FaExclamation} iconBg="red.500" iconFg="white">
              <VerifyEmailCard />
            </TimelineItem>
            <TimelineItem icon={FaWpforms} iconBg="gray.500" iconFg="white">
              <RegisterCard enabled={false} />
            </TimelineItem>
            <TimelineItem icon={FaCubes} iconBg="gray.500" iconFg="white">
              <ActivitiesCard enabled={false} />
            </TimelineItem>
          </>
        ) : (
          <>
            <TimelineItem icon={FaWpforms} iconBg="green.500" iconFg="white">
              <RegisterCard enabled={true} registered={user.registered} />
            </TimelineItem>
            <TimelineItem icon={FaCubes} iconBg="gray.500" iconFg="white">
              <ActivitiesCard enabled={false} />
            </TimelineItem>
          </>
        )}
      </Stack>

      <SimpleGrid columns={{ base: 1 }} spacing={10}></SimpleGrid>
    </GenericPage>
  );
};

export default withPageAuthRequired(MePage);
