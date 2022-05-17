import { Box, Heading, Text, Stack, Link, Button, HStack, VStack, Icon, AlertIcon, Alert } from "@chakra-ui/react";
import { FaDirections, FaEnvelope, FaHotel, FaMap, FaPhoneAlt, FaUser } from "react-icons/fa";
import useSWR from "swr";

import { HouseData } from "../../lib/data/fetchAccommodations";
import useApi from "../../lib/hooks/useApi";

const fetcher = async (url: string) => {
  return fetch(url).then((res) => res.json());
};

export default function MyAccommodation() {
  const apiEndpoint = useApi("/my/accommodation");

  const { data, isValidating, error } = useSWR<HouseData>(apiEndpoint, fetcher, {});

  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          My Accommodation
        </Heading>
        {isValidating && <Text>Fetching Accommodation details...</Text>}

        {error && (
          <Alert status="error" borderRadius={6}>
            <AlertIcon />
            <Text>There was some error fetching the information regarding your accommodation. Please contact us.</Text>
          </Alert>
        )}

        {data && (
          <>
            <VStack align="start">
              <HStack>
                <Icon as={FaHotel} title="Name" />
                <Text>{data?.name}</Text>
              </HStack>
              <HStack>
                <Icon as={FaMap} title="Locality" />
                <Text>{data?.locality}</Text>
              </HStack>
              <HStack>
                <Icon as={FaUser} title="Contact Persons" />
                <Text>{data?.contact}</Text>
              </HStack>
              <HStack>
                <Icon as={FaPhoneAlt} title="Phone" />
                <Stack direction={{ base: "column", md: "row" }}>
                  {data?.phones?.map((phone, i) => (
                    <Link key={i} href={`tel:${phone}`}>
                      {phone}
                    </Link>
                  ))}
                </Stack>
              </HStack>
              <HStack>
                <Icon as={FaEnvelope} title="Email" />
                <Link href={`mailto:${data?.email}`}>{data?.email}</Link>
              </HStack>
            </VStack>

            <HStack justify="end">
              <Button as={Link} href={data?.directionsLink} target="_blank" w="fit-content" colorScheme="blue" rightIcon={<FaDirections />}>
                Directions
              </Button>
            </HStack>
          </>
        )}
      </Stack>
    </Box>
  );
}
