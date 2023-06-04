import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../../lib/auth/initAuth0";
import { getCurrentUser } from "../../../lib/data/currentUser";
import { getRegisteredActivities, getEventProgram } from "../../../lib/data/dataStore";

async function activities(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [registeredUser, eventProgram, activitiesResponses] = await Promise.all([
      getCurrentUser(req, res),
      getEventProgram(),
      getRegisteredActivities(),
    ]);

    if (!registeredUser) {
      // HTTP 401 Unauthorized
      res.status(401).end();
      return;
    }

    const userRegisteredActivities = activitiesResponses.filter((m) => m.user === registeredUser.id).map((response) => response.activity);

    const userRegisteredActivitiesSet = new Set(userRegisteredActivities);

    const userActivities = eventProgram.filter((activity) => userRegisteredActivitiesSet.has(activity.id));

    res.status(200).json(userActivities);
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}

export default auth0.withApiAuthRequired(activities);
