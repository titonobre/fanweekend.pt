module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Paredes de Coura Fan Weekend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/gif', href: '/favicon.gif' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /**
   * Modules
   */
  modules: [
    ['@nuxtjs/google-analytics', { id: 'UA-1495990-6' }],
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/bulma',
    '@nuxtjs/font-awesome'
  ],

  /*
  ** PWA
  */
  manifest: {
    name: 'Fan Weekend',
    lang: 'en'
  },

  workbox: {
    globIgnores: [
      'forums/**'
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },

    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
