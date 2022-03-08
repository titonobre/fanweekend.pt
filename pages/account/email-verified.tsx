import { useState, useEffect } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";

import { Button, Flex, Link } from "@chakra-ui/react";

import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";

import Error from "../../components/message/Error";
import GenericPage from "../../components/page/GenericPage";
import Success from "../../components/message/Success";
import Loading from "../../components/Loading";

const MePage: NextPage = () => {
  const [user, setUser] = useState<UserProfile>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/refresh-profile")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

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
