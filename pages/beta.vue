<template>
  <section>
    <nav class="navbar is-fixed-top is-transparent">
      <div class="navbar-brand">
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-primary" href="https://fanweekend.pt/forums/">
                  <span class="icon">
                    <i class="fa fa-comments"></i>
                  </span>
                  <span>Forums</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

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
