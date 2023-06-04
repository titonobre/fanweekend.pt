import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../lib/auth/initAuth0";
import { getEventProgram, getRegisteredActivities } from "../../lib/data/dataStore";

type AvailableActivity = {
  id: string;
  title: string;
  startTime: string;
  description?: string;
  registrationNotes?: string;
  available: boolean;
  limited: boolean;
  registered: boolean;
};

async function availableActivities(req: NextApiRequest, res: NextApiResponse) {
  const session = auth0.getSession(req, res);

  if (!session) {
    // HTTP 401 Unauthorized
    res.status(401).end();
    return;
  }

  const userId = session.user.sub;

  try {
    const [activities, registeredActivities] = await Promise.all([getEventProgram(), getRegisteredActivities()]);

    const registrationsCount = registeredActivities.reduce<Record<string, number>>((acc, registration) => {
      const count = acc[registration.activity] || 0;
      acc[registration.activity] = count + 1;
      return acc;
    }, {});

    const alreadyRegistered = registeredActivities
      .filter((registration) => registration.user === userId)
      .map((registration) => registration.activity);

    const availableActivities = activities
      .filter((activity) => activity.signUpRequired)
      .map<AvailableActivity>((activity) => {
        const { id, title, startTime, description, registrationNotes, participantsLimit } = activity;

        const registrations = registrationsCount[activity.id] || 0;

        const registered = alreadyRegistered.includes(id);
        const available = registrations < (participantsLimit || Infinity) && !registered;
        const limited = (participantsLimit || 0) > 0;

        return {
          id,
          title,
          startTime,
          description,
          registrationNotes,
          available,
          limited,
          registered,
        };
      });

    res.status(200).json(availableActivities);
  } catch (error) {
    console.error(error);

    res.status(500).end("Internal server error");
  }
}

export type { AvailableActivity };

export default auth0.withApiAuthRequired(availableActivities);
