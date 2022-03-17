import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
}

export default function allowMethod(methods: HTTPMethod | HTTPMethod[], handler: NextApiHandler) {
  const allowedMethods = Array.isArray(methods) ? methods : [methods];

  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { method } = req;

    if (!allowedMethods.includes(method as HTTPMethod)) {
      res.status(405).end(); // HTTP 405 Method Not Allowed
      return;
    }

    await handler(req, res);
  };
}
