import { createRouter, createWebHistory } from "vue-router";

/**
 * Array of routes included in the application
 * - Default route ("/"): all todos are showed
 * - Active route ("/active"): only active todos are showed
 * - Completed route ("/completed"): only completed todos are showed
 * - Page not found route: error page 404 is showed when the route does not match
 */
const routes = [
  {
    path: "/",
    name: "allTodos",
    component: () =>
      import(
        /* webpackChunkName: 'alltodos'*/ "@/modules/todos/pages/TodoPage.vue"
      ),
  },
  {
    path: "/active",
    name: "activeTodos",
    component: () =>
      import(
        /* webpackChunkName: 'active'*/ "@/modules/todos/pages/TodoPage.vue"
      ),
  },
  {
    path: "/completed",
    name: "completedTodos",
    component: () =>
      import(
        /* webpackChunkName: 'completed'*/ "@/modules/todos/pages/TodoPage.vue"
      ),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(
        /* webpackChunkName: 'NoPageFoundPage'*/ "@/modules/shared/pages/NoPageFound.vue"
      ),
  },
];

/**
 * Router creation method to export it to the main.js file
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
