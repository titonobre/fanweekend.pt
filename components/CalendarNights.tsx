import { Box, GridItem, SimpleGrid, useToken } from "@chakra-ui/react";

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarProps = {
  selected: string;
  onClick: (day: string) => void;
};

export default function Calendar(props?: CalendarProps) {
  const [blue200, blue500] = useToken("colors", ["blue.200", "blue.500", "blue.700"]);

  const selected = props?.selected || "";
  const onClick = props?.onClick ?? (() => undefined);

  const showExtras = true;

  const emptyDays = Array.from({ length: 4 }, () => 0);
  const monthDays = Array.from({ length: 30 }, (v, k) => k + 1);

  const calendarDays = [...emptyDays, ...monthDays];

  const activeDays = [9, 10, 11];
  const extraDays = showExtras ? [8, 11] : [];

  const days = calendarDays.map((date) => ({
    label: date > 0 ? `${date}` : "",
    isActive: activeDays.includes(date),
    isExtra: extraDays.includes(date),
    isAfterExtra: extraDays.includes(date - 1),
    isSelected: selected === `${date}`,
  }));

  return (
    <SimpleGrid textAlign="center" lineHeight="2.5rem" templateColumns="repeat(7, 2.5rem);" shadow="2xl">
      <GridItem colSpan={7} backgroundColor="gray.500" color="white" borderTopRadius="6px">
        June 2023
      </GridItem>
      {daysOfTheWeek.map((day) => (
        <Box key={day} backgroundColor="gray.200">
          {day}
        </Box>
      ))}
      {days.map((day, index) => (
        <Box
          key={index}
          {...((day.isExtra || day.isAfterExtra) && { backgroundColor: "yellow.200" })}
          {...(day.isActive && { backgroundColor: "green.500", color: "white" })}
          position="relative"
        >
          {day.label}
          {day.isExtra && (
            <Box
              onClick={() => onClick(day.label)}
              style={{
                position: "absolute",
                zIndex: 1,
                background: day.isSelected ? blue500 : blue200,
                top: 0,
                paddingTop: "50%",
                left: "80%",
                display: "block",
                width: "40%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          )}
        </Box>
      ))}
    </SimpleGrid>
  );
}
