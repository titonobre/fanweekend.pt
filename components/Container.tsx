import { Flex } from "@chakra-ui/react";

export type ContainerProps = {
  children: React.ReactNode;
};

export default function Container(props: ContainerProps) {
  return <Flex direction="column" minHeight="100vh" width="100vw" overflow="hidden" {...props} />;
}
