import { Box, Flex, Heading, HStack, Icon, IconButton, Link, Stack, Text, VStack } from "@chakra-ui/react";
import { addMinutes, formatDuration, intervalToDuration, isSameDay, parseISO } from "date-fns";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import type { NextPage } from "next";
import { FaClock, FaDirections, FaMapMarkerAlt, FaUser, FaUsers } from "react-icons/fa";
import useSWR from "swr";

import GenericPage from "../components/page/GenericPage";
import { getEventProgram } from "../lib/data/dataStore";
import { Activity } from "../lib/data/fetchEventProgram";
import { REDIS_URL } from "../lib/env";
import useApi from "../lib/hooks/useApi";

type EventProgram = Activity[];

type Props = {
  fallbackData: EventProgram;
};

const fetcher = async (url: string) => {
  return fetch(url).then((res) => res.json());
};

const eventTimeZone = "Europe/Lisbon";

type ActivityExtended = Activity & {
  startTimeFormatted: string;
  durationFormatted?: string;
};

function getActivitiesByDay(activities: Activity[]) {
  return activities
    .map<ActivityExtended>((activity: Activity) => {
      const parsedStartTime = parseISO(activity.startTime);

      const startTimeFormatted = formatInTimeZone(parsedStartTime, eventTimeZone, "HH:mm");

      const durationFormatted =
        (activity.duration &&
          formatDuration(intervalToDuration({ start: parsedStartTime, end: addMinutes(parsedStartTime, activity.duration) }))) ||
        undefined;

      const activityExtended: ActivityExtended = {
        ...activity,
        startTimeFormatted,
        durationFormatted,
      };

      return activityExtended;
    })
    .reduce((acc, activity) => {
      const lastGroup = acc.slice(-1)?.[0];

      if (!lastGroup) {
        return [[activity]];
      }

      const firstGroups = acc.slice(0, -1);

      const lastActivity = lastGroup.slice(-1)?.[0];

      const tzLastStartTime = utcToZonedTime(parseISO(lastActivity.startTime), eventTimeZone);

      const tzCurrStartTime = utcToZonedTime(parseISO(activity.startTime), eventTimeZone);

      if (isSameDay(tzLastStartTime, tzCurrStartTime)) {
        return [...firstGroups, [...lastGroup, activity]];
      }

      return [...firstGroups, lastGroup, [activity]];
    }, [] as ActivityExtended[][])
    .map((activitiesByDay) => {
      const dateLabel = formatInTimeZone(parseISO(activitiesByDay[0].startTime), eventTimeZone, "EEEE, MMMM d");

      return {
        dateLabel,
        activities: activitiesByDay,
      };
    });
}

const Index: NextPage<Props> = ({ fallbackData = [] }) => {
  const eventProgramApiEndpoint = useApi("/event-program");

  const { data } = useSWR<EventProgram>(eventProgramApiEndpoint, fetcher, { fallbackData });

  const activities = getActivitiesByDay(data || fallbackData);

  return (
    <GenericPage>
      <Stack spacing={4} textAlign="center" mb={8}>
        <Heading fontSize="3xl">Event Program</Heading>
        <Text color="gray.600" fontSize="xl">
          These are the activities that will be held during the event.
        </Text>
      </Stack>

      <VStack spacing={8} align="start">
        {activities?.map((item, index) => (
          <VStack key={index} spacing={8} align="stretch" width="full">
            <Flex justifyContent="flex-start">
              <Text fontSize="xl">{item.dateLabel}</Text>
            </Flex>
            {item.activities.map((activity) => (
              <HStack key={activity.id} spacing={4} align="start" width="full">
                <VStack spacing={0} width={14}>
                  <Text fontSize="md" lineHeight={9}>
                    {activity.startTimeFormatted}
                  </Text>
                </VStack>
                <Box flex={1} justifyContent="flex-start" borderLeft="4px" borderLeftColor="gray.300" paddingLeft={4} paddingY={0}>
                  <Text fontSize="2xl">{activity.title}</Text>
                  <Text fontSize="md">{activity.description}</Text>
                  <Stack spacing={[0, 4]} direction={["column", "row"]}>
                    {activity.durationFormatted && (
                      <HStack>
                        <Icon as={FaClock} height={3} />
                        <Text fontSize="xs">{activity.durationFormatted}</Text>
                      </HStack>
                    )}
                    {activity.location && (
                      <HStack>
                        <Icon as={FaMapMarkerAlt} height={3} />
                        <Text fontSize="xs">{activity.location}</Text>
                      </HStack>
                    )}
                    {activity.keyPeople?.length && (
                      <HStack>
                        <Icon as={activity.keyPeople.length === 1 ? FaUser : FaUsers} height={3} />
                        <Text fontSize="xs">{activity.keyPeople.join(", ")}</Text>
                      </HStack>
                    )}
                  </Stack>
                </Box>
                {activity.directions && (
                  <IconButton
                    as={Link}
                    variant="ghost"
                    icon={<FaDirections />}
                    colorScheme="blue"
                    href={activity.directions}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={"Directions to " + activity.location}
                  />
                )}
              </HStack>
            ))}
          </VStack>
        ))}
      </VStack>
    </GenericPage>
  );
};

export default Index;

export async function getStaticProps() {
  if (!REDIS_URL) {
    return {
      props: {
        fallbackData: [],
      },
    };
  }

  const eventProgram = (await getEventProgram()).map((entry) => {
    return Object.fromEntries(Object.entries(entry).filter(([, value]) => value !== undefined));
  });

  return {
    props: {
      fallbackData: eventProgram,
    },
  };
}
