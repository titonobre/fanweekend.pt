import NextLink from "next/link";

import {
  Box,
  Link,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0";
import useScrollState from "../lib/hooks/useScrollState";

export type NavbarProps = {
  transparentOnTop?: boolean;
};

export default function Navbar({ transparentOnTop }: NavbarProps = { transparentOnTop: false }) {
  const { user } = useUser();

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
    <Box bg={bg} px={4} position="sticky" top={top} zIndex={9000} transition="all .2s">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          {showLogo && (
            <NextLink href="/" passHref>
              <Link>Paredes de Coura Fan Weekend</Link>
            </NextLink>
          )}
        </HStack>
        <Flex alignItems="center">
          {user ? (
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar size="sm" name={user.name || "?"} src={user.picture || ""} />
              </MenuButton>
              <MenuList>
                <MenuItem as="a" href="/account">
                  My Account
                </MenuItem>
                <MenuDivider />
                <MenuItem as="a" href="/api/auth/logout">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={6}>
              <Button as="a" fontSize="sm" fontWeight={400} variant="link" href="/api/auth/login?returnTo=/account">
                Sign In
              </Button>
              <Button
                as="a"
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="pink.400"
                href="/api/signup"
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
