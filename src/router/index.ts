import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Index from "@/views/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    component: Index
  },
  {
    path: "/future-employers",
    name: "future_employers",
    // route level code-splitting
    component: () => import("@/views/FutureEmployers.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
