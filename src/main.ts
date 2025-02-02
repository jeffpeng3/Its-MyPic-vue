/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
// import router from './router'
import vuetify from './plugins/vuetify'
import { routes } from 'vue-router/auto-routes'

export const createApp = ViteSSG(
  App,
  { routes: routes },
  (ctx) => {
    ctx.app.use(vuetify)
  }
)
