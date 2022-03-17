import type { NextPage } from "next";

import Container from "../Container";
import Content from "../Content";
import CookieBanner from "../CookieBanner";
import Footer from "../Footer";
import Navbar from "../Navbar";

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
