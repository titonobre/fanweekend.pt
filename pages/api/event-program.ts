import type { NextApiRequest, NextApiResponse } from "next";

import { fetchCachedEventProgram } from "../../lib/data/cachedData";

async function eventProgram(req: NextApiRequest, res: NextApiResponse) {
  try {
    const activities = await fetchCachedEventProgram();

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}

export default eventProgram;
