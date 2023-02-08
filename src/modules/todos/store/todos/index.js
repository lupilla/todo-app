import state from "./state";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

/**
 * Module object of todo store state
 * This module contains actions, getters, mutations and state
 */
const todosModule = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default todosModule;
