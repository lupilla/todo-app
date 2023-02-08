import { shallowMount } from "@vue/test-utils";
import createVuexStore from "../../../mocks/mock-store.js";
import TodoItem from "@/modules/todos/components/TodoItem.vue";
import {
  TODO,
  TODO_NOT_COMPLETED,
  TODO_EDITABLE,
  EDITED_TODO,
} from "../../../mocks/state.js";
const store = createVuexStore();

describe("TodoItem tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      global: {
        plugins: [store],
      },
      props: {
        todo: TODO,
      },
    });
  });
  test("TodoItem Component should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("TodoItem Component with isEditing property to false should show view option with edit layout hidden", () => {
    const view = wrapper.find('[data-id-test="view"]');
    const edit = wrapper.find('[data-id-test="edit"]');
    expect(view.isVisible()).toBe(true);
    expect(edit.isVisible()).toBe(false);
  });

  test("TodoItem Component with completed property to false should show a not checked input", () => {
    wrapper = shallowMount(TodoItem, {
      global: {
        plugins: [store],
      },
      props: {
        todo: TODO_NOT_COMPLETED,
      },
    });
    const inputCkecbox = wrapper.find('[data-id-test="completed"]');
    expect(inputCkecbox.element.checked).toBe(false);
  });

  test("TodoItem Component with completed property truthy should show a checked input", () => {
    const inputCkecbox = wrapper.find('[data-id-test="completed"]');
    expect(inputCkecbox.element.checked).toBe(true);
  });

  test("TodoItem Component with isEditing property truthy should show edit input", () => {
    wrapper = shallowMount(TodoItem, {
      global: {
        plugins: [store],
      },
      props: {
        todo: TODO_EDITABLE,
      },
    });
    const view = wrapper.find('[data-id-test="view"]');
    const edit = wrapper.find('[data-id-test="edit"]');
    expect(view.isVisible()).toBe(false);
    expect(edit.isVisible()).toBe(true);
  });

  test("'changeComplete' method should call 'changeComplete' method", async () => {
    const spyCheckTodo = jest.spyOn(wrapper.vm, "changeComplete");
    const inputCkecbox = wrapper.find('[data-id-test="completed"]');
    await inputCkecbox.trigger("click");
    expect(spyCheckTodo).toHaveBeenCalled();
  });
});

describe("Test edit mode", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      global: {
        plugins: [store],
      },
      props: {
        todo: TODO_EDITABLE,
      },
    });
  });
  test("on blur event should call 'editing' method and change 'name' property", async () => {
    const spyEdit = jest.spyOn(wrapper.vm, "editing");
    expect(wrapper.vm.$data.name).toBe("go to the library");
    expect(wrapper.vm.$data.oldName).toBe("go to the library");
    const input = wrapper.find('[data-id-test="edit"]');
    await input.setValue("hola");
    await input.trigger("blur");
    expect(wrapper.vm.$data.name).toBe("hola");
    expect(spyEdit).toHaveBeenCalled();
  });

  test("on enter keypress event should call 'edited' method and change 'name' property", async () => {
    expect(wrapper.vm.$data.name).toBe("go to the library");
    const input = wrapper.find('[data-id-test="edit"]');
    await input.setValue("hola");
    await input.trigger("keypress", {
      key: "enter",
    });
    expect(wrapper.vm.$data.name).toBe("hola");
  });

  test("on enter keypress with 'escape' key event should call 'stopEditing' method and not change 'name' property", async () => {
    const spyStopEdit = jest.spyOn(wrapper.vm, "stopEditing");
    expect(wrapper.vm.$data.name).toBe("go to the library");
    const input = wrapper.find('[data-id-test="edit"]');
    await input.setValue("hola");
    await input.trigger("keydown.esc");
    expect(wrapper.vm.$data.name).toBe("go to the library");
    expect(spyStopEdit).toHaveBeenCalled();
  });

  test("'changeComplete' method should emit 'changeStatus' custom event", async () => {
    const inputCkecbox = wrapper.find('[data-id-test="completed"]');
    await inputCkecbox.trigger("click");
    expect(wrapper.emitted("changeStatus")).toBeTruthy();
  });

  test("'editing' method should emit 'edit' custom event", async () => {
    await wrapper.setData({ name: "hola mundo" });
    await wrapper.vm.editing(TODO);
    expect(wrapper.emitted("edit")).toBeTruthy();
    expect(wrapper.emitted("edit")[0][0]).toEqual(EDITED_TODO);
  });

  test("'stopEditing' method should emit 'stopEdit' custom event", async () => {
    await wrapper.setData({ name: "hola mundo" });
    wrapper.vm.stopEditing(TODO);
    expect(wrapper.emitted("stopEdit")).toBeTruthy();
    expect(wrapper.emitted("stopEdit")[0][0]).toEqual(TODO);
  });
});
