import type { NextPage } from "next";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Content from "../Content";
import Container from "../Container";
import CookieBanner from "../CookieBanner";

const GenericPage: NextPage = ({ children }) => {
  return (
    <>
      <Navbar />

      <Container>
        <Content>{children}</Content>

        <Footer></Footer>
      </Container>

      <CookieBanner />
    </>
  );
};

export default GenericPage;
