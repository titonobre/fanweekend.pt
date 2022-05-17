import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { NextPage } from "next";
import NextLink from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFormState, Controller, useWatch } from "react-hook-form";

import CalendarNights from "../../components/CalendarNights";
import Loading from "../../components/Loading";
import Error from "../../components/message/Error";
import GenericPage from "../../components/page/GenericPage";
import schema, { FormValues } from "../../lib/form/extra-night-schema";
import useApi from "../../lib/hooks/useApi";
import useTawkTo from "../../lib/hooks/useTawkTo";
import useUserData from "../../lib/hooks/useUserData";

const RegisterPage: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [submitEnabled, setSubmitEnabled] = useBoolean(true);
  const [formSubmittedMessageVisible, setFormSubmittedMessageVisible] = useBoolean(false);

  const { user, isLoading } = useUserData();

  useTawkTo({ name: user?.name || "" });

  const apiEndpoint = useApi("/form/extra-night");

  const defaultValues: FormValues = {
    date: undefined as unknown as string,
  };

  const { control, register, handleSubmit, reset, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { errors, isDirty } = useFormState({ control });

  const selectedDate = useWatch({
    control,
    name: "date",
  });

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

  if (isLoading) {
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

  // check if user already submitted extra night form
  if (user.extraNightSelected) {
    return (
      <GenericPage>
        <Error title="Already Selected" message="You already submitted the extra night form once! " />
        {linkToMyAccount}
      </GenericPage>
    );
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmitEnabled.off();

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(apiEndpoint, requestOptions);

      if (response.status === 200) {
        setFormSubmittedMessageVisible.on();
        reset(data);
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
        <Heading fontSize="3xl">Select Extra Night</Heading>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8}>
          <CalendarNights selected={selectedDate} onClick={(day) => setValue("date", day)} />

          <FormControl isRequired isInvalid={!!errors.date}>
            <FormLabel htmlFor="date">Extra Night (included in the registration fee)</FormLabel>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction={["column", "row"]} spacing={[1, 8]}>
                    <Radio value="9">Thursday, June 9</Radio>
                    <Radio value="12">Sunday, June 12</Radio>
                    <Radio value="none">No Extra Night</Radio>
                  </Stack>
                </RadioGroup>
              )}
              rules={{
                required: { value: true, message: "This is required." },
              }}
            />
            <FormHelperText>There is no refund if you choose &quot;No Extra Night&quot;</FormHelperText>
            <FormErrorMessage>{errors?.date?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.notes}>
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <Textarea {...register("notes")} />
            <FormHelperText>Is there something important you&apos;d like us to know about the accommodation? </FormHelperText>
            <FormErrorMessage>{errors?.notes?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" w="fit-content" colorScheme="green" disabled={!submitButtonEnabled}>
            Save
          </Button>

          {formSubmittedMessageVisible && !isDirty && (
            <Alert status="success" borderRadius={6}>
              <AlertIcon />
              Your preference was registered. Thank you!
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
