import { Box, Heading, Text, Stack, Link, Button, HStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function SelectExtraNightCard() {
  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          Extra Night
        </Heading>
        <Text>Your registration fee includes an extra night. We need you to make a choice.</Text>
        <HStack justify="end">
          <NextLink href="/account/form/extra-night" passHref>
            <Button as={Link} w="fit-content" colorScheme="green">
              Select Extra Night
            </Button>
          </NextLink>
        </HStack>
      </Stack>
    </Box>
  );
}
