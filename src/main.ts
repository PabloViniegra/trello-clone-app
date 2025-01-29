import "./index.css";
import 'vue-toast-notification/dist/theme-bootstrap.css';
import ToastPlugin from "vue-toast-notification";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);
VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: 3,
        refetchOnWindowFocus: false,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  },
});
app.use(createPinia());
app.use(router);
app.use(ToastPlugin);
app.mount("#app");
