import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { taskReducer } from "../reducer/taskReducer.js";
import { initialState } from "../reducer/initialState.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const STORAGE_KEY = "prodesk-kanban-state";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [persisted, persist] = useLocalStorage(STORAGE_KEY, initialState);
  const [state, dispatch] = useReducer(taskReducer, persisted);
  useEffect(() => {
    persist(state);
  }, [state, persist]);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const notify = useCallback((message) => {
    setToast({ id: Date.now(), message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const value = useMemo(
    () => ({ state, dispatch, notify, toast }),
    [state, notify, toast]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return ctx;
}
