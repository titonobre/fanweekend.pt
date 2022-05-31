import { Box, Heading, Stack, Button, HStack, Link } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";

import activitiesCardText from "../../data/activities-card.md?raw";

export default function ActivitiesCard() {
  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading fontSize="2xl" fontFamily="body">
          Activities
        </Heading>
        <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
          {activitiesCardText}
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
