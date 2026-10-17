import { useCallback } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import { setSearch } from "../reducer/actions.js";

export default function SearchBar() {
  const { state, dispatch } = useTaskContext();

  const handleChange = useCallback(
    (event) => {
      dispatch(setSearch(event.target.value));
    },
    [dispatch]
  );

  return (
    <div className="search-bar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={state.search}
        onChange={handleChange}
        placeholder="Search tasks by title or description…"
        aria-label="Search tasks"
      />
    </div>
  );
}
