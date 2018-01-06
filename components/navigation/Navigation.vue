<template>
  <nav class="navbar is-fixed-top is-transparent"
    v-bind:class="{
      'is-rolled-up': navbarHidden,
      'is-at-top': hideAtTop && lastScrollPosition === 0,
      'is-expanded': navbarMenuOpen
    }">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item">
        Paredes de Coura Fan Weekend
      </nuxt-link>
      <div class="navbar-burger burger" v-bind:class="{ 'is-active': navbarMenuOpen }" @click="toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" v-bind:class="{ 'is-active': navbarMenuOpen }">
      <div class="navbar-start">
      </div>

      <div class="navbar-end">
        <nuxt-link to="/who-is-going" class="navbar-item">
          <span class="icon">
            <i class="fa fa-users"></i>
          </span>
          Who is Going?
        </nuxt-link>
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-link" target="_blank" rel="noopener" href="https://www.facebook.com/groups/fanweekend.pt">
                <span class="icon">
                  <i class="fa fa-facebook"></i>
                </span>
                <span>
                  Facebook
                </span>
              </a>
            </p>
            <p class="control">
              <a class="button is-primary" target="_blank" rel="noopener" href="https://fanweekend.pt/forums/">
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
    <div class="bd-special-shadow"></div>
  </nav>
</template>

<script>
export default {
  props: {
    hideAtTop: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      navbarHidden: false,
      navbarMenuOpen: false,
      lastScrollPosition: 0
    }
  },

  methods: {
    toggle () {
      this.navbarMenuOpen = !this.navbarMenuOpen
    },

    handleScroll: function (event) {
      const scrollPosition = window.pageYOffset | document.body.scrollTop

      const threshold = 56 // navbar height

      if (this.lastScrollPosition < scrollPosition && scrollPosition > threshold + threshold) {
        this.navbarHidden = true
        this.navbarMenuOpen = false
      } else if (this.lastScrollPosition > scrollPosition && !(scrollPosition <= threshold)) {
        this.navbarHidden = false
      }

      this.lastScrollPosition = scrollPosition
    }
  },

  created: function () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },

  mounted () {
    // this.popupItem = this.$el
  },

  destroyed: function () {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>

<style scoped>

.navbar {
  transition: all 0.2s
}

.navbar.is-rolled-up {
  top: -56px;
}

.navbar.is-at-top:not(.is-expanded) {
  background-color: transparent;
}

.navbar.is-at-top:not(.is-expanded) .navbar-brand .navbar-item {
  display: none;
}

.brand-image {
  max-height: 38px;
}

.bd-special-shadow {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), transparent);
    height: 8px;
    left: 0;
    opacity: 1;
    position: absolute;
    right: 0;
    top: 100%;
    transform: scaleY(1);
    transform-origin: center top;
    transition: all 0.25s
}

.navbar.is-at-top .bd-special-shadow,
.navbar.is-rolled-up .bd-special-shadow {
  opacity: 0;
}

</style>
