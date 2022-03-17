import { Box, Heading, Text, Stack, HStack, Button, useBoolean, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";

import useApi from "../../lib/hooks/useApi";
import useTawkTo from "../../lib/hooks/useTawkTo";

export default function VerifyEmailCard() {
  const resendVerificationEmailApiEndpoint = useApi("/resend-verification-email");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [emailSent, setEmailSent] = useBoolean(false);
  const { showChat } = useTawkTo();

  const resendVerificationEmail = async () => {
    setEmailSent.off();
    setErrorMessage(undefined);

    const response = await fetch(resendVerificationEmailApiEndpoint, { method: "GET" });

    if (response.status === 200) {
      setEmailSent.on();
    } else {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          Email Verification
        </Heading>
        <Text color="gray.500">Please check your email inbox and follow the instructions to verify your account.</Text>
        <Text color="gray.500">Also check your spam/junk mail folders.</Text>
        <Text color="gray.500">Still not working? We can resend you the verification email.</Text>
        <HStack justify="end">
          <Button colorScheme="green" variant="outline" onClick={showChat}>
            Help
          </Button>
          <Button colorScheme="green" onClick={resendVerificationEmail}>
            Resend
          </Button>
        </HStack>

        {emailSent && (
          <Alert status="success" borderRadius={6}>
            <AlertIcon />
            Email Sent.
          </Alert>
        )}

        {errorMessage && (
          <Alert status="error" borderRadius={6}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
