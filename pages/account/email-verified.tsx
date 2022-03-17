import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Button, Flex, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";

import Loading from "../../components/Loading";
import Error from "../../components/message/Error";
import Success from "../../components/message/Success";
import GenericPage from "../../components/page/GenericPage";
import useUpdatedUser from "../../lib/hooks/useUpdatedUser";

const MePage: NextPage = () => {
  const { user, isLoading } = useUpdatedUser();

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
        <Error title="Something when wrong" message="User data is missing!" />
      </GenericPage>
    );
  }

  if (!user.email_verified) {
    return (
      <GenericPage>
        <Error title="Email Not Verified" message="Please reload the page or logout and login again!" />
      </GenericPage>
    );
  }

  return (
    <GenericPage>
      <Success title="Email Verified" message="Thank you for verifying your email address. You can now go back to your account." />
      <Flex justifyContent="center">
        <NextLink href="/account" passHref>
          <Button as={Link} w="fit-content" colorScheme="green">
            My Account
          </Button>
        </NextLink>
      </Flex>
    </GenericPage>
  );
};

export default withPageAuthRequired(MePage);
