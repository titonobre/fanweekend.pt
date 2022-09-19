import { Box, Flex, HStack, Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

import useScrollState from "../lib/hooks/useScrollState";

export type NavbarProps = {
  transparentOnTop?: boolean;
};

export default function Navbar({ transparentOnTop }: NavbarProps = { transparentOnTop: false }) {
  const backgroundColor = useColorModeValue("gray.100", "gray.900");

  const [scrollPosition, scrollDirection] = useScrollState();

  const isScrolled = scrollPosition > 100;
  const isScrolledFar = scrollPosition > 150;

  const isTransparent = transparentOnTop && !isScrolledFar;

  const isScrollingDown = scrollDirection === "down";

  const showLogo = !isTransparent;

  const bg = isTransparent ? "transparent" : backgroundColor;
  const top = isScrolled && isScrollingDown ? -100 : 0;

  return (
    <Box bg={bg} px={4} position="sticky" top={top} zIndex={9000} transition="all .2s" shadow={isScrolledFar ? "2xl" : undefined}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          {showLogo && (
            <NextLink href="/" passHref>
              <Link>Paredes de Coura Fan Weekend</Link>
            </NextLink>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
