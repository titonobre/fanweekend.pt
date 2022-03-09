import React from "react";
import { Avatar, Box, HStack } from "@chakra-ui/react";
import { IconType } from "react-icons";

export type Props = {
  icon?: IconType;
  iconBg?: string;
  iconFg?: string;
  children: React.ReactNode;
};

export default function TimelineItem({ icon, iconBg, iconFg, children }: Props) {
  const iconElement = icon ? icon({ fontSize: "1.5em" }) : undefined;

  return (
    <HStack alignItems="start" spacing={{ base: 4 }}>
      <Avatar bg={iconBg} color={iconFg} icon={iconElement} marginTop={4} />
      <Box flex={1}>{children}</Box>
    </HStack>
  );
}
