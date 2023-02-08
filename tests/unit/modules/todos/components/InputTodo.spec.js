import { shallowMount } from "@vue/test-utils";
import InputTodo from "@/modules/todos/components/InputTodo.vue";
import createVuexStore from "../../../mocks/mock-store.js";
const store = createVuexStore();

describe("InputTodo tests", () => {
  let wrapper;
  let addNewTodo;

  beforeEach(() => {
    wrapper = shallowMount(InputTodo, {
      global: {
        plugins: [store],
      },
    });
  });
  test("should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should not call 'addTodo' method when writing in input and enter is not pressed", async () => {
    const input = wrapper.find('[data-id-test="input"]');
    addNewTodo = jest.spyOn(wrapper.vm, "addNewTodo");
    await input.setValue("go for a walk");
    expect(addNewTodo).not.toHaveBeenCalled();
  });

  test("should call 'addTodo' event when writing in input and enter is pressed", async () => {
    const input = wrapper.find('[data-id-test="input"]');
    addNewTodo = jest.spyOn(wrapper.vm, "addNewTodo");
    await input.setValue("go to the library");
    await input.trigger("keypress", {
      key: "enter",
    });
    expect(addNewTodo).toHaveBeenCalled();
  });

  test("'name' property should have a value when some text is written", async () => {
    const text = "cook a cheese cake";
    const input = wrapper.find('[data-id-test="input"]');
    await input.setValue(text);
    expect(wrapper.vm.$data.name).toBe(text);
  });

  test("'name' property should have an empty value by default", async () => {
    expect(wrapper.vm.$data.name).toBe("");
  });

  test("name property should not have a value when input is empty and enter is pressed", async () => {
    const input = wrapper.find('[data-id-test="input"]');
    await input.setValue("");
    await input.trigger("keypress", {
      key: "enter",
    });
    expect(wrapper.vm.$data.name).toBe("");
  });

  test("addTodo should not have been called if name property is empty", async () => {
    const addTodoSpy = jest.spyOn(wrapper.vm, "addTodo");
    const input = wrapper.find('[data-id-test="input"]');
    await input.setValue("");
    await input.trigger("keypress", {
      key: "enter",
    });
    expect(addTodoSpy).not.toHaveBeenCalled();
  });
});
