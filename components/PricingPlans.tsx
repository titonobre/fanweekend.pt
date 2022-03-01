import { ReactNode } from "react";
import { Box, Stack, HStack, Text, VStack, useColorModeValue, List, ListItem, ListIcon, Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box mb={4} shadow="2xl" rounded="md">
      {children}
    </Box>
  );
}

export default function PricingPlans() {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      textAlign="center"
      justify="center"
      alignItems={{ base: "center", md: "flex-start" }}
      spacing={{ base: 4, lg: 10 }}
      marginY={10}
    >
      <PriceWrapper>
        <Box position="relative">
          <Box position="absolute" top="-16px" left="50%" style={{ transform: "translate(-50%)" }}>
            <Text
              textTransform="uppercase"
              bg={useColorModeValue("green.300", "green.700")}
              px={3}
              py={1}
              color={useColorModeValue("gray.900", "gray.300")}
              fontSize="sm"
              fontWeight="600"
              rounded="xl"
            >
              Most Popular
            </Text>
          </Box>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Full Experience
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                €
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                125
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /person
              </Text>
            </HStack>
          </Box>
          <VStack bg={useColorModeValue("gray.50", "gray.700")} py={4} roundedBottom="md">
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Accommodation
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Meals
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Activities
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Swag
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                AFOLs dinner on Saturday
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="green" disabled>
                Register
              </Button>
            </Box>
          </VStack>
        </Box>
      </PriceWrapper>
      <PriceWrapper>
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            Basic
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              €
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              100
            </Text>
            <Text fontSize="3xl" color="gray.500">
              /person
            </Text>
          </HStack>
        </Box>
        <VStack bg={useColorModeValue("gray.50", "gray.700")} py={4} roundedBottom="md">
          <List spacing={3} textAlign="start" px={12} alignSelf="flex-start">
            <ListItem>
              <ListIcon as={CheckIcon} color="green.500" />
              Accommodation
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.500" />
              Meals
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.500" />
              Activities
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.500" />
              Swag
            </ListItem>
          </List>
          <Box w="80%" pt={7}>
            <Button w="full" colorScheme="green" variant="outline" disabled>
              Register
            </Button>
          </Box>
        </VStack>
      </PriceWrapper>
    </Stack>
  );
}
