import type { NextPage } from "next";
import NextLink from "next/link";

import { Box, Button, Heading, Link, Stack, Text } from "@chakra-ui/react";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Content from "../../components/Content";
import Container from "../../components/Container";
import CookieBanner from "../../components/CookieBanner";

const MePage: NextPage = () => {
  const { error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Navbar />

      <Container>
        <Content>
          <Box marginY={10}>
            <Stack spacing={4} textAlign="center" alignItems="center">
              <Heading fontSize="3xl">Email Verified</Heading>
              <Text color="gray.600" fontSize="xl">
                Thank you for verifying your email address. You can now go back to your account.
              </Text>
              <NextLink href="/account" passHref>
                <Button as={Link} w="fit-content" colorScheme="green">
                  My Account
                </Button>
              </NextLink>
            </Stack>
          </Box>
        </Content>

        <Footer></Footer>
      </Container>

      <CookieBanner />
    </>
  );
};

export default withPageAuthRequired(MePage);
