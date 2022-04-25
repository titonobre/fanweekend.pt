import { Box, Heading, Text, Stack, Link, Button, HStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function RegisterMOCCard() {
  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          MOCs Registration
        </Heading>
        <Text>Want to bring some of your creations? Fill the MOC Registration Form once for each MOC you wish to display.</Text>
        <HStack justify="end">
          <NextLink href="/form/register-moc" passHref>
            <Button as={Link} w="fit-content" colorScheme="green">
              Register MOC
            </Button>
          </NextLink>
        </HStack>
      </Stack>
    </Box>
  );
}
