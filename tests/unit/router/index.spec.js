import router from "@/router/index.js";
import { TODO_ROUTER } from "../mocks/router.js";

describe("router tests", () => {
  const routes = router.options.routes;
  test("router should has an especific config for main routes", async () => {
    const names = [];
    router.options.routes.forEach((route) => {
      names.push(route.component());
    });
    const routesDefaultComponent = (await Promise.all(names)).map(
      (route) => route.default.name
    );
    expect(routes).toMatchObject(TODO_ROUTER);
    expect(routesDefaultComponent).toContain("TodoPage");
    expect(routesDefaultComponent).toContain("NoPageFound");
  });

  test("router should has an especific config for 'allTodos' route", async () => {
    const defaultRoute = routes.find((route) => route.name === "allTodos");
    const componentRoute = await defaultRoute.component();
    expect(componentRoute.default.name).toBe("TodoPage");
  });

  test("router should has an especific config for 'activeTodos' route", async () => {
    const defaultRoute = routes.find((route) => route.name === "activeTodos");
    const componentRoute = await defaultRoute.component();
    expect(componentRoute.default.name).toBe("TodoPage");
  });

  test("router should has an especific config for 'completedTodos' route", async () => {
    const defaultRoute = routes.find(
      (route) => route.name === "completedTodos"
    );
    const componentRoute = await defaultRoute.component();
    expect(componentRoute.default.name).toBe("TodoPage");
  });
});
