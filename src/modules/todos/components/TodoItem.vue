<template>
  <div class="view" v-show="!isEditing" data-id-test="view">
    <input
      :id="todo.id"
      data-id-test="completed"
      type="checkbox"
      class="toggle"
      aria-label="Check as completed"
      @click="changeComplete(todo)"
      :checked="isChecked"
    />
    <label :for="todo.id" data-id-test="label"> {{ todo.name }}</label>
    <button
      data-id-test="remove"
      type="button"
      class="destroy"
      @click="remove(todo)"
    ></button>
  </div>

  <input
    v-show="isEditing"
    data-id-test="edit"
    class="edit"
    ref="edit"
    type="text"
    aria-label="Edit a Todo"
    @blur="editing(todo)"
    @keyup.enter="editing(todo)"
    @keydown.esc="stopEditing(todo)"
    v-model="name"
  />
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "TodoItem",
  data() {
    return {
      name: "",
      oldName: "",
    };
  },
  computed: {
    isChecked() {
      return this.todo.completed;
    },
    isEditing() {
      return this.todo.isEditing;
    },
  },
  emits: ["changeStatus", "edit", "stopEdit"],
  props: {
    todo: Object,
  },
  methods: {
    ...mapActions("todos", ["deleteTodo", "changeCompleteTodo"]),
    async changeComplete(todo) {
      this.$emit("changeStatus", todo);
    },
    async editing(todo) {
      if (this.name) {
        try {
          const _todo = { ...todo, name: this.name };
          this.$emit("edit", _todo);
          this.oldName = this.name;
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await this.deleteTodo(todo);
        } catch (error) {
          console.error(error);
        }
      }
    },
    async remove(todo) {
      try {
        await this.deleteTodo(todo);
      } catch (error) {
        console.error(error);
      }
    },
    stopEditing(todo) {
      this.$emit("stopEdit", todo);
      this.name = this.oldName;
    },
  },
  mounted() {
    this.name = this.todo.name;
    this.oldName = this.name;
  },
  updated() {
    if (this.todo.isEditing) {
      this.$refs.edit.focus();
    }
  },
};
</script>
<style scoped lang="scss">
.edit {
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
.toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;
}

.toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}

.toggle + label {
  /*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}
.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}
.destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.destroy:hover {
  color: #af5b5e;
}

.destroy:after {
  content: "×";
}

.edit {
  display: none;
}
</style>
