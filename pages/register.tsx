import React, { useState } from "react";
import type { NextPage } from "next";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
  Text,
  VStack,
  Box,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

import useApi from "../lib/hooks/useApi";

import { FormValues, schema, shirtSizes, countries, lugs, ShirtSize, genders } from "../lib/registration-schema";

import termsAndConditions from "../data/terms-and-conditions.md?raw";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import CookieBanner from "../components/CookieBanner";
import Container from "../components/Container";
import Error from "../components/Error";

const RegisterPage: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [submitEnabled, setSubmitEnabled] = useBoolean(true);

  const { isOpen: isConfirmationModalOpen, onOpen: onOpenConfirmationModal } = useDisclosure();
  const { isOpen: isErrorModalOpen, onOpen: onOpenErrorModal, onClose: onCloseErrorModal } = useDisclosure();

  const { user } = useUser();

  const registerApiEndpoint = useApi("/register");

  const router = useRouter();
  const { plan } = router.query;

  const sanitizedPlan = typeof plan === "string" ? plan : "";

  const defaultValues: FormValues = {
    plan: sanitizedPlan,
    id: user?.sub || "",
    name: "",
    email: user?.email || "",
    dateOfBirth: "",
    acceptTerms: false,
    shirtSize: "" as ShirtSize,
    country: "",
    lug: "",
  };

  const { control, register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { errors } = formState;

  if (!user || !user.sub || !user.email) {
    return <Error title="Invalid Account" message="User information not found!" />;
  }

  // check if user email is already verified
  if (!user.email_verified) {
    // add link to resend email verification
    return (
      <Error
        title="Email Not Verified"
        message="Please verify your email inbox and follow the instructions to verify your email address."
      />
    );
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmitEnabled.off();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(registerApiEndpoint, requestOptions);
    const result = await response.json();

    if (result.success) {
      onOpenConfirmationModal();
    } else {
      setErrorMessage(result.error);
      onOpenErrorModal();
    }
  };

  const closeConfirmationModal = () => {
    router.push("/profile");
  };

  const closeErrorModal = () => {
    // router.push("/profile");
    setSubmitEnabled.on();
    onCloseErrorModal();
  };

  return (
    <>
      <Navbar />

      <Container>
        <Content>
          <Stack spacing={4} textAlign="center">
            <Heading fontSize="3xl">Register</Heading>
            <Text color="gray.600" fontSize="xl">
              This is the first step for a great Fan Weekend. Please take a moment to read the following terms and conditions carefully.
            </Text>
          </Stack>

          <Box marginY={10}>
            <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
              {termsAndConditions}
            </ReactMarkdown>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={8}>
              <FormControl isRequired isInvalid={!!errors.acceptTerms}>
                <FormLabel htmlFor="acceptTerms">Terms &amp; Conditions</FormLabel>
                <Checkbox isRequired {...register("acceptTerms")}>
                  I hereby accept the above and would love to sign up!
                </Checkbox>
                <FormErrorMessage>{errors?.acceptTerms?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.plan}>
                <FormLabel htmlFor="plan">Plan</FormLabel>
                <Controller
                  name="plan"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Stack direction={["column", "row"]} spacing={[1, 8]}>
                        <Radio value="basic">Basic (€120)</Radio>
                        <Radio value="full">Full (€150)</Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                  rules={{
                    required: { value: true, message: "This is required." },
                  }}
                />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>{errors?.plan?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input autoComplete="name" {...register("name")} />
                <FormHelperText>We need your real name! Not that catchy nickname you&apos;ve been using on online forums.</FormHelperText>
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.country}>
                <FormLabel htmlFor="country">Country</FormLabel>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select autoComplete="country-name" {...field}>
                      <option value="" key=""></option>
                      {countries.map((country) => (
                        <option value={country} key={country}>
                          {country}
                        </option>
                      ))}
                    </Select>
                  )}
                  rules={{
                    required: { value: true, message: "This is required." },
                  }}
                />
                <FormHelperText>Where are you from?</FormHelperText>
                <FormErrorMessage>{errors?.country?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.dateOfBirth}>
                <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                <Input type="date" autoComplete="bday" {...register("dateOfBirth")} />
                <FormHelperText>When you were born!</FormHelperText>
                <FormErrorMessage>{errors?.dateOfBirth?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.shirtSize}>
                <FormLabel htmlFor="shirtSize">T-Shirt size</FormLabel>
                <Controller
                  name="shirtSize"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Stack direction={["column", "row"]} spacing={[1, 8]}>
                        {shirtSizes.map((size) => (
                          <Radio value={size} key={size}>
                            {size}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  )}
                  rules={{
                    required: { value: true, message: "This is required." },
                  }}
                />
                <FormHelperText>
                  Your t-shirt size! We may use it to choose something to put in your goodie bag, or to choose the size of bed...
                </FormHelperText>
                <FormErrorMessage>{errors?.shirtSize?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.gender}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Stack direction={["column", "row"]} spacing={[1, 8]}>
                        {genders.map(([id, label]) => (
                          <Radio value={id} key={id}>
                            {label}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  )}
                  rules={{
                    required: { value: true, message: "This is required." },
                  }}
                />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>{errors?.gender?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lug}>
                <FormLabel htmlFor="lug">RLUG</FormLabel>
                <Controller
                  name="lug"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="" key=""></option>
                      {lugs.map((lug) => (
                        <option value={lug} key={lug}>
                          {lug}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>Only if they tricked you into joining them.</FormHelperText>
                <FormErrorMessage>{errors?.lug?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.notes}>
                <FormLabel htmlFor="notes">Notes</FormLabel>
                <Textarea maxLength={240} {...register("notes")} placeholder="" />
                <FormHelperText>
                  Is there something important you&apos;d like us to know? Like food allergies or your pet&apos;s name...
                </FormHelperText>
                <FormErrorMessage>{errors?.notes?.message}</FormErrorMessage>
              </FormControl>

              <Input type="submit" disabled={!submitEnabled} />
            </VStack>
          </form>

          <Modal isOpen={isConfirmationModalOpen} closeOnOverlayClick={false} closeOnEsc={false} onClose={closeConfirmationModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Registration Submitted</ModalHeader>

              <ModalBody>Thank you for your registration! We will reach you for the next steps.</ModalBody>

              <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={closeConfirmationModal}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal isOpen={isErrorModalOpen} closeOnOverlayClick={true} closeOnEsc={true} onClose={closeErrorModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Something Went Wrong</ModalHeader>

              <ModalBody>{errorMessage}</ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={closeErrorModal}>
                  Back
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Content>

        <Footer />
      </Container>

      <CookieBanner />
    </>
  );
};

export default withPageAuthRequired(RegisterPage);
