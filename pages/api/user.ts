import crypto, { BinaryLike } from "crypto";

import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../lib/auth/initAuth0";
import fetchRegisteredUsers from "../../lib/data/fetchRegisteredUsers";

import { TAWK_TO_API_KEY } from "./../../lib/env";

function getHash(data: BinaryLike, key: string) {
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(data);
  return hmac.digest("hex");
}

async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [session, registeredUsers] = await Promise.all([auth0.getSession(req, res), fetchRegisteredUsers()]);

    if (!session) {
      // HTTP 401 Unauthorized
      res.status(401).end();
      return;
    }

    const registeredUser = registeredUsers.find((u) => u.id === session.user.sub);

    const data = {
      id: session.user.sub,
      name: session.user.name,
      email: session.user.email,
      plan: registeredUser?.plan,

      emailVerified: session.user.email_verified,
      formSubmitted: !!registeredUser,
      paymentEnabled: !!registeredUser?.paymentEnabled,
      paymentReceived: !!registeredUser?.paymentReceived,
      extraNightSelected: !!registeredUser?.extraNight,

      tawkToHash: getHash(session.user.email, TAWK_TO_API_KEY),
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}

export default auth0.withApiAuthRequired(user);
