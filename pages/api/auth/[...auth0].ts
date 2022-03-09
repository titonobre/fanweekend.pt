import auth0 from "../../../lib/auth/initAuth0";
import { HandlerError } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default auth0.handleAuth({
  async profile(req: NextApiRequest, res: NextApiResponse) {
    try {
      const refetch = req?.query?.refetch === "true";

      await auth0.handleProfile(req, res, { refetch });
    } catch (error) {
      console.error(error);

      if (error instanceof HandlerError) {
        res.status(error.status || 500).end(error.message);
      } else {
        res.status(500).end("Internal server error");
      }
    }
  },
});
