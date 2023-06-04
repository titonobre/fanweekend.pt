import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  FormControl,
  FormErrorMessage,
  Text,
  FormLabel,
  Heading,
  Stack,
  VStack,
  Button,
  useBoolean,
  Flex,
  Link,
  Alert,
  AlertIcon,
  RadioGroup,
  Radio,
  Box,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import type { NextPage } from "next";
import NextLink from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFormState, Controller } from "react-hook-form";
import useSWR from "swr";

import Loading from "../../../components/Loading";
import Error from "../../../components/message/Error";
import GenericPage from "../../../components/page/GenericPage";
import { RegisterActivityFormData } from "../../../lib/form/register-activity-form-schema";
import useApi from "../../../lib/hooks/useApi";
import useTawkTo from "../../../lib/hooks/useTawkTo";
import useUserData from "../../../lib/hooks/useUserData";
import { AvailableActivity } from "../../api/available-activities";

const fetcher = async (url: string) => {
  return fetch(url).then((res) => res.json());
};

const eventTimeZone = "Europe/Lisbon";

function formatStartTime(activity: AvailableActivity) {
  return formatInTimeZone(parseISO(activity.startTime), eventTimeZone, "EEEE, MMMM d, HH:mm");
}

const RegisterPage: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [submitEnabled, setSubmitEnabled] = useBoolean(true);
  const [formSubmittedMessageVisible, setFormSubmittedMessageVisible] = useBoolean(false);

  const { user, isLoading } = useUserData();

  useTawkTo({ name: user?.name || "" });

  const availableActivitiesEndpoint = useApi("/available-activities");
  const registerActivityEndpoint = useApi("/form/register-activity");

  const {
    data: availableActivities,
    isValidating: isValidatingAvailableActivities,
    mutate: mutateAvailableActivities,
  } = useSWR<AvailableActivity[]>(availableActivitiesEndpoint, fetcher, {});

  const defaultValues: RegisterActivityFormData = {
    activity: undefined as unknown as string,
  };

  const { control, handleSubmit, reset } = useForm<RegisterActivityFormData>({
    resolver: zodResolver(RegisterActivityFormData),
    defaultValues,
  });

  const { errors, isDirty } = useFormState({ control });

  const submitButtonEnabled = submitEnabled && isDirty;

  const linkToMyAccount = (
    <Flex justifyContent="center">
      <NextLink href="/account" passHref>
        <Button as={Link} w="fit-content" colorScheme="green">
          My Account
        </Button>
      </NextLink>
    </Flex>
  );

  if (isLoading || isValidatingAvailableActivities) {
    return (
      <GenericPage>
        <Loading />
      </GenericPage>
    );
  }

  if (!user || !user.id) {
    return (
      <GenericPage>
        <Error title="Invalid Account" message="User information not found!" />
        {linkToMyAccount}
      </GenericPage>
    );
  }

  const onSubmit: SubmitHandler<RegisterActivityFormData> = async (data) => {
    setSubmitEnabled.off();

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(registerActivityEndpoint, requestOptions);

      if (response.status === 200) {
        setFormSubmittedMessageVisible.on();
        reset(defaultValues);
        mutateAvailableActivities();
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setSubmitEnabled.on();
    }
  };

  return (
    <GenericPage>
      <Stack spacing={4} pb={8} textAlign="center" align="center">
        <Heading fontSize="3xl">Register for Activity</Heading>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8}>
          <FormControl isRequired isInvalid={!!errors.activity}>
            <FormLabel htmlFor="activity">Activity</FormLabel>
            <Controller
              name="activity"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction={["column"]} spacing={[1, 4]}>
                    {availableActivities?.map((activity) => {
                      return (
                        <Box key={activity.id}>
                          <Radio isDisabled={!activity.available} value={activity.id}>
                            <HStack>
                              <Text fontWeight="bold">{activity.title}</Text>
                              {activity.available ? (
                                <Badge colorScheme="green">available</Badge>
                              ) : (
                                <Badge colorScheme="gray">unavailable</Badge>
                              )}
                              {activity.available && activity.limited && <Badge colorScheme="yellow">limited</Badge>}
                              {activity.registered && <Badge colorScheme="blue">registered</Badge>}
                            </HStack>
                          </Radio>
                          {activity.available && (
                            <Stack pl={6} key={activity.id + "x"}>
                              <Box>{formatStartTime(activity)}</Box>
                              <Box>{activity.description}</Box>
                              <Box>{activity.registrationNotes}</Box>
                            </Stack>
                          )}
                        </Box>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              )}
              rules={{
                required: { value: true, message: "This is required." },
              }}
            />
            <FormErrorMessage>{errors?.activity?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" w="fit-content" colorScheme="green" disabled={!submitButtonEnabled}>
            Register
          </Button>

          {formSubmittedMessageVisible && !isDirty && (
            <Alert status="success" borderRadius={6}>
              <AlertIcon />
              Registration submitted. Thank you!
            </Alert>
          )}

          {errorMessage && !formSubmittedMessageVisible && (
            <Alert status="error" borderRadius={6}>
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}

          <NextLink href="/account" passHref>
            <Button as={Link} w="fit-content" colorScheme="blue">
              Back to My Account
            </Button>
          </NextLink>
        </VStack>
      </form>
    </GenericPage>
  );
};

export default withPageAuthRequired(RegisterPage);
