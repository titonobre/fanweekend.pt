import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Schema } from "zod";

export default function validateWithZod(schema: Schema, handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      req.body = await schema.parse(req.body);
    } catch (error) {
      return res.status(400).json(error);
    }

    await handler(req, res);
  };
}
