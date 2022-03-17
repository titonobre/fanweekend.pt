import { Box, Heading, Text, Stack, Link, Button, HStack, useToken } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaCheckCircle } from "react-icons/fa";

type RegisterCardProps = {
  enabled: boolean;
  registered?: boolean;
};

export default function RegisterCard({ enabled = false, registered = false }: RegisterCardProps) {
  const [colorGreen500] = useToken("colors", ["green.500"]);
  const [size2xl] = useToken("sizes", [8]);

  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color={enabled ? "gray.700" : "gray.500"} fontSize="2xl" fontFamily="body">
          Registration
        </Heading>
        <Text color="gray.500">Want to be part of the event? The first step is to register.</Text>
        <HStack justify="end">
          {registered ? (
            <>
              <Text color="gray.500">Form Submitted!</Text>
              <FaCheckCircle color={colorGreen500} fontSize={size2xl} />
            </>
          ) : enabled ? (
            <NextLink href="/account/plans" passHref>
              <Button as={Link} w="fit-content" colorScheme="green">
                Register
              </Button>
            </NextLink>
          ) : (
            <Button disabled>Register</Button>
          )}
        </HStack>
      </Stack>
    </Box>
  );
}
