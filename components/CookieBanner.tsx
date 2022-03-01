import NextLink from "next/link";
import { Stack, Text, Button, Link } from "@chakra-ui/react";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [cookieBannerDismissedValue, setCookieBannerDismissedValue] = useLocalStorage("cookieBannerDismissed", "false");

  const [cookieBannerDismissed, setCookieBannerDismissed] = useState(true);

  useEffect(() => {
    setCookieBannerDismissed(cookieBannerDismissedValue === "true");
  }, [cookieBannerDismissedValue]);

  if (cookieBannerDismissed) {
    return null;
  }

  return (
    <Stack p="4" boxShadow="dark-lg" m="4" borderRadius="sm" backgroundColor="white" position="sticky" bottom={0}>
      <Text fontWeight="semibold">Regarding Your Privacy</Text>

      <Stack direction={{ base: "column", md: "row" }} justifyContent="space-between">
        <Text fontSize={{ base: "sm" }} textAlign="left" maxW="4xl">
          We use cookies and other tracking technologies to help provide you a better experience. By using the website or clicking OK you
          agree to this. Take a few minutes to read our Privacy Policy.
        </Text>
        <Stack direction={{ base: "column", md: "row" }}>
          <NextLink href="/privacy" passHref>
            <Button as={Link} variant="outline" colorScheme="green">
              Privacy Policy
            </Button>
          </NextLink>
          <Button colorScheme="green" onClick={() => setCookieBannerDismissedValue("true")}>
            OK
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
