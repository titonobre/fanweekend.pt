import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";

import Container from "../components/Container";
import Content from "../components/Content";
import CookieBanner from "../components/CookieBanner";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Participate from "../components/Participate";
import Welcome from "../components/Welcome";
import When from "../components/When";
import Where from "../components/Where";
import { REGISTRATION_ENABLED } from "../lib/env";

const Index: NextPage = () => (
  <>
    <Navbar transparentOnTop></Navbar>
    <Container>
      <Box minHeight="100vh">
        <Hero />
      </Box>

      <Content>
        <Welcome />

        <When />

        <Where />

        {REGISTRATION_ENABLED && <Participate />}
      </Content>

      <Footer></Footer>
    </Container>
    <CookieBanner />
  </>
);

export default Index;
