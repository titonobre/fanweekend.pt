import { Session } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../auth/initAuth0";

import { fetchCachedRegisteredUsers } from "./cachedData";
import { UserData } from "./fetchRegisteredUsers";

export async function getCurrentUser(req: NextApiRequest, res: NextApiResponse): Promise<UserData | undefined> {
  const [session, registeredUsers] = await Promise.all([auth0.getSession(req, res), fetchCachedRegisteredUsers()]);

  if (!session) {
    return undefined;
  }

  const currentUserId = session.user.sub;

  const registeredUser = registeredUsers.find((u) => u.id === currentUserId);

  return registeredUser;
}

export async function getCurrentUserId(req: NextApiRequest, res: NextApiResponse): Promise<string | undefined> {
  const session = auth0.getSession(req, res);

  if (!session) {
    return undefined;
  }

  return session.user.sub;
}

export async function getCurrentUserSession(req: NextApiRequest, res: NextApiResponse): Promise<Session | undefined> {
  const session = auth0.getSession(req, res);

  if (!session) {
    return undefined;
  }

  return session;
}
