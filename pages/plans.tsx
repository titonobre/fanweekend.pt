import type { NextPage } from "next";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Content from "../components/Content";
import Container from "../components/Container";
import Participate from "../components/Participate";
import CookieBanner from "../components/CookieBanner";
import Loading from "../components/Loading";
import GenericPage from "../components/page/GenericPage";
import Error from "../components/message/Error";

const MePage: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading)
    return (
      <GenericPage>
        <Loading />
      </GenericPage>
    );

  if (error || !user) {
    return (
      <GenericPage>
        <Error title="Something went Sideways" message={`Please logout and login again. ${error?.message || ""}`} />
      </GenericPage>
    );
  }
  return (
    <>
      <Navbar />

      <Container>
        <Content>{user && <Participate />}</Content>

        <Footer></Footer>
      </Container>

      <CookieBanner />
    </>
  );
};

export default withPageAuthRequired(MePage);
