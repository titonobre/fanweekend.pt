const axios = require("axios");
const fs = require("fs");
const hashSum = require("hash-sum");
const parseDate = require("date-fns/parse");
var isValidDate = require("date-fns/isValid");

const fsp = fs.promises;

const url = "https://spreadsheets.google.com/feeds/cells/1KDZyLkmx8tVOKat-nfP7lPGyF8wIU1U8k63qqHkZXVg/2/public/values?alt=json";

function parseFeed(feed) {
  const rows = [];
  feed.entry.forEach(function (entry) {
    const col = parseInt(entry.gs$cell.col);
    const row = parseInt(entry.gs$cell.row);
    const content = entry.gs$cell.$t;
    const rowD = (rows[row - 1] = rows[row - 1] || []);
    rowD[col - 1] = content ? content.trim() : "";
  });
  return rows;
}

(async function fetchData() {
  try {
    const response = await axios.get(url);

    const parsedFeed = parseFeed(response.data.feed);

    const activities = parsedFeed
      .slice(3)
      .filter((row) => !!row[1] || !!row[2])
      .map((row) => {
        const date = row[0];
        const startTime = row[1];
        const endTime = row[2];
        const name = row[3]?.split("\n").join(" + ");
        const hosts = row[4]?.split("\n");
        const type = row[7];
        return {
          type,
          date,
          startTime,
          endTime,
          name,
          hosts,
        };
      })
      .reduce((acc, row) => {
        const lastActivity = acc.slice(-1)?.[0] || {};

        const isNewActivity = !!row.name && row.name !== lastActivity.name;

        if (isNewActivity) {
          const newActivity = {
            ...row,
            date: row.date || lastActivity.date,
          };

          return [...acc, newActivity];
        } else if (row.endTime) {
          const firstActivities = acc.slice(0, -1);

          const extendedLastActivity = {
            ...lastActivity,
            endTime: row.endTime,
          };

          return [...firstActivities, extendedLastActivity];
        }

        return acc;
      }, [])
      .map((activity) => {
        const parsedDate = parseDate(activity.date, "EEEE, MMM d", new Date());
        const parsedStartTime = parseDate(activity.startTime, "HH:mm", parsedDate);
        const parsedEndTime = parseDate(activity.endTime, "HH:mm", parsedDate);

        return {
          ...activity,
          date: parsedDate,
          startTime: parsedStartTime?.toISOString(),
          endTime: parsedEndTime?.toISOString(),
        };
      })
      .map((activity) => {
        const { date, ...rest } = activity;

        const id = hashSum(activity.startTime);

        return {
          id,
          ...rest,
        };
      });

    await fsp.writeFile("data/timetable.json", JSON.stringify(activities, undefined, 2), "utf8");
  } catch (error) {
    console.error(error);
  }
})();
