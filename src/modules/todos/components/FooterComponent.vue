<template>
  <footer class="footer" v-if="getAllTodos">
    <div class="todo-count">
      <strong v-if="getActiveTodos === 1">
        {{ getActiveTodos }} item left
      </strong>
      <strong v-else> {{ getActiveTodos }} items left </strong>
    </div>
    <ul class="filters">
      <li>
        <router-link
          :data-id-test="ALL"
          to="/"
          @click="selectedEvent(ALL)"
          :class="{ selected: linkSelected === ALL }"
        >
          All
        </router-link>
        <router-link
          :data-id-test="ACTIVE"
          :to="`/${ACTIVE}`"
          @click="selectedEvent(ACTIVE)"
          :class="{ selected: linkSelected === ACTIVE }"
        >
          Active
        </router-link>
        <router-link
          :data-id-test="COMPLETED"
          :to="`/${COMPLETED}`"
          @click="selectedEvent(COMPLETED)"
          :class="{ selected: linkSelected === COMPLETED }"
        >
          Completed
        </router-link>
      </li>
    </ul>
    <button
      type="button"
      data-id-test="remove"
      class="clear-completed"
      @click="removeTodos"
      v-if="getCompletedTodos"
    >
      Clear completed
    </button>
  </footer>
</template>
<script>
import { ALL, COMPLETED, ACTIVE } from "@/modules/todos/helpers/constants.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "FooterComponent",
  data() {
    return {
      linkSelected: ALL,
    };
  },
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters("todos", ["allTodos", "activeTodos", "completedTodos"]),
    getActiveTodos() {
      return this.activeTodos?.length;
    },
    getCompletedTodos() {
      return this.completedTodos?.length;
    },
    getAllTodos() {
      return this.allTodos?.length;
    },
  },
  methods: {
    ...mapActions("todos", ["deleteCompletedTodos"]),
    async removeTodos() {
      try {
        await this.deleteCompletedTodos();
      } catch (error) {
        console.error(error);
      }
    },
    selectedEvent(todoLink) {
      this.linkSelected = todoLink;
    },
  },
  created() {
    this.ALL = ALL;
    this.ACTIVE = ACTIVE;
    this.COMPLETED = COMPLETED;
  },
  mounted() {
    if (this.$route.path === "/") {
      this.linkSelected = ALL;
    } else {
      this.linkSelected = this.$route.path.substring(1);
    }
  },
};
</script>
<style>
.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
.clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filters {
    bottom: 10px;
  }
}
</style>
