import type { NextPage } from "next";
import NextLink from "next/link";

import { Button, Flex, Link } from "@chakra-ui/react";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import GenericPage from "../../components/page/GenericPage";
import Info from "../../components/message/Info";

const MePage: NextPage = () => {
  return (
    <GenericPage>
      <Info title="Welcome!" message="Your account has been created. Please check your email inbox to verify your account." />
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
