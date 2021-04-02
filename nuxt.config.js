module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Paredes de Coura Fan Weekend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'NeioT77qHDgGHXPSVvYSKSU1Awjt4rn50MZPCYUG414' },
      { hid: 'description', name: 'description', content: 'Paredes de Coura Fan Weekend 2021' }
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
    runtimeCaching: [
      {
        // You can use a RegExp as the pattern:
        urlPattern: /forums\/entry/,
        handler: 'networkOnly'
      }
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
