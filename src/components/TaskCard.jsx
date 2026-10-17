import { memo, useCallback } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import { deleteTask } from "../reducer/actions.js";
import { getPriorityColor, formatDate } from "../utils/helpers.js";

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}
function TaskCard({ task, onEdit, onDragStart, onDragEnd, isDragging }) {
  const { dispatch, notify } = useTaskContext();

  const handleDelete = useCallback(() => {
    dispatch(deleteTask(task.id));
    notify(`Deleted "${task.title}"`);
  }, [dispatch, notify, task.id, task.title]);

  const handleEditClick = useCallback(() => {
    onEdit(task);
  }, [onEdit, task]);

  const handleDragStart = useCallback(
    (event) => {
      event.dataTransfer.setData("text/plain", task.id);
      event.dataTransfer.effectAllowed = "move";
      onDragStart(task.id);
    },
    [onDragStart, task.id]
  );

  return (
    <article
      className={`task-card ${isDragging ? "is-dragging" : ""}`}
      style={{ "--card-accent": getPriorityColor(task.priority) }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      aria-roledescription="Draggable task card"
    >
      <div className="task-card-top">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button type="button" onClick={handleEditClick} aria-label="Edit task">
            <EditIcon />
          </button>
          <button type="button" className="danger" onClick={handleDelete} aria-label="Delete task">
            <TrashIcon />
          </button>
        </div>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-card-bottom">
        <span
          className="priority-badge"
          style={{
            color: getPriorityColor(task.priority),
            background: `color-mix(in srgb, ${getPriorityColor(task.priority)} 16%, transparent)`,
          }}
        >
          {task.priority}
        </span>
        <span className="task-date">{formatDate(task.createdAt)}</span>
      </div>
    </article>
  );
}

export default memo(TaskCard);
