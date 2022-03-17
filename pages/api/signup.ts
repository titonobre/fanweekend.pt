import { HandlerError } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../lib/auth/initAuth0";

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth0.handleLogin(req, res, {
      returnTo: "/account",
      authorizationParams: {
        screen_hint: "signup", // this prompts the signup screen
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof HandlerError) {
      res.status(error.status || 500).end(error.message);
    } else {
      res.status(500).end("Internal server error");
    }
  }
}
