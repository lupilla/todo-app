export const TODO_ROUTER = [
  {
    path: "/",
    name: "allTodos",
    // eslint-disable-next-line no-undef
    component: expect.any(Function),
  },
  {
    path: "/active",
    name: "activeTodos",
    // eslint-disable-next-line no-undef
    component: expect.any(Function),
  },
  {
    path: "/completed",
    name: "completedTodos",
    // eslint-disable-next-line no-undef
    component: expect.any(Function),
  },
  {
    path: "/:pathMatch(.*)*",
    // eslint-disable-next-line no-undef
    component: expect.any(Function),
  },
];
