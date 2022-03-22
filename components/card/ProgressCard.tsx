import { Box, Text, Stack, Avatar, useToken, useBreakpointValue, VStack } from "@chakra-ui/react";
import { FaAngleDown, FaAngleRight, FaCheck, FaFileInvoice, FaMoneyBillAlt, FaWpforms } from "react-icons/fa";

type RegisterCardProps = {
  progress: {
    paymentEnabled: boolean;
    paymentReceived: boolean;
  };
};

export default function ProgressCard({ progress: { paymentEnabled, paymentReceived } }: RegisterCardProps) {
  const breakPoint = "sm";

  const [colorGray500] = useToken("colors", ["gray.400"]);
  const dividerIcon = useBreakpointValue({
    base: <FaAngleDown color={colorGray500} />,
    [breakPoint]: <FaAngleRight color={colorGray500} />,
  });

  const divider = (
    <Box border="none">
      <Box marginLeft={{ base: 4, [breakPoint]: 0 }} marginTop={{ base: 0, [breakPoint]: 4 }}>
        {dividerIcon}
      </Box>
    </Box>
  );

  const steps = [
    {
      icon: <FaWpforms color="white" />,
      color: "green.500",
      text: "Registration Form Submitted",
    },
    paymentEnabled
      ? {
          icon: <FaFileInvoice color="white" />,
          color: "green.500",
          text: "Payment Details Available",
        }
      : {
          icon: <FaFileInvoice color="white" />,
          color: "gray.500",
          text: "Processing Registration",
        },
    paymentReceived
      ? {
          icon: <FaCheck color="white" />,
          color: "green.500",
          text: "Paid and Confirmed",
        }
      : paymentEnabled
      ? {
          icon: <FaMoneyBillAlt color="white" />,
          color: "gray.500",
          text: "Payment Pending",
        }
      : {
          icon: <FaMoneyBillAlt color="white" />,
          color: "gray.500",
          text: "Payment",
        },
  ];

  return (
    <VStack
      w="full"
      bg="white"
      boxShadow="2xl"
      rounded="md"
      spacing={8}
      p={4}
      overflow="hidden"
      alignItems={{ base: "start", [breakPoint]: "center" }}
    >
      <Stack
        direction={{ base: "column", [breakPoint]: "row" }}
        justify="stretch"
        align={{ base: "start", [breakPoint]: "start" }}
        divider={divider}
      >
        {steps.map((step, index) => (
          <Stack direction={{ base: "row", [breakPoint]: "column" }} align="center" justify="center" key={index} flex={1}>
            <Avatar icon={step.icon} backgroundColor={step.color} />
            <Text textAlign={{ base: "start", [breakPoint]: "center" }}>{step.text}</Text>
          </Stack>
        ))}
      </Stack>
      {paymentReceived && <Text color="gray.500">All done! Ready to have fun?</Text>}
    </VStack>
  );
}
