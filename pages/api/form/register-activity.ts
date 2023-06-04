import { FormData } from "formdata-polyfill/esm.min.js";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

import auth0 from "../../../lib/auth/initAuth0";
import { invalidateActivitiesResponses } from "../../../lib/data/dataStore";
import { ACTIVITIES_FORM_ID } from "../../../lib/env";
import { RegisterActivityFormData } from "../../../lib/form/register-activity-form-schema";
import validateWithZod from "../../../lib/middleware/validate-zod";

const formUrl = `https://docs.google.com/forms/d/e/${ACTIVITIES_FORM_ID}/formResponse`;

const fields = {
  user: "entry.312258323",
  activity: "entry.71091031",
};

async function registerActivity(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = auth0.getSession(req, res);

  if (!session) {
    // HTTP 401 Unauthorized
    res.status(401).end();
    return;
  }

  const body = req.body as RegisterActivityFormData;

  // prepare the form data
  const formData = new FormData();
  formData.append(fields.user, session?.user?.sub);
  formData.append(fields.activity, body.activity);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(formUrl, requestOptions);

    invalidateActivitiesResponses();

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

export default auth0.withApiAuthRequired(validateWithZod(RegisterActivityFormData, registerActivity));
