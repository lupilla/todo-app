import { INITIAL_STATE, TODO, CHANGE_TODO } from "../../../mocks/state";
import createVuexStore from "../../../mocks/mock-store.js";

describe("Todo store tests", () => {
  describe("State tests", () => {
    test("default state should be OK", () => {
      const store = createVuexStore();
      const { todos } = store.state.todos;
      expect(todos).toEqual(INITIAL_STATE.todos);
    });
  });

  describe("Getters tests", () => {
    test("allTodos should return all todos", () => {
      const store = createVuexStore();
      const allTodos = store.getters["todos/allTodos"];
      expect(allTodos.length).toBe(INITIAL_STATE.todos.length);
      expect(allTodos).toEqual(INITIAL_STATE.todos);
    });

    test("activeTodos should return only active todos", () => {
      const store = createVuexStore();
      const activeTodos = store.getters["todos/activeTodos"];
      const mockActiveTodos = INITIAL_STATE.todos.filter(
        (todo) => todo.completed === false
      );
      expect(mockActiveTodos.length).toBe(2);
      expect(activeTodos).toEqual(mockActiveTodos);
    });

    test("completedTodos should return only completed todos", () => {
      const store = createVuexStore();
      const completedTodos = store.getters["todos/completedTodos"];
      const mockCompletedTodos = INITIAL_STATE.todos.filter(
        (todo) => todo.completed
      );
      expect(completedTodos.length).toBe(1);
      expect(completedTodos).toEqual(mockCompletedTodos);
    });
  });

  describe("Mutations tests", () => {
    test("Mutation 'setTodos' should be executed properly", () => {
      const store = createVuexStore({ todos: [] });
      store.commit("todos/setTodos", INITIAL_STATE.todos);
      expect(store.state.todos.todos.length).toBe(INITIAL_STATE.todos.length);
    });

    test("Mutation 'updateTodo' should update a provided todo properly", () => {
      const store = createVuexStore();
      store.commit("todos/updateTodo", TODO);
      const storeTodos = store.state.todos.todos;
      expect(storeTodos.length).toBe(INITIAL_STATE.todos.length);
      expect(storeTodos.find((todo) => todo.id === TODO.id)).toEqual(TODO);
    });

    test("Mutation 'addTodo' should add a provided todo properly", () => {
      const store = createVuexStore({ todos: [] });
      store.commit("todos/addTodo", TODO);
      const storeTodos = store.state.todos.todos;
      expect(storeTodos.length).toBe(1);
      const addedTodo = storeTodos.find((todo) => todo.id === TODO.id);
      expect(addedTodo).toBeTruthy();
      expect(addedTodo).toEqual(TODO);
    });

    test("Mutation 'deleteTodo' should delete a provided todo properly", () => {
      const store = createVuexStore();
      store.commit("todos/deleteTodo", TODO.id);
      const storeTodos = store.state.todos.todos;
      expect(storeTodos.length).toBe(INITIAL_STATE.todos.length - 1);
      const deletedTodo = storeTodos.find((todo) => todo.id === TODO.id);
      expect(deletedTodo).toBeFalsy();
    });

    test("Mutation 'changeCompleteTodo' should change the status of a provided todo properly", () => {
      const store = createVuexStore();
      store.commit("todos/changeCompleteTodo", CHANGE_TODO);
      const storeTodos = store.state.todos.todos;
      const changedTodo = storeTodos.find((todo) => todo.id === CHANGE_TODO.id);
      expect(changedTodo.completed).toBe(!CHANGE_TODO.completed);
    });

    test("Mutation 'changeCompletedTodos' should change all statuses to true of the todos stored", () => {
      const store = createVuexStore();
      store.commit("todos/changeCompletedTodos", true);
      const storeTodos = store.state.todos.todos;
      const changedTodos = storeTodos.filter((todo) => todo.completed);
      expect(changedTodos.length).toBe(INITIAL_STATE.todos.length);
    });

    test("Mutation 'changeCompletedTodos' should change all statuses to false of the todos stored", () => {
      const store = createVuexStore();
      store.commit("todos/changeCompletedTodos", false);
      const storeTodos = store.state.todos.todos;
      const changedTodos = storeTodos.filter((todo) => todo.completed);
      expect(changedTodos.length).toBe(0);
    });

    test("Mutation 'changeEditableTodo' should change the editable status of a provided todo properly", () => {
      const store = createVuexStore();
      store.commit("todos/changeEditableTodo", CHANGE_TODO);
      const storeTodos = store.state.todos.todos;
      const changedTodo = storeTodos.find((todo) => todo.id === CHANGE_TODO.id);
      expect(changedTodo.isEditing).toBe(!CHANGE_TODO.isEditing);
    });

    test("Mutation 'changeEditableTodos' should change all editable status to false of the todos stored", () => {
      const store = createVuexStore();
      store.commit("todos/changeEditableTodos");
      const storeTodos = store.state.todos.todos;
      const changedTodos = storeTodos.filter((todo) => todo.isEditing);
      expect(changedTodos.length).toBe(0);
    });

    test("Mutation 'deleteCompletedTodos' should remove all completed todos", () => {
      const store = createVuexStore();
      store.commit("todos/deleteCompletedTodos");
      const storeTodos = store.state.todos.todos;
      const changedTodos = storeTodos.filter((todo) => todo.completed);
      expect(changedTodos.length).toBe(0);
    });
  });
});
