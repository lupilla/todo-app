import todosApi from "@/api/todosApi.js";
/**
 * Public baseURL from firebase imported from todosApi:
 * https://todos-app-a27eb-default-rtdb.europe-west1.firebasedatabase.app/
 */

/**
 * this action makes a GET request to bring todos from firebase database
 * @param {Object} commit: method to execute the mutation "setTodos"
 */
export const loadTodos = async ({ commit }) => {
  try {
    const { data } = await todosApi.get("/todos.json");
    if (!data) {
      commit("setTodos", []);
      return;
    }
    const todos = [];
    for (let id of Object.keys(data)) {
      todos.push({
        id,
        ...data[id],
      });
    }
    commit("setTodos", todos);
  } catch (error) {
    throw new Error("An error ocurred when loading todos");
  }
};

/**
 * this action makes a POST request to add a new todo to firebase database
 * @param {Object} commit: method to execute the mutation "addTodo"
 * @param {String} name: name of the new todo to add to the database
 */
export const addTodo = async ({ commit }, name) => {
  try {
    const dataToAdd = { name, completed: false };
    const response = await todosApi.post("/todos.json", dataToAdd);
    dataToAdd.id = response.data.name;
    commit("addTodo", dataToAdd);
  } catch (error) {
    throw new Error("An error ocurred when adding todos");
  }
};

/**
 * this action makes a PATCH request to modify a todo to firebase database
 * @param {Object} commit: method to execute the mutation "updateTodo"
 * @param {Object} todo: object to update in the database
 */
export const updateTodo = async ({ commit }, todo) => {
  try {
    await todosApi.patch(`/todos/${todo.id}.json`, { name: todo.name });
    commit("updateTodo", todo);
  } catch (error) {
    throw new Error("An error ocurred when updating todos");
  }
};

/**
 * this action makes a PATCH request to modify the status of a todo in database
 * It changes with PATCH method only the status (to completed or not completed)
 * @param {Object} commit: method to execute the mutation "changeCompleteTodo"
 * @param {Object} todo: object to modify in the database
 */
export const changeCompleteTodo = async ({ commit }, todo) => {
  try {
    await todosApi.patch(`/todos/${todo.id}.json`, {
      completed: !todo.completed,
    });
    commit("changeCompleteTodo", todo);
  } catch (error) {
    throw new Error("An error ocurred when changing todo status");
  }
};

/**
 * this action makes a PATCH request to modify each status of all todos in database
 * @param {Object} commit: method to execute the mutation "changeCompletedTodos"
 * @param {Object} state: state global object for getting the todos stored in it
 * @param {Object} status: final status used for the change
 */
export const changeCompletedTodos = async ({ state, commit }, status) => {
  try {
    const todos = state.todos;
    todos.forEach((todo) => {
      todosApi.patch(`/todos/${todo.id}.json`, { completed: status });
    });
    commit("changeCompletedTodos", status);
  } catch (error) {
    throw new Error("An error ocurred when changing todos status");
  }
};

/**
 * this action makes a DELETE request to remove a todo in database
 * @param {Object} commit: method to execute the mutation "deleteTodo"
 * @param {Object} todo: object to remove in the database
 */
export const deleteTodo = async ({ commit }, todo) => {
  try {
    const id = todo.id;
    await todosApi.delete(`/todos/${id}.json`);
    commit("deleteTodo", id);
    return id;
  } catch (error) {
    throw new Error("An error ocurred when deleting todo");
  }
};

/**
 * this action changes all the editable properties in the collection of todos
 * It is used to exit from the editable mode in the user interface
 * @param {Object} commit: method to execute the mutation "changeEditableTodos"
 */
export const changeEditableTodos = async ({ commit }) => {
  commit("changeEditableTodos");
};

/**
 * this action changes the editable property of a provided todo in the store
 * It is used to exit or enter in the editable mode in the user interface
 * @param {Object} commit: method to execute the mutation "changeEditableTodo"
 * @param {Object} todo: object to chenge in the store
 */
export const changeEditableTodo = async ({ commit }, todo) => {
  commit("changeEditableTodo", todo);
};

/**
 * this action removes in the database all todos that are not completed with DELETE method
 * @param {Object} commit: method to execute the mutation "deleteCompletedTodos"
 * @param {Object} state: state global object for getting the todos stored in it
 */
export const deleteCompletedTodos = async ({ state, commit }) => {
  try {
    const todos = state.todos;
    todos.forEach((todo) => {
      if (todo.completed) {
        todosApi.delete(`/todos/${todo.id}.json`);
      }
    });
    commit("deleteCompletedTodos");
  } catch (error) {
    throw new Error("An error ocurred when deleting completed todos");
  }
};
