import type { NextPage } from "next";

import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import GenericPage from "../../components/page/GenericPage";
import Error from "../../components/message/Error";
import Loading from "../../components/Loading";
import useTawkTo from "../../lib/hooks/useTawkTo";
import RegisterCard from "../../components/card/RegisterCard";

const MePage: NextPage = () => {
  const { user, error, isLoading } = useUser();
  useTawkTo();

  if (isLoading) {
    return (
      <GenericPage>
        <Loading />
      </GenericPage>
    );
  }

  if (error || !user) {
    return (
      <GenericPage>
        <Error title="Something went Sideways" message={`Please logout and login again. ${error?.message || ""}`} />
      </GenericPage>
    );
  }

  if (!user?.email_verified) {
    return (
      <GenericPage>
        <Error title="Email not Verified" message="Please check your email inbox to verify your account." />
      </GenericPage>
    );
  }

  return (
    <GenericPage>
      <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 18 }}>
        <Heading as="h1" fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }} lineHeight="110%">
          Welcome <br />
          <Text as="span" color="green.400">
            {user.name}
          </Text>
        </Heading>
        <Text color="gray.500">This is your account page, your gateway into the Paredes de Coura Fan Weekend.</Text>
      </Stack>

      <SimpleGrid columns={{ base: 1 }} spacing={10}>
        <RegisterCard />
      </SimpleGrid>
    </GenericPage>
  );
};

export default withPageAuthRequired(MePage);
