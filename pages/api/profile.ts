import type { NextApiRequest, NextApiResponse } from "next";

import { handleProfile, HandlerError } from "@auth0/nextjs-auth0";

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleProfile(req, res, {});
  } catch (error) {
    console.error(error);

    if (error instanceof HandlerError) {
      res.status(error.status || 500).end(error.message);
    } else {
      res.status(500).end("Internal server error");
    }
  }
}
