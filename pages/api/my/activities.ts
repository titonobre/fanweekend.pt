import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../../lib/auth/initAuth0";
import { fetchCachedActivitiesResponses, fetchCachedEventProgram } from "../../../lib/data/cachedData";
import { getCurrentUser } from "../../../lib/data/currentUser";

async function activities(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [registeredUser, eventProgram, activitiesResponses] = await Promise.all([
      getCurrentUser(req, res),
      fetchCachedEventProgram(),
      fetchCachedActivitiesResponses(),
    ]);

    if (!registeredUser) {
      // HTTP 401 Unauthorized
      res.status(401).end();
      return;
    }

    const userActivitiesResponses = activitiesResponses
      .filter((m) => m.user === registeredUser.id)
      .reduce((acc, response) => {
        const key = `${response.date}|${response.time}|${response.activity}`;

        acc[key] = response.action === "register";

        return acc;
      }, {} as { [key: string]: boolean });

    const userActivities = eventProgram.filter((activity) => {
      const key = `${activity.date}|${activity.time}|${activity.title}`;

      return !!userActivitiesResponses[key];
    });

    res.status(200).json(userActivities);
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}

export default auth0.withApiAuthRequired(activities);
