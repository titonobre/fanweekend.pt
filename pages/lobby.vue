<template>
  <section class="has-navbar-fixed-top">
    <navigation v-bind:hide-at-top="false" />

    <lobby />

    <disclaimer />
  </section>
</template>

<script>
import Navigation from "~/components/navigation/Navigation.vue";
import Lobby from "~/components/lobby/Lobby.vue";
import Disclaimer from "~/components/disclaimer/Disclaimer.vue";

export default {
  components: {
    Navigation,
    Lobby,
    Disclaimer
  }
};
</script>

<style scoped>
.has-navbar-fixed-top {
  padding-top: 3.25rem;
}
</style>
