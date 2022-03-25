import crypto from "crypto";

import { Session } from "@auth0/nextjs-auth0";
import { ManagementClient } from "auth0";
import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../lib/auth/initAuth0";
import { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } from "../../lib/env";
import schema, { FormValues } from "../../lib/form/profile-schema";
import validate from "../../lib/middleware/validate";

type UserMetadata = Record<string, string | number | boolean>;

const auth0Management = new ManagementClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: "update:users update:users_app_metadata",
});

function generateAvatarUrl(email: string, name: string) {
  const hash = crypto.createHash("md5").update(email).digest("hex");

  const initials = name
    ?.match(/(^\S\S?|\b\S)?/g)
    ?.join("")
    ?.match(/(^\S|\S$)?/g)
    ?.join("")
    ?.toLocaleLowerCase();

  const fallback = (initials && encodeURI(`https://i1.wp.com/cdn.auth0.com/avatars/${initials}.png?ssl=1`)) || "retro";

  return `https://www.gravatar.com/avatar/${hash}?r=pg&d=${fallback}`;
}

async function updateUserMetadata(session: Session, metadata: UserMetadata = {}): Promise<void> {
  const id = session.user.sub;

  await auth0Management.updateUser({ id }, metadata);
}

async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = auth0.getSession(req, res);

    if (!session) {
      // HTTP 401 Unauthorized
      res.status(401).end();
      return;
    }

    const body = req.body as FormValues;

    const { email } = session.user;
    const { name } = body;

    const picture = generateAvatarUrl(email, name);

    const userData = {
      name,
      picture,
    };

    await updateUserMetadata(session, userData);

    return auth0.handleProfile(req, res, { refetch: true });

    // res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}

export default auth0.withApiAuthRequired(validate(schema, user));
