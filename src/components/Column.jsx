import { memo, useMemo, useState, useCallback } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import { moveTask } from "../reducer/actions.js";
import { filterTasksForColumn } from "../utils/helpers.js";
import TaskCard from "./TaskCard.jsx";
import EmptyState from "./EmptyState.jsx";

const DOT_CLASS = {
  todo: "column-dot--todo",
  "in-progress": "column-dot--in-progress",
  done: "column-dot--done",
};

function Column({ id, status, label, draggingId, onDragStart, onDragEnd, onEdit }) {
  const { state, dispatch, notify } = useTaskContext();
  const [isOver, setIsOver] = useState(false);
  const columnTasks = useMemo(
    () => filterTasksForColumn(state.tasks, status, state.search, state.priorityFilter),
    [state.tasks, status, state.search, state.priorityFilter]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setIsOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsOver(false);
      const taskId = event.dataTransfer.getData("text/plain");
      if (!taskId) return;

      const task = state.tasks.find((t) => t.id === taskId);
      if (!task || task.status === status) return;

      dispatch(moveTask(taskId, status));
      notify(`Moved "${task.title}" to ${status}`);
    },
    [dispatch, notify, state.tasks, status]
  );

  const isEmpty = columnTasks.length === 0;

  return (
    <section
      className={`column ${isOver ? "is-drop-target" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={`${label} column`}
    >
      <div className="column-header">
        <div className="column-header-left">
          <span className={`column-dot ${DOT_CLASS[id]}`} />
          <h2 className="column-title">{label}</h2>
        </div>
        <span className="column-count">{columnTasks.length}</span>
      </div>

      {isOver && <div className="drop-indicator" aria-hidden="true" />}

      <div className="column-list">
        {isEmpty ? (
          <EmptyState
            message={
              state.search || state.priorityFilter !== "all"
                ? "No tasks match your filters."
                : "Drop a task here or add a new one."
            }
          />
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isDragging={draggingId === task.id}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default memo(Column);
