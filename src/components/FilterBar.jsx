import { useCallback } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import { setPriorityFilter } from "../reducer/actions.js";
import { PRIORITIES, getPriorityColor } from "../utils/helpers.js";

const OPTIONS = ["all", ...PRIORITIES];

export default function FilterBar() {
  const { state, dispatch } = useTaskContext();

  const handleSelect = useCallback(
    (priority) => {
      dispatch(setPriorityFilter(priority));
    },
    [dispatch]
  );

  return (
    <div className="filter-bar" role="group" aria-label="Filter by priority">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={`filter-chip ${state.priorityFilter === option ? "active" : ""}`}
          onClick={() => handleSelect(option)}
        >
          {option !== "all" && (
            <span
              className="dot"
              style={{ background: getPriorityColor(option) }}
            />
          )}
          {option === "all" ? "All priorities" : option}
        </button>
      ))}
    </div>
  );
}
