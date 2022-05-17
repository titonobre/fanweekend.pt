import { Box, Heading, Text, Stack, HStack, VStack, Icon, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaCubes } from "react-icons/fa";
import useSWR from "swr";

import { MOCData } from "../../lib/data/fetchMocs";
import useApi from "../../lib/hooks/useApi";

const fetcher = async (url: string) => {
  return fetch(url).then((res) => res.json());
};

export default function MyMocsCard() {
  const apiEndpoint = useApi("/my/mocs");

  const { data, isValidating } = useSWR<MOCData[]>(apiEndpoint, fetcher, {});

  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          My MOCs
        </Heading>
        <Text>Want to bring some of your creations? Fill the MOC Registration Form once for each MOC you wish to display.</Text>

        {data && data.length > 0 && (
          <>
            <Text>Previously registered MOCs:</Text>
            <VStack align="start">
              {data?.map((moc, i) => (
                <HStack key={i}>
                  <Icon as={FaCubes} title="MOC Title" />
                  <Text>{moc?.title}</Text>
                </HStack>
              ))}
            </VStack>
          </>
        )}
        {isValidating && <Text>Updating MOCs...</Text>}

        <HStack justify="end">
          <NextLink href="/form/register-moc" passHref>
            <Button as={Link} w="fit-content" colorScheme="green">
              Register MOC
            </Button>
          </NextLink>
        </HStack>
      </Stack>
    </Box>
  );
}
