<template>
  <section>
    <navigation v-bind:hide-at-top="true" />

    <coming-soon />
  </section>
</template>

<script>
import ComingSoon from "~/components/coming-soon/ComingSoon.vue";

export default {
  components: {
    ComingSoon,
  },
};
</script>
