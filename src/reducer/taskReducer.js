import {
  LOAD_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  MOVE_TASK,
  TOGGLE_THEME,
  SET_SEARCH,
  SET_PRIORITY_FILTER,
} from "./actions.js";

export function taskReducer(state, action) {
  switch (action.type) {
    case LOAD_TASKS: {
      return { ...state, ...action.payload };
    }

    case ADD_TASK: {
      return { ...state, tasks: [...state.tasks, action.payload] };
    }

    case UPDATE_TASK: {
      const updated = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === updated.id ? { ...task, ...updated } : task
        ),
      };
    }

    case DELETE_TASK: {
      const { id } = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== id),
      };
    }

    case MOVE_TASK: {
      const { id, status } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id
            ? task.status === status
              ? task 
              : { ...task, status }
            : task
        ),
      };
    }

    case TOGGLE_THEME: {
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    }

    case SET_SEARCH: {
      return { ...state, search: action.payload };
    }

    case SET_PRIORITY_FILTER: {
      return { ...state, priorityFilter: action.payload };
    }

    default:
      return state;
  }
}
