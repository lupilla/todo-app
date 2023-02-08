import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import createVuexStore from "./mocks/mock-store.js";
import router from "@/router";
const store = createVuexStore();
const $route = {
  path: "/",
};
describe("App tests", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(App, {
      global: {
        mocks: {
          $route,
        },
        plugins: [store, router],
      },
    });
  });
  test("should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should have a div with an id with 'app' value", () => {
    const id = wrapper.find("#app");
    expect(id.exists()).toBe(true);
    expect(id.isVisible()).toBe(true);
  });

  test("should have a router-view-stub with name 'default'", () => {
    const routerStub = wrapper.find("router-view-stub");
    expect(routerStub.exists()).toBe(true);
    expect(routerStub.isVisible()).toBe(true);
  });
});
