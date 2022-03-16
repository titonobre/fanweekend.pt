import type { NextApiRequest, NextApiResponse } from "next";

import fetch from "node-fetch";
import { FormData } from "formdata-polyfill/esm.min.js";

import { format } from "date-fns";

import { REGISTRATION_FORM_ID } from "../../lib/env";
import validate from "../../lib/middleware/validate";
import schema, { FormValues } from "../../lib/registration-schema";
import auth0 from "../../lib/auth/initAuth0";

const formUrl = `https://docs.google.com/forms/d/e/${REGISTRATION_FORM_ID}/formResponse`;

const fields = {
  id: "entry.588056490",
  email: "entry.1579436961",
  name: "entry.1542522836",
  country: "entry.807451264",
  gender: "entry.355171594",
  lug: "entry.1875668234",
  notes: "entry.1443849039",
  dateOfBirth: "entry.953245350",
  plan: "entry.429177418",
  shirtSize: "entry.300699649",
};

async function register(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = auth0.getSession(req, res);

  const body = req.body as FormValues;

  // double check that the form is valid

  if (body.id != session?.user?.sub) {
    return res.status(400).json({ error: "User ID mismatch." });
  }

  if (body.email != session?.user?.email) {
    return res.status(400).json({ error: "Email address mismatch." });
  }

  if (!session.user.email_verified) {
    return res.status(400).json({ error: "Email address not verified." });
  }

  // prepare the form data
  const formData = new FormData();
  formData.append(fields.id, body.id);
  formData.append(fields.plan, body.plan);
  formData.append(fields.email, body.email);
  formData.append(fields.name, body.name);
  formData.append(fields.country, body.country);
  formData.append(fields.shirtSize, body.shirtSize);
  formData.append(fields.dateOfBirth, format(body.dateOfBirth, "yyyy-MM-dd"));
  formData.append(fields.gender, body.gender || "");
  formData.append(fields.lug, body.lug || "");
  formData.append(fields.notes, body.notes || "");

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {

    const response = await fetch(formUrl, requestOptions);

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const body = await response.text();
      console.error(body);
      throw response;
    }
  }
  catch (error) {
    console.error("Error Submitting Form", error)
    return res.status(500).json({ error: "Form submission rejected." });
  }

}

export default auth0.withApiAuthRequired(validate(schema, register));
