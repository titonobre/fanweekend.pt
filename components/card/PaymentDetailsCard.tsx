import { Box, Heading, Stack, Button, HStack } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

import paymentDetails from "../../data/payment-details.md?raw";
import { PAYMENT_ACCOUNT_HOLDER, PAYMENT_ACCOUNT_IBAN, PAYMENT_ACCOUNT_BIC_SWIFT } from "../../lib/env";
import useTawkTo from "../../lib/hooks/useTawkTo";

const PLAN_AMOUNT: { [k: string]: string } = {
  basic: "€120.00",
  full: "€150.00",
};

export type PaymentDetailsCardProps = {
  plan: string;
};

export default function PaymentDetailsCard({ plan }: PaymentDetailsCardProps) {
  const { showChat } = useTawkTo();

  const replacements: { [k: string]: string | undefined } = {
    ACCOUNT_HOLDER: PAYMENT_ACCOUNT_HOLDER,
    ACCOUNT_IBAN: PAYMENT_ACCOUNT_IBAN,
    ACCOUNT_BIC_SWIFT: PAYMENT_ACCOUNT_BIC_SWIFT,
    AMOUNT: PLAN_AMOUNT[plan],
  };

  console.log(replacements);

  const paymentDetailsText = paymentDetails.replaceAll(/\{\{([A-Z_]+)\}\}/g, (match, group1: string) => {
    return (typeof group1 === "string" && replacements[group1]) || match;
  });

  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          Payment Details
        </Heading>
        <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
          {paymentDetailsText}
        </ReactMarkdown>
        <HStack justify="end">
          <Button colorScheme="green" variant="outline" onClick={showChat}>
            Contact Us
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
