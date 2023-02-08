<template>
  <div id="todo-page">
    <h1 data-id-test="header">todos</h1>
    <InputTodo></InputTodo>
    <TodoList :todos="todoList"></TodoList>
    <FooterComponent :todos="todoList"></FooterComponent>
  </div>
</template>
<script>
import InputTodo from "@/modules/todos/components/InputTodo.vue";
import TodoList from "@/modules/todos/components/TodoList.vue";
import FooterComponent from "@/modules/todos/components/FooterComponent.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TodoPage",
  components: {
    InputTodo,
    TodoList,
    FooterComponent,
  },
  computed: {
    ...mapGetters("todos", ["allTodos", "activeTodos", "completedTodos"]),
    todoList() {
      return this[this.$route.name];
    },
  },
  methods: {
    ...mapActions("todos", ["loadTodos", "addTodo"]),
    async getTodos() {
      try {
        await this.loadTodos();
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getTodos();
  },
};
</script>

<style scoped lang="scss">
h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
</style>
