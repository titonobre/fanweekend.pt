import { Flex } from "@chakra-ui/react";

import background from "../assets/images/background.svg?url";
import Logo from "../assets/images/pdcfw-logo.svg";

export default function Hero() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      top={0}
      position={["absolute", "absolute"]}
      style={{
        zIndex: 0,
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
    </Flex>
  );
}
