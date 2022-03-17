import { ManagementClient } from "auth0";
import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../lib/auth/initAuth0";
import { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } from "../../lib/env";
import allowMethod, { HTTPMethod } from "../../lib/middleware/allowMethod";

const auth0Management = new ManagementClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: "update:users update:users_app_metadata",
});

async function resendVerificationEmail(req: NextApiRequest, res: NextApiResponse) {
  const session = auth0.getSession(req, res);

  if (!session) {
    // HTTP 401 Unauthorized
    res.status(401).end();
    return;
  }

  const id = session.user.sub;

  await auth0Management.sendEmailVerification({ user_id: id });

  res.status(200).json({ success: true });
}

export default auth0.withApiAuthRequired(allowMethod(HTTPMethod.GET, resendVerificationEmail));
