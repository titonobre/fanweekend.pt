import { Flex, Text } from "@chakra-ui/react";

import background from "../assets/images/background.svg?url";
import Logo from "../assets/images/pdcfw-logo.svg";

export const Hero = () => (
  <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    style={{
      minWidth: "100vw",
      minHeight: "100vh",
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundAttachment: "fixed",
    }}
  >
    <Logo style={{ maxWidth: "50vw", maxHeight: "50vh", height: "inherit" }} />
    <Text w="100%" p={4} color="white" textAlign="center" fontSize={"6xl"} textColor="#35495e">
      Coming Soon!
    </Text>
  </Flex>
);
