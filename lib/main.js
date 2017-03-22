/*

  Purpose: Webpack entry point

*/

'use strict'

import firebase from 'firebase'
window.bla = firebase

// Check inclusion by Webpack
if (process.env.APP_ROOT_FROM_SCRIPTS === undefined) {
  process.stdout.write('\x1bc' + 'Error: This file must be run with webpack.\n\n')
  process.exit()
}

// Include configuration
let cfg = require(process.env.APP_ROOT_FROM_SCRIPTS + 'config.json')

// Include Favicon
require(process.env.CACHE_ROOT_FROM_SCRIPTS + 'icons/dev/favicon.ico')

// Include Firebase
require('firebase')

// Include Vue
let Vue = require('vue')

// Include Framework7
require('../vendor/framework7/js/framework7.min.js')
require('../vendor/framework7/css/framework7.' + process.env.THEME + '.min.css')
require('../vendor/framework7/css/framework7.' + process.env.THEME + '.colors.min.css')

// Include Framework7-Vue
Vue.use(require('../vendor/framework7-vue/framework7-vue.min.js'))

// Include icon fonts
if (process.env.FONT_FRAMEWORK7 === 'true') {
  require('framework7-icons/css/framework7-icons.css')
}
if (process.env.FONT_MATERIAL === 'true') {
  require('../vendor/material-icons/css/material-icons.css')
}
if (process.env.FONT_ION === 'true') {
  require('ionicons/dist/css/ionicons.min.css')
}
if (process.env.FONT_AWESOME === 'true') {
  require('font-awesome/css/font-awesome.min.css')
}

// Include iNoBounce
require('inobounce')

// Include main css file
require('../main.css')

// Load routes
let routes = require(process.env.APP_ROOT_FROM_SCRIPTS + 'routes.json')
for (let r = 0; r < routes.length; r++) {
  routes[r].component = require(process.env.APP_ROOT_FROM_SCRIPTS + 'pages/' + routes[r].component)
  if (Array.isArray(routes[r].tabs)) {
    for (let t = 0; t < routes[r].tabs.length; t++) {
      routes[r].tabs[t].component = require(process.env.APP_ROOT_FROM_SCRIPTS + 'pages/' + routes[r].tabs[t].component)
    }
  }
}

// Init Vue/Framework7 app
new Vue({ // eslint-disable-line
  el: '#app',
  template: '<app />',
  components: {
    app: require(process.env.APP_ROOT_FROM_SCRIPTS + 'app.vue')
  },
  framework7: {
    root: '#app',
    routes: routes,
    material: process.env.THEME === 'material',
    pushState: true
  },
  data: {
    config: cfg
  }
})