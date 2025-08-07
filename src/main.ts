import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { initYandexMetrika } from "yandex-metrika-vue3";

const app = createApp(App);

app.use(initYandexMetrika, {
  scriptSrc: "https://mc.yandex.ru/metrika/tag.js",
  id: "103610905", // Replace XXXXXXXX with your Yandex Metrica counter ID
  // router: null, // Pass the router instance for automatic pageview tracking
  env: import.meta.env.NODE_ENV, // Optional: Only send data in production
  // other options like accurateTrackBounce, clickmap, webvisor, etc.
});

app.mount("#app");
