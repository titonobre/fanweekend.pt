import { Container as CContainer } from "@chakra-ui/react";

export type ContentProps = {
  children: React.ReactNode;
};

export default function Content(props: ContentProps) {
  return <CContainer flex={1} marginY={8} {...props} />;
}
