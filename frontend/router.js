// router/index.js
import { createRouter, createWebHistory } from "vue-router";

import profileView from "./src/views/profileView.vue";
import homeView from "./src/views/homeView.vue";
import destinationView from "./src/views/destinationView.vue";
import testingView from "./src/views/testingView.vue";
import bookingView from "./src/views/bookingView.vue";
import BookView from "./src/views/bookView.vue";

const routes = [
  { path: "/", name: "homeView", component: homeView },
  { path: "/profile", name: "profileView", component: profileView },
  // { path: "/destination", name: "destinationView", component: destinationView },
  { path: "/test", name: "testingView", component: testingView },
  {
    path: "/resadestination/:id",
    name: "destinationView",
    component: destinationView,
  },
  { path: "/bokningar", name: "bookingView", component: bookingView },
  {
    path: "/book",
    name: "Book",
    component: BookView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
