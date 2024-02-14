import { format } from "date-fns";

import { env } from "@/env";

const formUrl = `https://docs.google.com/forms/d/e/${env.REGISTRATION_FORM_ID}/formResponse`;

const fields = {
  id: "entry.588056490",
  email: "entry.1579436961",
  name: "entry.1542522836",
  country: "entry.807451264",
  gender: "entry.355171594",
  lug: "entry.1875668234",
  notes: "entry.1443849039",
  dateOfBirth: "entry.953245350",
  shirtSize: "entry.300699649",
};

export type UserRegistrationData = {
  id: string;
  email: string;
  name: string;
  country: string;
  shirtSize: string;
  dateOfBirth: Date;
  gender: string;
  lug?: string | undefined;
  notes: string;
};

export async function submitUserRegistration(user: UserRegistrationData): Promise<void> {
  // prepare the form data
  const formData = new FormData();
  formData.append(fields.id, user.id);
  formData.append(fields.email, user.email);
  formData.append(fields.name, user.name);
  formData.append(fields.country, user.country);
  formData.append(fields.shirtSize, user.shirtSize);
  formData.append(fields.dateOfBirth, format(user.dateOfBirth, "yyyy-MM-dd"));
  formData.append(fields.gender, user.gender || "");
  formData.append(fields.lug, user.lug ?? "");
  formData.append(fields.notes, user.notes || "");

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(formUrl, requestOptions);

    const body = await response.text();

    if (!response.ok) {
      console.error(body);
      throw new Error("Form submission rejected!");
    }
  } catch (error) {
    throw new Error("Form submission rejected!", { cause: error });
  }
}
