export const INITIAL_STATE = {
  todos: [
    {
      id: "-N0yGtCoVxtQyt39fNqF",
      name: "go to the library",
      completed: false,
      isEditing: false,
    },
    {
      id: "-N0yWX2HtsbkDP1tuzf0",
      name: "telephone the dentist",
      completed: false,
      isEditing: false,
    },
    {
      id: "-N0yrr6EsGVhjxZd2NsD",
      name: "go to Mary's party",
      completed: true,
      isEditing: false,
    },
  ],
};

export const ACTIVE_STATE = {
  todos: [
    {
      id: "-N0yGtCoVxtQyt39fNqF",
      name: "go to the library",
      completed: false,
      isEditing: false,
    },
    {
      id: "-N0yWX2HtsbkDP1tuzf0",
      name: "telephone the dentist",
      completed: false,
      isEditing: false,
    },
    {
      id: "-N0yrr6EsGVhjxZd2NsD",
      name: "go to Mary's party",
      completed: false,
      isEditing: false,
    },
  ],
};

export const COMPLETED_STATE = {
  todos: [
    {
      id: "-N0yGtCoVxtQyt39fNqF",
      name: "go to the library",
      completed: true,
      isEditing: false,
    },
    {
      id: "-N0yWX2HtsbkDP1tuzf0",
      name: "telephone the dentist",
      completed: true,
      isEditing: false,
    },
    {
      id: "-N0yrr6EsGVhjxZd2NsD",
      name: "go to Mary's party",
      completed: true,
      isEditing: false,
    },
  ],
};

export const TODO = {
  id: "-N0yGtCoVxtQyt39fNqF",
  name: "go to the library",
  completed: true,
  isEditing: false,
};

export const TODO_NOT_COMPLETED = {
  id: "-N0yGtCoVxtQyt39fNqF",
  name: "go to the library",
  completed: false,
  isEditing: false,
};

export const TODO_EDITABLE = {
  id: "-N0yGtCoVxtQyt39fNqF",
  name: "go to the library",
  completed: false,
  isEditing: true,
};

export const CHANGE_TODO = {
  id: "-N0yrr6EsGVhjxZd2NsD",
  name: "go to Mary's party",
  completed: true,
  isEditing: false,
};

export const EDITED_TODO = {
  completed: true,
  id: "-N0yGtCoVxtQyt39fNqF",
  isEditing: false,
  name: "hola mundo",
};
