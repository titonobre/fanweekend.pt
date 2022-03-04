import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import fetch from "node-fetch";
import { FormData } from "formdata-polyfill/esm.min.js";

import { REGISTRATION_FORM_ID } from "../../lib/env";
import validate from "../../lib/middleware/validate";
import schema, { FormValues } from "../../lib/registration-schema";

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

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = getSession(req, res);

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
  formData.append(fields.dateOfBirth, body.dateOfBirth);
  formData.append(fields.gender, body.gender || "");
  formData.append(fields.lug, body.lug || "");
  formData.append(fields.notes, body.notes || "");

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  await fetch(formUrl, requestOptions).catch((error) => {
    console.error("error", error);
    return res.status(500).json({ error: "Form submission rejected." });
  });

  return res.status(200).json({ success: true });
}

export default withApiAuthRequired(validate(schema, handler));