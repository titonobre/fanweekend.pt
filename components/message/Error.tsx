import { Box, Flex } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Message, { Props } from "./Message";

export default function Error({ icon, ...props }: Props) {
  const crossIcon = (
    <Box display="inline-block">
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="red.500"
        rounded="50px"
        w="55px"
        h="55px"
        textAlign="center"
      >
        <CloseIcon boxSize="20px" color="white" />
      </Flex>
    </Box>
  );

  return <Message icon={icon || crossIcon} {...props} />;
}
