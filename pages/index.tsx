import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";

import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Where from "../components/Where";
import Participate from "../components/Participate";
import Content from "../components/Content";
import Container from "../components/Container";
import When from "../components/When";
import Welcome from "../components/Welcome";
import CookieBanner from "../components/CookieBanner";

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

        <Participate />
      </Content>

      <Footer></Footer>
    </Container>
    <CookieBanner />
  </>
);

export default Index;
