import { createStore } from "vuex";
import todos from "@/modules/todos/store/todos";
import { INITIAL_STATE } from "./state";

const createVuexStore = (initialState = INITIAL_STATE) =>
  createStore({
    modules: {
      todos: {
        ...todos,
        state: { ...initialState },
      },
    },
  });

export default createVuexStore;
