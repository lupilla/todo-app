import { shallowMount } from "@vue/test-utils";
import TodoList from "@/modules/todos/components/TodoList.vue";
import { INITIAL_STATE } from "../../../mocks/state.js";
import createVuexStore from "../../../mocks/mock-store.js";
import router from "@/router";
const store = createVuexStore();
const $route = {
  path: "/",
};
describe("TodoList tests", () => {
  let wrapper;

  beforeEach(async () => {
    jest.clearAllMocks();
    wrapper = await shallowMount(TodoList, {
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
        showCheckAllTodos: () => true,
        getCompletedLength: () => false,
      },
    });
  });

  test("TodoList Component should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("'selected' property should have a falsy value when all todos are not completed", () => {
    expect(wrapper.vm.$data.selected).toBe(false);
  });

  test("'changeTodosStatus' method should call 'changeCompletedTodos' action", async () => {
    const spyChangeTodosAction = jest.spyOn(wrapper.vm, "changeCompletedTodos");
    const checkAll = wrapper.find('[data-id-test="checkAll"]');
    await checkAll.trigger("click");
    expect(spyChangeTodosAction).toHaveBeenCalled();
  });

  test("'todos' property should have elements by default when todos are passed to the component", async () => {
    const todoItems = await wrapper.findAll("todo-item-stub");
    expect(wrapper.props("todos")).toEqual(INITIAL_STATE.todos);
    expect(todoItems.length).toBe(INITIAL_STATE.todos.length);
    expect(todoItems.length).toBe(wrapper.props("todos").length);
  });

  test("'todos' property should not have elements when todos are not passed to the component", async () => {
    const wrapper = await shallowMount(TodoList, {
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
        showCheckAllTodos: () => false,
        getCompletedLength: () => false,
      },
    });
    const todoItems = await wrapper.findAll("todo-item-stub");
    expect(wrapper.props("todos")).toEqual([]);
    expect(todoItems.length).toBe(wrapper.props("todos").length);
  });

  test("double click event should call 'changeEditMode' method", async () => {
    const spyChangeEditMode = jest.spyOn(wrapper.vm, "changeEditMode");
    const todoItemList = await wrapper.findAll('[data-id-test="edit"]');
    expect(todoItemList.length > 0).toBe(true);
    await todoItemList[1].trigger("dblclick");
    expect(spyChangeEditMode).toHaveBeenCalled();
  });
});
