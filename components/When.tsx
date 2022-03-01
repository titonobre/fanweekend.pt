import { Box, Heading, Text, Stack, Link, Button, Center } from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";

import Calendar from "./Calendar";

export default function When() {
  return (
    <>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="3xl">When?</Heading>
        <Text color="gray.600" fontSize="xl">
          The event takes place from 10 to 12 of June, 2022. Setup will be on 10 of June, 2022.
        </Text>
      </Stack>

      <Box marginY={10}>
        <Center>
          <Button as={Link} leftIcon={<FaCalendar />} colorScheme="green" href="/api/ical">
            add to your calendar
          </Button>
        </Center>
      </Box>

      <Box marginY={10}>
        <Center>
          <Calendar />
        </Center>
      </Box>
    </>
  );
}
