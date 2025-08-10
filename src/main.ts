import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initYandexMetrika } from "yandex-metrika-vue3";
import { MotionPlugin } from "@vueuse/motion";
import i18n from "./i18n";

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(MotionPlugin);
app.use(initYandexMetrika, {
  scriptSrc: "https://mc.yandex.ru/metrika/tag.js",
  id: "103610905",
  router: router, // Pass the router instance for automatic pageview tracking
  env: import.meta.env.NODE_ENV,
});

app.mount("#app");
