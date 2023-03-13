import { Box, Heading, Text, Stack, Link, Button, HStack, useToken } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaCheckCircle } from "react-icons/fa";

type SelectExtraNightCardProps = {
  done?: boolean;
};

export default function SelectExtraNightCard({ done = false }: SelectExtraNightCardProps) {
  const [colorGreen500] = useToken("colors", ["green.500"]);
  const [size2xl] = useToken("sizes", [8]);

  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          Extra Night
        </Heading>
        <Text>Your registration fee includes an extra night. We need you to make a choice.</Text>
        <HStack justify="end">
          {done ? (
            <>
              <Text color="gray.500">Extra Night Selected!</Text>
              <FaCheckCircle color={colorGreen500} fontSize={size2xl} />
            </>
          ) : (
            <NextLink href="/account/form/extra-night" passHref>
              <Button as={Link} w="fit-content" colorScheme="green">
                Select Extra Night
              </Button>
            </NextLink>
          )}
        </HStack>
      </Stack>
    </Box>
  );
}
