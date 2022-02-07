import type { NextPage } from "next";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";

const Index: NextPage = () => (
  <>
    <Container height="100vh">
      <Hero />
    </Container>
  </>
);

export default Index;
