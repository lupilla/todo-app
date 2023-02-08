<template>
  <div id="newTodo">
    <input
      type="text"
      class="new-todo"
      v-model="name"
      autofocus
      placeholder="new todo..."
      aria-label="Add a new Todo"
      data-id-test="input"
      @keypress.enter="addNewTodo"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "InputTodo",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    ...mapActions("todos", ["addTodo"]),
    async addNewTodo() {
      if (this.name) {
        try {
          await this.addTodo(this.name);
          this.name = "";
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.new-todo {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
