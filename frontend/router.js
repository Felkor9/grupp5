// router/index.js
import { createRouter, createWebHistory } from "vue-router";

import profileView from "./src/views/profileView.vue";
import homeView from "./src/views/homeView.vue";
import destinationView from "./src/views/destinationView.vue";
import loginView from "./src/views/loginView.vue";
import bookingView from "./src/views/bookingView.vue";
import recensionView from "./src/views/recensionView.vue";
import bookView from "./src/views/bookView.vue";
import confirmationView from "./src/views/confirmationView.vue";

const routes = [
  { path: "/home", name: "homeView", component: homeView },
  { path: "/profile", name: "profileView", component: profileView },
  // { path: "/destination", name: "destinationView", component: destinationView },
  // { path: "/test", name: "testingView", component: testingView },
  {
    path: "/resadestination/:id",
    name: "destinationView",
    component: destinationView,
  },
  // { path: "/bokningar", name: "bookingView", component: bookingView },
  {
    path: "/bokningar/:userId",
    name: "bookingView",
    component: bookingView,
    props: true,
  },
  {
    path: "/",
    name: "loginView",
    component: loginView,
  },

  {
    path: "/recension",
    name: "recensionView",
    component: recensionView,
  },
  // { path: "/bokningar", name: "bookingView", component: bookingView },

  {
    path: "/book",
    name: "book",
    component: bookView,
  },

  {
    path: "/confirm",
    name: "confirm",
    component: confirmationView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
