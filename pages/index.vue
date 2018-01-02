<template>
  <section>
    <cover/>

    <intro/>

    <when/>
    <where/>
    <participate/>

    <disclaimer/>
  </section>
</template>

<script>
import Cover from '~/components/cover/Cover.vue'
import Intro from '~/components/intro/Intro.vue'
import When from '~/components/when/When.vue'
import Where from '~/components/where/Where.vue'
import Participate from '~/components/participate/Participate.vue'
import Disclaimer from '~/components/disclaimer/Disclaimer.vue'

export default {
  components: {
    Cover,
    Intro,
    When,
    Where,
    Participate,
    Disclaimer
  }
}
</script>
