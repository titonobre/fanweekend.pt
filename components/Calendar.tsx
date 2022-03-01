import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";

const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar() {
  const emptyDays = Array.from({ length: 2 }, () => 0);
  const monthDays = Array.from({ length: 30 }, (v, k) => k + 1);

  const calendarDays = [...emptyDays, ...monthDays];

  const activeDays = [10, 11, 12];

  const days = calendarDays.map((date) => ({
    label: date || "",
    isActive: activeDays.includes(date),
  }));

  return (
    <SimpleGrid textAlign="center" lineHeight="2.5rem" templateColumns="repeat(7, 2.5rem);">
      <GridItem colSpan={7} backgroundColor="gray.500" color="white" borderTopRadius="6px">
        June 2022
      </GridItem>
      {daysOfTheWeek.map((day) => (
        <Box key={day} backgroundColor="gray.200">
          {day}
        </Box>
      ))}
      {days.map((day, index) => (
        <Box key={index} {...(day.isActive && { backgroundColor: "green.500", color: "white" })}>
          {day.label}
        </Box>
      ))}
    </SimpleGrid>
  );
}
