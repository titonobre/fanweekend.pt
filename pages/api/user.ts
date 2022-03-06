import crypto, { BinaryLike } from "crypto";

import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "@auth0/nextjs-auth0";

import { TAWK_TO_API_KEY } from "./../../lib/env";

function getHash(data: BinaryLike, key: string) {
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(data);
  return hmac.digest("hex");
}

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession(req, res);

    if (!session) {
      // HTTP 401 Unauthorized
      res.status(401).end();
      return;
    }

    const data = {
      id: session.user.sub,
      name: session.user.name,
      email: session.user.email,

      tawkToHash: getHash(session.user.email, TAWK_TO_API_KEY),
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}
