import { FormData } from "formdata-polyfill/esm.min.js";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

import auth0 from "../../../lib/auth/initAuth0";
import { EXTRA_NIGHT_FORM_ID } from "../../../lib/env";
import schema, { FormValues } from "../../../lib/form/extra-night-schema";
import validate from "../../../lib/middleware/validate";

const formUrl = `https://docs.google.com/forms/d/e/${EXTRA_NIGHT_FORM_ID}/formResponse`;

const fields = {
  id: "entry.621062025",
  date: "entry.235736086",
  notes: "entry.908548082",
};

async function register(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = auth0.getSession(req, res);

  if (!session) {
    // HTTP 401 Unauthorized
    res.status(401).end();
    return;
  }

  const body = req.body as FormValues;

  // prepare the form data
  const formData = new FormData();
  formData.append(fields.id, session?.user?.sub);
  formData.append(fields.date, body.date);
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
  } catch (error) {
    console.error("Error Submitting Form", error);
    return res.status(500).json({ error: "Form submission rejected." });
  }
}

export default auth0.withApiAuthRequired(validate(schema, register));
