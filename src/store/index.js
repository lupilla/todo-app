import { createStore } from "vuex";
import todos from "@/modules/todos/store/todos";

/**
 * This method creates the global store
 * It includes the todo module store with actions, getters and mutations from the todo module
 * @param {Object} modules: modules of the store
 */
const store = createStore({
  modules: {
    todos,
  },
});

export default store;
