import type { NextPage } from "next";
import NextLink from "next/link";

import { Box, Button, Heading, Link, Stack, Text } from "@chakra-ui/react";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import GenericPage from "../../components/page/GenericPage";
import Error from "../../components/message/Error";
import Loading from "../../components/Loading";
import useTawkTo from "../../lib/hooks/useTawkTo";

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
      <Box marginY={10}>
        <Stack spacing={4} textAlign="center" alignItems="center">
          <Heading fontSize="3xl">Register</Heading>
          <Text color="gray.600" fontSize="xl">
            Want to be part of the event? The first step is to register.
          </Text>
          <NextLink href="/account/plans" passHref>
            <Button as={Link} w="fit-content" colorScheme="green">
              Register
            </Button>
          </NextLink>
        </Stack>
      </Box>
    </GenericPage>
  );
};

export default withPageAuthRequired(MePage);
