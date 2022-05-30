import { FormData } from "formdata-polyfill/esm.min.js";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

import auth0 from "../../../lib/auth/initAuth0";
import { invalidateMOCs } from "../../../lib/data/dataStore";
import { REGISTER_MOC_FORM_ID } from "../../../lib/env";
import schema, { FormValues } from "../../../lib/form/register-moc-form-schema";
import validate from "../../../lib/middleware/validate";

const formUrl = `https://docs.google.com/forms/d/e/${REGISTER_MOC_FORM_ID}/formResponse`;

const fields = {
  user: "entry.385305124",
  title: "entry.584855639",
  description: "entry.1807385050",
  photo: "entry.2103067351",
  elements: "entry.350699548",
  buildTime: "entry.2096911212",
  width: "entry.1356582357",
  depth: "entry.373745618",
  notes: "entry.1606661740",
};

async function registerMocs(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = auth0.getSession(req, res);

  if (!session) {
    // HTTP 401 Unauthorized
    res.status(401).end();
    return;
  }

  const body = req.body as FormValues;

  // prepare the form data
  const formData = new FormData();
  formData.append(fields.user, session?.user?.sub);
  formData.append(fields.title, body.title);
  formData.append(fields.width, body.width.toString());
  formData.append(fields.depth, body.depth.toString());
  formData.append(fields.description, body.description || "");
  formData.append(fields.photo, body.photo || "");
  formData.append(fields.elements, body.elements?.toString() || "");
  formData.append(fields.buildTime, body.buildTime || "");
  formData.append(fields.notes, body.notes || "");

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(formUrl, requestOptions);

    invalidateMOCs();

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

export default auth0.withApiAuthRequired(validate(schema, registerMocs));
