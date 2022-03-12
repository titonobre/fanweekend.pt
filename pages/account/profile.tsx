import React, { useMemo, useState } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { useForm, SubmitHandler, useFormState } from "react-hook-form";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
  Button,
  useBoolean,
  Flex,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import useApi from "../../lib/hooks/useApi";

import { FormValues, schema } from "../../lib/profile-schema";

import Error from "../../components/message/Error";
import Loading from "../../components/Loading";
import GenericPage from "../../components/page/GenericPage";

const RegisterPage: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [submitEnabled, setSubmitEnabled] = useBoolean(true);
  const [profileUpdatedMessageVisible, setProfileUpdatedMessageVisible] = useBoolean(false);

  const { user, isLoading, checkSession } = useUser();

  const updateProfileApiEndpoint = useApi("/update-profile");

  const defaultValues: FormValues = {
    name: user?.name || "",
  };

  const { control, register, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useMemo(() => {
    reset({
      name: user?.name || "",
    });
  }, [reset, user]);

  const { errors, isDirty } = useFormState({ control });

  const submitButtonEnabled = submitEnabled && isDirty;

  if (isLoading) {
    return (
      <GenericPage>
        <Loading />
      </GenericPage>
    );
  }

  if (!user || !user.sub || !user.email) {
    return (
      <GenericPage>
        <Error title="Invalid Account" message="User information not found!" />
        <Flex justifyContent="center">
          <NextLink href="/account" passHref>
            <Button as={Link} w="fit-content" colorScheme="green">
              My Account
            </Button>
          </NextLink>
        </Flex>
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

      const response = await fetch(updateProfileApiEndpoint, requestOptions);

      if (response.status === 200) {
        setProfileUpdatedMessageVisible.on();
        reset(data);
        checkSession();
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
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="3xl">Profile</Heading>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8}>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input autoComplete="name" {...register("name")} />
            <FormHelperText>Works best if you use your real name.</FormHelperText>
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" w="fit-content" colorScheme="green" disabled={!submitButtonEnabled}>
            Save
          </Button>

          {profileUpdatedMessageVisible && !isDirty && (
            <Alert status="success" borderRadius={6}>
              <AlertIcon />
              Profile Updated.
            </Alert>
          )}

          {errorMessage && !profileUpdatedMessageVisible && (
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
