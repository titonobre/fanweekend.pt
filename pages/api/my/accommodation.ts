import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../../lib/auth/initAuth0";
import { fetchCachedAccommodations } from "../../../lib/data/cachedData";
import { getCurrentUser } from "../../../lib/data/currentUser";
import { loadSpreadsheet } from "../../../lib/data/spreadsheet";

async function accommodation(req: NextApiRequest, res: NextApiResponse) {
  try {
    await loadSpreadsheet();

    const [registeredUser, houses] = await Promise.all([getCurrentUser(req, res), fetchCachedAccommodations()]);

    if (!registeredUser) {
      // HTTP 401 Unauthorized
      res.status(401).end();
      return;
    }

    const assignedAccommodation = registeredUser?.accommodation;

    if (!assignedAccommodation) {
      // HTTP 404 Not Found
      res.status(404).end();
      return;
    }

    const house = houses[assignedAccommodation];

    res.status(200).json(house);
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}

export default auth0.withApiAuthRequired(accommodation);
