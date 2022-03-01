import { Box, Heading, SimpleGrid, Text, Stack, VStack, Link, Button } from "@chakra-ui/react";
import { FaMap } from "react-icons/fa";

import Iberia from "../assets/images/iberia-map.svg";

export default function Where() {
  return (
    <>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="3xl">Where on Earth is Paredes de Coura?</Heading>
        <Text color="gray.600" fontSize="xl">
          In case this is your first time or you find yourself lost, the event takes place in the town of Paredes de Coura, located in
          Northern Portugal in the district of Viana do Castelo, 100 km away from Porto in Portugal and 50 km from Vigo in Spain.
        </Text>
      </Stack>

      <Box marginY={10}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={10}>
          <VStack align="center" spacing={10}>
            <VStack align="center">
              <Text fontWeight={600}>Address</Text>
              <Text color="gray.600">Centro Cultural</Text>
              <Text color="gray.600">Av. Cónego Bernardo Chousal</Text>
              <Text color="gray.600">Paredes de Coura</Text>
              <Text color="gray.600">Portugal</Text>
            </VStack>
            <VStack align="center">
              <Text fontWeight={600}>GPS Coordinates</Text>
              <Text color="gray.600">41°54&apos;42.90&quot;N 8°33&apos;46.18&quot;W</Text>
            </VStack>
            <Button
              as={Link}
              leftIcon={<FaMap />}
              colorScheme="green"
              href="https://goo.gl/maps/gZ8RhfG381J2"
              target="_blank"
              rel="noreferrer"
            >
              view on Google Maps
            </Button>
          </VStack>
          <Box color="green.400" width={{ base: "200%", sm: "350%" }} px={2} paddingLeft={{ base: "25%", sm: "0" }}>
            <Iberia />
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
