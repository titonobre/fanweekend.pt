import { Box, Heading, Stack, Button, HStack, Link } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";

import cardText from "../../data/event-program-card.md?raw";

export default function ActivitiesCard() {
  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading fontSize="2xl" fontFamily="body">
          Event Program
        </Heading>
        <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
          {cardText}
        </ReactMarkdown>

        <HStack justify="end">
          <NextLink href="/program" passHref>
            <Button as={Link} w="fit-content" colorScheme="green">
              Event Program
            </Button>
          </NextLink>
        </HStack>
      </Stack>
    </Box>
  );
}
