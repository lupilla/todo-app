/**
 * this getter provides all todos stored in the store
 * @param {Object} state: state global object for getting the todos stored in it
 */
export const allTodos = (state) => state.todos;

/**
 * this getter provides only active todos stored in the store
 * @param {Object} state: state global object for getting the todos stored in it
 */
export const activeTodos = (state) => {
  return state.todos.filter((todo) => {
    return !todo.completed;
  });
};

/**
 * this getter provides only completed todos stored in the store
 * @param {Object} state: state global object for getting the todos stored in it
 */
export const completedTodos = (state) => {
  return state.todos.filter((todo) => {
    return todo.completed;
  });
};
