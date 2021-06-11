<template>
  <section class="section">
    <div class="container content">
      <h1>Timetable</h1>

      <article class="message">
        <div class="message-body">
          <b>Please note</b> the times below are displayed according to the
          timezone <b>{{ timeZone }}</b> configured on the device you are
          reading this!
        </div>
      </article>

      <div class="timeline">
        <template class="timeline-item" v-for="(day, index) of activitiesByDay">
          <header class="timeline-header" v-bind:key="index">
            <span class="tag is-medium is-primary">Day {{ index + 1 }}</span>
          </header>
          <div
            class="timeline-item"
            v-for="activity of day"
            v-bind:key="activity.id"
          >
            <div
              class="timeline-marker is-icon"
              v-bind:class="['is-' + activity.style.color]"
            >
              <i class="fa" v-bind:class="['fa-' + activity.style.icon]"></i>
            </div>

            <div class="timeline-content">
              <p class="heading">
                {{ activity.startTimeFormatted }}
                ({{ activity.startTimeDistance }})
              </p>
              <p>{{ activity.name }}</p>
              <p class="is-size-7" v-if="activity.hosts">
                <i
                  class="fa"
                  v-bind:class="[
                    activity.hosts.length > 1 ? 'fa-users' : 'fa-user'
                  ]"
                ></i>
                {{ activity.hosts.join(", ") }}
              </p>
            </div>
          </div>
        </template>

        <div class="timeline-header">
          <span class="tag is-medium is-primary">End</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { utcToZonedTime } from "date-fns-tz";

import isSameDay from "date-fns/isSameDay";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import timetable from "~/data/timetable.json";

const eventTimeZone = "Europe/Lisbon";

const ACTIVITY_STYLES = {
  default: { icon: "cubes", color: "info" },
  info: { icon: "info", color: "info" },
  game: { icon: "cubes", color: "warning" },
  presentation: { icon: "picture-o", color: "danger" },
  panel: { icon: "comments-o", color: "success" },
  talk: { icon: "comments-o", color: "success" },
  break: { icon: "cutlery", color: "light" }
};

function getActivitiesByDay() {
  return timetable
    .map(activity => {
      const style = ACTIVITY_STYLES[activity.type] || ACTIVITY_STYLES.default;

      const parsedStartTime = parseISO(activity.startTime);

      const startTimeFormatted = format(parsedStartTime, "HH:mm");
      const startTimeDistance = formatDistanceToNow(parsedStartTime, {
        addSuffix: true
      });

      return {
        ...activity,
        style,
        startTimeFormatted,
        startTimeDistance
      };
    })
    .reduce((acc, activity) => {
      const lastGroup = acc.slice(-1)?.[0];

      if (!lastGroup) {
        return [[activity]];
      }

      const firstGroups = acc.slice(0, -1);

      const lastActivity = lastGroup.slice(-1)?.[0];

      const tzLastStartTime = utcToZonedTime(
        parseISO(lastActivity.startTime),
        eventTimeZone
      );

      const tzCurrStartTime = utcToZonedTime(
        parseISO(activity.startTime),
        eventTimeZone
      );

      if (isSameDay(tzLastStartTime, tzCurrStartTime)) {
        return [...firstGroups, [...lastGroup, activity]];
      }

      return [...firstGroups, lastGroup, [activity]];
    }, []);
}

export default {
  mounted() {
    setTimeout(
      () => {
        this.activitiesByDay = getActivitiesByDay();
      },
      1000 * 60 * 5 // five minutes
    );
  },
  data() {
    const timeZone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";

    const activitiesByDay = getActivitiesByDay();

    return { timeZone, activitiesByDay };
  }
};
</script>

<style>
@import url(bulma-timeline/dist/css/bulma-timeline.min.css);
</style>
