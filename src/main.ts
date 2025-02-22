/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import LongPress from "./plugins/long-press";
import vuetify from "./plugins/vuetify";
import { routes } from "vue-router/auto-routes";
import { createPinia } from "pinia";

export const createApp = ViteSSG(App, { routes: routes }, (ctx) => {
  ctx.app.use(vuetify);
  ctx.app.use(createPinia());
  ctx.app.directive("longPress", LongPress);
});
