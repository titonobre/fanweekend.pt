import { Box, Heading, Text, Stack, Link, Button, Center } from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";

import { ADD_TO_CALENDAR } from "../lib/env";

import Calendar from "./Calendar";

const showAddToCalendarButton = ADD_TO_CALENDAR;

export default function When() {
  return (
    <>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="3xl">When?</Heading>
        <Text color="gray.600" fontSize="xl">
          The event takes place from 9 to 11 of June, 2023. Setup will be on 9 of June, 2023.
        </Text>
      </Stack>

      {showAddToCalendarButton && (
        <Box marginY={10}>
          <Center>
            <Button as={Link} leftIcon={<FaCalendar />} colorScheme="green" href="/api/ical">
              add to your calendar
            </Button>
          </Center>
        </Box>
      )}

      <Box marginY={10}>
        <Center>
          <Calendar />
        </Center>
      </Box>
    </>
  );
}
