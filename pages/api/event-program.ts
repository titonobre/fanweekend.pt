import type { NextApiRequest, NextApiResponse } from "next";

import { getEventProgram } from "../../lib/data/dataStore";

async function eventProgram(req: NextApiRequest, res: NextApiResponse) {
  try {
    const activities = await getEventProgram();

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}

export default eventProgram;
