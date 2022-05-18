import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../../lib/auth/initAuth0";
import { fetchCachedMOCs } from "../../../lib/data/cachedData";
import { getCurrentUser } from "../../../lib/data/currentUser";

async function mocs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [registeredUser, mocs] = await Promise.all([getCurrentUser(req, res), fetchCachedMOCs()]);

    if (!registeredUser) {
      // HTTP 401 Unauthorized
      res.status(401).end();
      return;
    }

    const userMocs = mocs.filter((m) => m.user === registeredUser.id).map(({ title }) => ({ title }));

    res.status(200).json(userMocs);
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}

export default auth0.withApiAuthRequired(mocs);