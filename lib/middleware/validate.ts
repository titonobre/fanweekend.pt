import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

export default function validate(schema: OptionalObjectSchema<ObjectShape>, handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      req.body = await schema.validate(req.body, { stripUnknown: true, abortEarly: false });
    } catch (error) {
      return res.status(400).json(error);
    }

    await handler(req, res);
  };
}
