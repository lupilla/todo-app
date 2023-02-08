/**
 * Mutation that creates a todo in the store
 * @param {Object} state: general object state of the application
 * @param {Object} todo: task to add in the collection of todos
 */
export const addTodo = (state, todo) => {
  const newTodo = { ...todo, isEditing: false };
  state.todos = [newTodo, ...state.todos];
};

/**
 * Mutation that changes the status of aprovided todo
 * @param {Object} state: general object state of the application
 * @param {Object} todo: task or todo to update
 */
export const changeCompleteTodo = (state, todo) => {
  const index = state.todos.map((_todo) => _todo.id).indexOf(todo.id);
  state.todos[index].completed = !todo.completed;
};

/**
 * Mutation that changes the editable status of all todos in the store
 * @param {Object} state: general object state of the application
 * @param {Boolean} status: status to change the todos collection
 */
export const changeCompletedTodos = (state, status) => {
  state.todos.map((todo) => (todo.completed = status));
};

/**
 * Mutation that changes the status of a provided todo
 * changing the "isEditing" property of this specific todo
 * @param {Object} state: general object state of the application
 * @param {Object} todo: task or todo to change the editing mode
 */
export const changeEditableTodo = (state, todo) => {
  const index = state.todos.map((_todo) => _todo.id).indexOf(todo.id);
  state.todos[index].isEditing = !todo.isEditing;
};

/**
 * Mutation that changes the status of all todos to a non-editable mode,
 * changing the "isEditing" property of each todo
 * @param {Object} state: general object state of the application
 */
export const changeEditableTodos = (state) => {
  state.todos.map((todo) => (todo.isEditing = false));
};

/**
 * Mutation that removes the completed tasks
 * @param {Object} state: general object state of the application
 */
export const deleteCompletedTodos = (state) => {
  let todos = state.todos.filter((todo) => {
    return !todo.completed;
  });
  state.todos = [...todos];
};

/**
 * Mutation that removes a provided todo in the store
 * @param {Object} state: general object state of the application
 * @param {String} id: id from the todo to delete in the store
 */
export const deleteTodo = (state, id) => {
  state.todos = state.todos.filter((todo) => todo.id !== id);
};

/**
 * Mutation that sets a collection of todos in the store
 * @param {Object} state: general object state of the application
 * @param {Object} todos: todos to include in the store
 */
export const setTodos = (state, todos) => {
  state.todos = [...state.todos, ...todos];
};

/**
 * Mutation that updates an entire todo in the store
 * @param {Object} state: general object state of the application
 * @param {Object} todo: task to update in the collection of todos
 */
export const updateTodo = (state, todo) => {
  const index = state.todos.map((_todo) => _todo.id).indexOf(todo.id);
  state.todos[index] = todo;
};
