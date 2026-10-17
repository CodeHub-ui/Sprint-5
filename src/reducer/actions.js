export const LOAD_TASKS = "LOAD_TASKS";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const MOVE_TASK = "MOVE_TASK";
export const TOGGLE_THEME = "TOGGLE_THEME";
export const SET_SEARCH = "SET_SEARCH";
export const SET_PRIORITY_FILTER = "SET_PRIORITY_FILTER";

export const loadTasks = (state) => ({ type: LOAD_TASKS, payload: state });

export const addTask = (task) => ({ type: ADD_TASK, payload: task });

export const updateTask = (task) => ({ type: UPDATE_TASK, payload: task });

export const deleteTask = (id) => ({ type: DELETE_TASK, payload: { id } });

export const moveTask = (id, status) => ({
  type: MOVE_TASK,
  payload: { id, status },
});

export const toggleTheme = () => ({ type: TOGGLE_THEME });

export const setSearch = (query) => ({ type: SET_SEARCH, payload: query });

export const setPriorityFilter = (priority) => ({
  type: SET_PRIORITY_FILTER,
  payload: priority,
});
