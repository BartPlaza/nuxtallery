const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Quicksand' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/forms.css',
    '~assets/css/animations.css',
    '~assets/css/variables.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/globalComponents.js',
    '~plugins/firebase.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },

  env: {
    firebaseAPIKey: 'AIzaSyBe1vcGaSuudKxkwIlqBUsMAFbgawRkICA'
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  router: {
    extendRoutes(routes, resolve){
      routes.push({
        path: '/galery',
        component: resolve(__dirname, 'pages/galery/public/index.vue')
      })
    }
  }
}
