<template>
  <main id="main" class="main" v-if="showCheckAllTodos">
    <div>
      <input
        id="checkAll"
        type="checkbox"
        class="toggle-all"
        data-id-test="checkAll"
        aria-label="Check all Todos"
        @click="changeTodosStatus"
        v-model="selected"
      />
      <label for="checkAll"></label>
    </div>
    <ul class="todo-list">
      <li
        v-for="todo in todos"
        :key="todo.id"
        data-id-test="edit"
        :class="[{ editing: todo.isEditing }, { completed: todo.completed }]"
        @dblclick="changeEditMode(todo)"
      >
        <TodoItem
          :todo="todo"
          @edit="editTodo"
          @change-status="changeTodoStatus(todo)"
          @stop-edit="stopEditing(todo)"
        ></TodoItem>
      </li>
    </ul>
  </main>
</template>
<script>
import TodoItem from "@/modules/todos/components/TodoItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TodoList",
  data() {
    return {
      selected: false,
    };
  },
  components: {
    TodoItem,
  },
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions("todos", [
      "updateTodo",
      "changeCompleteTodo",
      "changeCompletedTodos",
      "changeEditableTodo",
      "changeEditableTodos",
    ]),
    async changeEditMode(todo) {
      await this.changeEditableTodo(todo);
    },
    async changeTodosStatus() {
      this.selected = !this.selected;
      try {
        await this.changeCompletedTodos(this.selected);
      } catch (error) {
        console.error(error);
      }
    },
    async changeTodoStatus(todo) {
      try {
        await this.changeCompleteTodo(todo);
        this.statusChanged();
      } catch (error) {
        console.error(error);
      }
    },
    async stopEditing(todo) {
      await this.changeEditableTodo(todo);
    },
    async editTodo(todo) {
      try {
        await this.updateTodo(todo);
        await this.changeEditableTodos();
        this.statusChanged();
      } catch (error) {
        console.error(error);
      }
    },
    statusChanged() {
      if (this.$route.name === "allTodos" && this.getCompletedLength) {
        this.selected = true;
      } else if (this.$route.name === "activeTodos") {
        this.selected = false;
      } else if (this.$route.name === "completedTodos") {
        this.selected = true;
      } else {
        this.selected = false;
      }
    },
  },
  computed: {
    ...mapGetters("todos", ["completedTodos"]),
    showCheckAllTodos() {
      return this.todos.length > 0;
    },
    getCompletedLength() {
      return this.completedTodos.length === this.todos.length;
    },
  },
  watch: {
    "$route.name": {
      handler: function () {
        if (this.todos) {
          this.statusChanged();
        }
      },
      deep: true,
      immediate: true,
    },
    todos: {
      handler: function () {
        if (this.todos) {
          this.statusChanged();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style>
.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

.todo-list li:hover .destroy {
  display: block;
}

.toggle-all {
  text-align: center;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }
}
</style>
