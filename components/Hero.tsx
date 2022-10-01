import { Box, Flex } from "@chakra-ui/react";

import background from "../assets/images/background.svg?url";
import Logo from "../assets/images/pdcfw-logo.svg";

export default function Hero() {
  return (
    <Flex
      direction="column"
      justifyContent="flex-start"
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
      paddingTop={{ base: "10vh" }}
    >
      <Box maxWidth={{ base: "200px", sm: "250px", md: "300px" }}>
        <Logo
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "inherit",
            maxHeight: "100%",
            filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.3))",
          }}
        />
      </Box>
    </Flex>
  );
}
