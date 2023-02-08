import { shallowMount } from "@vue/test-utils";
import TodoPage from "@/modules/todos/pages/TodoPage.vue";
import createVuexStore from "../../../mocks/mock-store.js";
import { INITIAL_STATE } from "../../../mocks/state";
import InputTodo from "@/modules/todos/components/InputTodo";
import TodoList from "@/modules/todos/components/TodoList";
import FooterComponent from "@/modules/todos/components/FooterComponent";
const store = createVuexStore();
describe("TodoPage tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoPage, {
      global: {
        plugins: [store],
      },
      computed: {
        todoList: () => INITIAL_STATE.todos,
      },
    });
  });
  test("should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should show the proper components when todo list has entries", () => {
    const inputTodo = wrapper.findComponent(InputTodo);
    const todoList = wrapper.findComponent(TodoList);
    const footerComponent = wrapper.findComponent(FooterComponent);
    expect(inputTodo.exists()).toBe(true);
    expect(todoList.exists()).toBe(true);
    expect(footerComponent.exists()).toBe(true);
  });

  test("should show the proper components when todo list has not entries", () => {
    wrapper = shallowMount(TodoPage, {
      global: {
        plugins: [store],
      },
      computed: {
        todoList: () => [],
      },
    });
    const inputTodo = wrapper.findComponent(InputTodo);
    const todoList = wrapper.findComponent(TodoList);
    const footerComponent = wrapper.findComponent(FooterComponent);
    expect(inputTodo.exists()).toBe(true);
    expect(todoList.exists()).toBe(true);
    expect(footerComponent.exists()).toBe(true);
  });

  test("should show a header with 'todos' text inside", () => {
    const header = wrapper.find('[data-id-test="header"]');
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe("todos");
  });
});

describe("TodoPage methods tests", () => {
  test("should call getTodos on mount hook", async () => {
    const wrapper = await shallowMount(TodoPage, {
      global: {
        plugins: [store],
      },
      computed: {
        todoList: () => INITIAL_STATE.todos,
      },
    });
    const spyGetTodos = jest.spyOn(wrapper.vm, "getTodos");
    const spyLoadTodos = jest.spyOn(wrapper.vm, "loadTodos");
    wrapper.vm.getTodos();
    expect(spyGetTodos).toHaveBeenCalled();
    expect(spyLoadTodos).toHaveBeenCalledTimes(1);
  });
});
