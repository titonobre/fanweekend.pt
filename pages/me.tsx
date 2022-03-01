import type { NextPage } from "next";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Content from "../components/Content";
import Container from "../components/Container";
import Participate from "../components/Participate";
import CookieBanner from "../components/CookieBanner";

const MePage: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Container>
        <Navbar></Navbar>

        <Content>{user && <Participate />}</Content>

        <Footer></Footer>
      </Container>
      <CookieBanner />
    </>
  );
};

export default withPageAuthRequired(MePage);
