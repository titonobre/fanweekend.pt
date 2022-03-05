import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export type Props = {
  icon?: React.ReactNode;
  title: string;
  message: string;
};

export default function Message({ icon, title, message }: Props) {
  return (
    <Box textAlign="center" py={10} px={6}>
      {icon}
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {title}
      </Heading>
      <Text color="gray.500">{message}</Text>
    </Box>
  );
}
