import { Box, chakra, Container, Flex, Link, Stack, Text, useColorModeValue, VisuallyHidden } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";
import { FaInstagram, FaFacebookF, FaHeart } from "react-icons/fa";

import styles from "./Footer.module.css";
import RecognizedEventBadge from "./RecognizedEventBadge";

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithSocial() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
      <Container
        as={Stack}
        maxW="6xl"
        py={8}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Flex width={{ base: "200px", md: "300px" }}>
          <RecognizedEventBadge />
        </Flex>

        <Stack direction="column" align={{ base: "center", md: "start" }}>
          <Text>
            Made with{" "}
            <FaHeart className={styles.pulsating} style={{ display: "inline", verticalAlign: "middle", color: "#f14668" }} title="love" />{" "}
            by{" "}
            <Link href="https://comunidade0937.com" target="_blank" rel="noreferrer">
              Comunidade 0937
            </Link>
            . LEGO® is a trademark of the LEGO Group, which does not sponsor, authorize or endorse this web site.
          </Text>
          <Text fontSize="small">
            <NextLink href="/privacy" passHref>
              <Link>Privacy Policy</Link>
            </NextLink>
          </Text>
        </Stack>
        <Stack direction="row" spacing={6}>
          <SocialButton label="Facebook" href="https://www.facebook.com/groups/fanweekend.pt/">
            <FaFacebookF />
          </SocialButton>
          <SocialButton label="Instagram" href="https://www.instagram.com/pdcfanweekend/">
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
