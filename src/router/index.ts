import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import FAQ from "../views/FAQ.vue";
import Pricing from "../views/Pricing.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: Pricing,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
