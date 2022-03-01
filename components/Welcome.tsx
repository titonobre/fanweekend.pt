import { Heading, Text, Stack } from "@chakra-ui/react";

export default function Welcome() {
  return (
    <Stack spacing={4} textAlign="center" mb={10}>
      <Heading fontSize="3xl">Hi!</Heading>
      <Text color="gray.600" fontSize="xl">
        The Paredes de Coura Fan Weekend is back!
      </Text>
      <Text color="gray.600" fontSize="xl">
        We will once again turn the cosy little village of Paredes de Coura into the centre stage of the AFOL community. Hosted by the
        Comunidade 0937 we hope to gather LEGO® fans from all around the world and make this an unforgettable experience with passionate
        AFOLs, fantastic models and creations and insightful workshops!
      </Text>
    </Stack>
  );
}
