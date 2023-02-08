# todo-app

This app is a `todo app` under the **SPA paradigm**.\
It is implemented with Vuejs, Vuex and a backend with persistence on reload with firebase.\
It has a public database in firebase for 30 days.\
The app has a router configuration for filtering with 3 main routes:

- `allTodos` (default route: "/")
  
- `activeTodos` (route: "/active")

- `completedTodos` (route: "/completed")

The application shows a `404 page error` with routes that not match with the three commented routes.

A store is implemented inside the app to manage the todos state in a module with state, getters, mutations and actions included.\
The app makes use of vuex via mapActions and mapGetters to access to the state in the store.\
A CRUD services for create, update or delete and HTTP client by axios are included too for the development.\

It has a main page named `TodoPage`.\
In this main page we can find the title of the app and the main components: InputTodo, TodoList and FooterComponent.\
The css styles provided are splitted in components for better performance.\
The name of the task and te status (complete or not complete) are saved in firebase database for persistence.\

The components included are these ones:

- `Footer component`: with filters and some information about the tasks and a button for clear completed todos.

- `Input component` for creating tasks: main component to provide the name of the new task.

- `Todo list`: with inputs to set the status of the todo and an editing mode with an input to edit the task.

- `Todo item`: for each element in the list, it's an inner component of the todo list component.

Unit tests are included with `jest`.\
Mocks needed for tests are included in tests directory.\
The following elements have unit tests:

| File (name)           | Directory/ type  |
| --------------------- | ---------------  |
| `todosApi`            | `api`            |
| `FooterComponent`     | `components`     |
| `InputTodo`           | `components`     |
| `TodoItem`            | `components`     |
| `TodoList`            | `components`     |
| `TodoPage`            | `pages`          |
| `todo-store`          | `store`          |
| `index`               | `router`         |
| `App`                 | `:root`          |

This tests could be thrown separately using these names of file (e.g., we can throw a test typing `yarn test:unit TodoList` command).\
The tests of store have unit tests of getters, mutations and state.

* * *

## Dependencies included in this project by version

The following dependencies have been used for the development of this application

| Dependence            | Version    |
| --------------------- | ---------- |
| `Axios`               | `0.27.2`   |
| `Vue`                 | `3.2.13`   |
| `Vue-router`          | `4.0.3`    |
| `Vuex`                | `4.0.0`    |
| `Prettier (lintern)`  | `2.4.1`    |
| `Jest`                | `27.0.5`   |
| `@vue/test-utils`     | `2.0.0`    |

* * *

## Project setup

This project uses `yarn` as a package manager, so you can use yarn commands for setup or running project options:

```javascript
yarn install
```

### Compiles and hot-reloads for development

```javascript
yarn serve
```

### Compiles and minifies for production

```javascript
yarn build
```

### Run your unit tests

```javascript
yarn test:unit
```

### Lints and fixes files

```javascript
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
