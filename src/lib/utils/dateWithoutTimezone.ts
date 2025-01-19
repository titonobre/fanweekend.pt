import { zonedTimeToUtc } from "date-fns-tz";

export const adjustDateForTimezone = (date: Date, timeZone: string): Date => {
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const dateWithOffset = new Date(date.valueOf() - tzoffset);
  const withoutTimezone = dateWithOffset.toISOString().slice(0, -1);
  return zonedTimeToUtc(withoutTimezone, timeZone);
};
