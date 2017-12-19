<template>
  <section class="container">
    <coming-soon/>
  </section>
</template>

<script>
import ComingSoon from '~/components/coming-soon/ComingSoon.vue'

export default {
  components: {
    ComingSoon
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
