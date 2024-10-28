/* eslint-disable @typescript-eslint/dot-notation */

import { currentUser } from "@clerk/nextjs/server";
import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

import { env } from "@/env";
import getRows from "@/lib/data-sources/spreadsheet";
import { Storage } from "@/lib/utils/storage";

const sheetId = env.REGISTERED_USERS_SHEET_ID;

type RegisteredUsersRaw = {
  ["ID"]: string;
  ["Payment Enabled"]: string;
  ["Payment Received"]: string;
  ["Volunteer"]: string;
  ["Extra Night"]: string;
  ["Accommodation"]: string;
};

export type UserData = {
  id: string;
  paymentEnabled: boolean;
  paymentReceived: boolean;
  volunteer: boolean;
  extraNight: string | undefined;
  accommodation: string | undefined;
};

const storage = new Storage();

const swr = createStaleWhileRevalidateCache({
  storage,
  minTimeToStale: 1000 * 60 * 5, // 5 minutes
  maxTimeToLive: 1000 * 60 * 10, // 10 minutes
});

export default async function fetchRegisteredUsers(): Promise<UserData[]> {
  const rows = await getRows<RegisteredUsersRaw>(sheetId);

  return rows.reduce<UserData[]>((acc, row) => {
    const id = row["ID"];
    const paymentEnabled = !!row["Payment Enabled"];
    const paymentReceived = !!row["Payment Received"];
    const volunteer = !!row["Volunteer"];
    const extraNight = (row["Extra Night"] ?? "") || undefined;
    const accommodation = (row["Accommodation"] ?? "") || undefined;

    if (id) {
      acc.push({
        id,
        paymentEnabled,
        paymentReceived,
        volunteer,
        extraNight,
        accommodation,
      });
    }

    return acc;
  }, []);
}

export async function getRegisteredUsers(): Promise<UserData[]> {
  const result = await swr("REGISTERED_USERS", async () => {
    return fetchRegisteredUsers();
  });

  return result.value;
}

export async function getUserRegistrationData(): Promise<UserData | undefined> {
  const user = await currentUser();

  if (!user) {
    return undefined;
  }

  const registeredUsers = await getRegisteredUsers();

  return registeredUsers.find((entry) => entry.id === user.id);
}

export function invalidateRegisteredUsers() {
  storage.removeItem("REGISTERED_USERS");
}
