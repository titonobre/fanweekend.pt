<template>
  <section>
    <navigation v-bind:hide-at-top="true"/>
    <coming-soon/>
  </section>
</template>

<script>
import Navigation from '~/components/navigation/Navigation.vue'
import ComingSoon from '~/components/coming-soon/ComingSoon.vue'

export default {
  components: {
    Navigation,
    ComingSoon
  }
}
</script>
