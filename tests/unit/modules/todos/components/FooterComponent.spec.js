import { shallowMount } from "@vue/test-utils";
import FooterComponent from "@/modules/todos/components/FooterComponent.vue";
import {
  ACTIVE_STATE,
  COMPLETED_STATE,
  INITIAL_STATE,
} from "../../../mocks/state";
import createVuexStore from "../../../mocks/mock-store.js";
import router from "@/router";
const store = createVuexStore();
const $route = {
  path: "/",
  name: "allTodos",
};
describe("FooterComponent tests", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(FooterComponent, {
      global: {
        mocks: {
          $route,
        },
        plugins: [store, router],
      },
      props: {
        todos: INITIAL_STATE.todos,
      },
      computed: {
        getAllTodos: () => INITIAL_STATE.todos,
        getCompletedTodos: () =>
          INITIAL_STATE.todos.filter((todo) => todo.completed),
        getActiveTodos: () =>
          INITIAL_STATE.todos.filter((todo) => !todo.completed),
      },
    });
  });

  test("FooterComponent Component should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should show 'clear component' button with completed todos", () => {
    const clearButton = wrapper.find('[data-id-test="remove"]');
    expect(clearButton.exists()).toBe(true);
  });

  test("property 'linkSelected' should have 'all' value by default", () => {
    expect(wrapper.vm.$data.linkSelected).toBe("all");
  });

  test("should show 'clear component' button when all todos are completed", async () => {
    const $route = {
      path: "/completed",
      name: "completedTodos",
    };
    const wrapper = await shallowMount(FooterComponent, {
      global: {
        mocks: {
          $route,
        },
        plugins: [store, router],
      },
      props: {
        todos: COMPLETED_STATE.todos,
      },
      computed: {
        getAllTodos: () => COMPLETED_STATE.todos,
        getCompletedTodos: () =>
          COMPLETED_STATE.todos.filter((todo) => todo.completed),
        getActiveTodos: () =>
          COMPLETED_STATE.todos.filter((todo) => !todo.completed),
      },
    });
    const clearButton = wrapper.find('[data-id-test="remove"]');
    expect(clearButton.exists()).toBe(true);
    expect(clearButton.isVisible()).toBe(true);
  });

  test("should show FooterComponent properly when there are not todos", async () => {
    const wrapper = shallowMount(FooterComponent, {
      global: {
        mocks: {
          $route,
        },
        plugins: [store, router],
      },
      props: {
        todos: [],
      },
      computed: {
        getAllTodos: () => [],
        getCompletedTodos: () => [],
        getActiveTodos: () => [],
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  test("should show three buttons for filtering", async () => {
    const buttons = await wrapper.findAll("router-link-stub");
    expect(buttons.length).toBe(3);
  });
  test("should call 'selectedEvent' with 'all' argument when 'all' button is clicked", async () => {
    const spyNavigate = jest.spyOn(wrapper.vm, "selectedEvent");
    const buttons = await wrapper.findAll("router-link-stub");
    await buttons[0].trigger("click");
    expect(spyNavigate).toHaveBeenCalledWith("all");
  });

  test("should call 'selectedEvent' with 'active' argument when 'active' button is clicked", async () => {
    const spyNavigate = jest.spyOn(wrapper.vm, "selectedEvent");
    const buttons = await wrapper.findAll("router-link-stub");
    await buttons[1].trigger("click");
    expect(spyNavigate).toHaveBeenCalledWith("active");
  });

  test("should call 'selectedEvent' with 'completed' argument when 'completed' button is clicked", async () => {
    const spyNavigate = jest.spyOn(wrapper.vm, "selectedEvent");
    const buttons = await wrapper.findAll("router-link-stub");
    await buttons[2].trigger("click");
    expect(spyNavigate).toHaveBeenCalledWith("completed");
  });

  test("should change 'linkSelected' property with 'all' value when 'all' button is clicked", async () => {
    const buttons = await wrapper.findAll("router-link-stub");
    await buttons[0].trigger("click");
    expect(wrapper.vm.$data.linkSelected).toBe("all");
  });

  test("should change 'linkSelected' property with 'active' value when 'active' button is clicked", async () => {
    const buttons = await wrapper.findAll("router-link-stub");
    await buttons[1].trigger("click");
    expect(wrapper.vm.$data.linkSelected).toBe("active");
  });

  test("should change 'linkSelected' property with 'completed' value when 'completed' button is clicked", async () => {
    const buttons = await wrapper.findAll("router-link-stub");
    await buttons[2].trigger("click");
    expect(wrapper.vm.$data.linkSelected).toBe("completed");
  });

  test("'removeTodos' method should call 'deleteCompletedTodos' action", async () => {
    const spyRemoveTodos = jest.spyOn(wrapper.vm, "deleteCompletedTodos");
    wrapper.vm.removeTodos();
    expect(spyRemoveTodos).toHaveBeenCalled();
  });

  test("should call 'linkSelected' method when 'all' button is clicked", async () => {
    const spyselectedEvent = jest.spyOn(wrapper.vm, "selectedEvent");
    const buttons = await wrapper.findAll("router-link-stub");
    await buttons[0].trigger("click");
    expect(spyselectedEvent).toHaveBeenCalled();
  });

  test("should call 'linkSelected' method when 'active' button is clicked", async () => {
    const spyselectedEvent = jest.spyOn(wrapper.vm, "selectedEvent");
    const buttons = await wrapper.findAll("router-link-stub");
    await buttons[1].trigger("click");
    expect(spyselectedEvent).toHaveBeenCalled();
  });

  test("should call 'linkSelected' method when 'completed' button is clicked", async () => {
    const spyselectedEvent = jest.spyOn(wrapper.vm, "selectedEvent");
    const buttons = await wrapper.findAll("router-link-stub");
    await buttons[2].trigger("click");
    expect(spyselectedEvent).toHaveBeenCalled();
  });

  test("should call 'removeTodos' method when 'clear completed' button is clicked", async () => {
    const spyRemoveTodos = jest.spyOn(wrapper.vm, "removeTodos");
    const clearButton = wrapper.find('[data-id-test="remove"]');
    await clearButton.trigger("click");
    expect(spyRemoveTodos).toHaveBeenCalled();
  });

  test("property 'linkSelected' should have 'active' value when route is '/active'", () => {
    const $route = {
      path: "/active",
      name: "activeTodos",
    };
    const wrapper = shallowMount(FooterComponent, {
      global: {
        mocks: {
          $route,
        },
        plugins: [store, router],
      },
      props: {
        todos: ACTIVE_STATE.todos,
      },
      computed: {
        getAllTodos: () => ACTIVE_STATE.todos,
        getCompletedTodos: () =>
          ACTIVE_STATE.todos.filter((todo) => todo.completed),
        getActiveTodos: () =>
          ACTIVE_STATE.todos.filter((todo) => !todo.completed),
      },
    });
    expect(wrapper.vm.$data.linkSelected).toBe("active");
  });

  test("property 'linkSelected' should have 'completed' value when route is '/completed'", () => {
    const $route = {
      path: "/completed",
      name: "completedTodos",
    };
    const wrapper = shallowMount(FooterComponent, {
      global: {
        mocks: {
          $route,
        },
        plugins: [store, router],
      },
      props: {
        todos: COMPLETED_STATE.todos,
      },
      computed: {
        getAllTodos: () => COMPLETED_STATE.todos,
        getCompletedTodos: () =>
          COMPLETED_STATE.todos.filter((todo) => todo.completed),
        getActiveTodos: () =>
          COMPLETED_STATE.todos.filter((todo) => !todo.completed),
      },
    });
    expect(wrapper.vm.$data.linkSelected).toBe("completed");
  });
});
