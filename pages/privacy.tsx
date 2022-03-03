import type { NextPage } from "next";
import { Box, Heading, HStack, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { FaCookieBite, FaProjectDiagram, FaInbox, FaCogs, FaFolderOpen, FaVoteYea, FaEnvelope } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Content from "../components/Content";
import Container from "../components/Container";
import CookieBanner from "../components/CookieBanner";

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Container>
        <Navbar></Navbar>

        <Content>
          <Stack spacing={4} textAlign="center">
            <Heading fontSize="3xl">Privacy Policy</Heading>
            <Text color="gray.600" fontSize="xl">
              Hello. We are the Paredes de Coura Fan Weekend steering group. Here&apos;s a summary of how we protect your data and respect
              your privacy.
            </Text>
          </Stack>

          <Stack spacing={4} marginY={10}>
            <Heading fontSize="2xl">
              <HStack>
                <FaInbox />
                <Box>Types of data we collect</Box>
              </HStack>
            </Heading>
            <Text color="gray.600" fontSize="l">
              <UnorderedList>
                <ListItem>Personal information filled in the registration form</ListItem>
                <ListItem>Browser information</ListItem>
              </UnorderedList>
            </Text>
          </Stack>

          <Stack spacing={4} marginY={10}>
            <Heading fontSize="2xl">
              <HStack>
                <FaCogs />
                <Box>How we use your data</Box>
              </HStack>
            </Heading>
            <Text color="gray.600" fontSize="l">
              <UnorderedList>
                <ListItem>To manage the event registrations</ListItem>
                <ListItem>To improve the website</ListItem>
              </UnorderedList>
            </Text>
          </Stack>

          <Stack spacing={4} marginY={10}>
            <Heading fontSize="2xl">
              <HStack>
                <FaFolderOpen />
                <Box>When we collect data</Box>
              </HStack>
            </Heading>
            <Text color="gray.600" fontSize="l">
              We collect when:
            </Text>
            <Text color="gray.600" fontSize="l">
              <UnorderedList>
                <ListItem>You browse any page of the website</ListItem>
                <ListItem>You register for the event</ListItem>
              </UnorderedList>
            </Text>
          </Stack>

          <Stack spacing={4} marginY={10}>
            <Heading fontSize="2xl">
              <HStack>
                <FaProjectDiagram />
                <Box>Third parties who process your data</Box>
              </HStack>
            </Heading>
            <Text color="gray.600" fontSize="l">
              The following services help us keep this site running by storing or processing your data on our behalf:
            </Text>
            <Text color="gray.600" fontSize="l">
              <UnorderedList>
                <ListItem>Infrastructure: Vercel, WebTuga</ListItem>
                <ListItem>Analytics: Google Analytics</ListItem>
                <ListItem>Authentication: Auth0</ListItem>
              </UnorderedList>
            </Text>
          </Stack>

          <Stack spacing={4} marginY={10}>
            <Heading fontSize="2xl">
              <HStack>
                <FaCookieBite />
                <Box>We Use Cookies</Box>
              </HStack>
            </Heading>
            <Text color="gray.600" fontSize="l">
              <UnorderedList>
                <ListItem>We use only necessary cookies to run and improve the page</ListItem>
                <ListItem>Our third-party service providers use cookies too (which they control)</ListItem>
                <ListItem>You can turn off cookies but this will mean that we can&apos;t recognize you</ListItem>
              </UnorderedList>
            </Text>
          </Stack>

          <Stack spacing={4} marginY={10}>
            <Heading fontSize="2xl">
              <HStack>
                <FaVoteYea />
                <Box>Know your rights</Box>
              </HStack>
            </Heading>
            <Text color="gray.600" fontSize="l">
              <UnorderedList>
                <ListItem>Access information we hold on you</ListItem>
                <ListItem>Be forgotten by us</ListItem>
                <ListItem>Complain about us</ListItem>
              </UnorderedList>
            </Text>
          </Stack>

          <Stack spacing={4} marginY={10}>
            <Heading fontSize="2xl">
              <HStack>
                <FaEnvelope />
                <Box>Contact us</Box>
              </HStack>
            </Heading>
            <Text color="gray.600" fontSize="l">
              If you have any concerns about your privacy, please email us at info@fanweekend.pt
            </Text>
          </Stack>
        </Content>

        <Footer></Footer>
      </Container>
      <CookieBanner />
    </>
  );
};

export default PrivacyPolicyPage;