import type { NextPage } from "next";

import Container from "../Container";
import Content from "../Content";
import CookieBanner from "../CookieBanner";
import Footer from "../Footer";
import Navbar from "../Navbar";

export type Props = {
  children: React.ReactNode;
};

const GenericPage: NextPage<Props> = ({ children }) => {
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
