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
  Textarea,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Box,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import type { NextPage } from "next";
import NextLink from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFormState, Controller } from "react-hook-form";
import ReactMarkdown from "react-markdown";

import Loading from "../../../components/Loading";
import Error from "../../../components/message/Error";
import GenericPage from "../../../components/page/GenericPage";
import termsAndConditions from "../../../data/terms-and-conditions-mocs.md?raw";
import schema, { FormValues } from "../../../lib/form/register-moc-form-schema";
import useApi from "../../../lib/hooks/useApi";
import useTawkTo from "../../../lib/hooks/useTawkTo";
import useUserData from "../../../lib/hooks/useUserData";

const RegisterPage: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [submitEnabled, setSubmitEnabled] = useBoolean(true);
  const [formSubmittedMessageVisible, setFormSubmittedMessageVisible] = useBoolean(false);

  const { user, isLoading } = useUserData();

  useTawkTo({ name: user?.name || "" });

  const apiEndpoint = useApi("/form/register-moc");

  const defaultValues: FormValues = {
    title: undefined as unknown as string,
    width: undefined as unknown as number,
    depth: undefined as unknown as number,
  };

  const { control, register, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
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
        <Heading fontSize="3xl">Register Your MOC</Heading>
      </Stack>

      <Box marginY={10}>
        <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
          {termsAndConditions}
        </ReactMarkdown>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8}>
          <FormControl isInvalid={!!errors.title} isRequired>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input {...register("title")} />
            <FormHelperText>The name of your creation</FormHelperText>
            <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
          </FormControl>

          <Stack spacing={8} direction={{ base: "column", sm: "row" }} width="full">
            <FormControl isInvalid={!!errors.width} isRequired>
              <FormLabel htmlFor="width">Width</FormLabel>
              <Controller
                name="width"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Width is required",
                  },
                }}
                render={({ field: { ref, ...restField } }) => (
                  <NumberInput {...restField} min={16} max={1000} step={16}>
                    <NumberInputField ref={ref} name={restField.name} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              <FormHelperText>In studs.</FormHelperText>
              <FormErrorMessage>{errors?.width?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.depth} isRequired>
              <FormLabel htmlFor="depth">Depth</FormLabel>
              <Controller
                name="depth"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Depth is required",
                  },
                }}
                render={({ field: { ref, ...restField } }) => (
                  <NumberInput {...restField} min={16} max={1000} step={16}>
                    <NumberInputField ref={ref} name={restField.name} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              <FormHelperText>In studs.</FormHelperText>
              <FormErrorMessage>{errors?.depth?.message}</FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl isInvalid={!!errors.description}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea {...register("description")} />
            <FormHelperText></FormHelperText>
            <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.photo}>
            <FormLabel htmlFor="photo">Photo</FormLabel>
            <Input type="url" {...register("photo")} />
            <FormHelperText>The URL for a publicly available photo of your creation.</FormHelperText>
            <FormErrorMessage>{errors?.photo?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.elements}>
            <FormLabel htmlFor="elements">Estimated Number of Parts</FormLabel>
            <Input type="number" {...register("elements")} />
            <FormHelperText>A rough estimation is enough.</FormHelperText>
            <FormErrorMessage>{errors?.elements?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.buildTime}>
            <FormLabel htmlFor="buildTime">Estimated Build Time</FormLabel>
            <Input {...register("buildTime")} />
            <FormHelperText>Hours? Days? Months? How much time it took you to build it.</FormHelperText>
            <FormErrorMessage>{errors?.buildTime?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.notes}>
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <Textarea {...register("notes")} />
            <FormHelperText>
              Does it require a power outlet nearby? Should it be displayed on the floor? Is there something important you&apos;d like us to
              know about the MOC?
            </FormHelperText>
            <FormErrorMessage>{errors?.notes?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" w="fit-content" colorScheme="green" disabled={!submitButtonEnabled}>
            Submit
          </Button>

          {formSubmittedMessageVisible && !isDirty && (
            <Alert status="success" borderRadius={6}>
              <AlertIcon />
              Your MOC was registered. Thank you!
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
