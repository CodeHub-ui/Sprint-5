import { useState, useCallback, useRef, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import { addTask, updateTask } from "../reducer/actions.js";
import { generateId, PRIORITIES, COLUMNS } from "../utils/helpers.js";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function AddTaskModal({ mode, task, defaultStatus, onClose }) {
  const { dispatch, notify } = useTaskContext();
  const isEdit = mode === "edit";

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState(task?.priority ?? "Medium");
  const [status, setStatus] = useState(task?.status ?? defaultStatus ?? "To Do");
  const titleInputRef = useRef(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        titleInputRef.current?.focus();
        return;
      }

      if (isEdit) {
        dispatch(
          updateTask({ ...task, title: trimmedTitle, description: description.trim(), priority, status })
        );
        notify(`Updated "${trimmedTitle}"`);
      } else {
        dispatch(
          addTask({
            id: generateId(),
            title: trimmedTitle,
            description: description.trim(),
            priority,
            status,
            createdAt: new Date().toISOString(),
          })
        );
        notify(`Added "${trimmedTitle}" to ${status}`);
      }
      onClose();
    },
    [dispatch, notify, onClose, title, description, priority, status, isEdit, task]
  );

  const handleOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="presentation">
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 id="modal-title">{isEdit ? "Edit task" : "Add a new task"}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Reimage marketing laptop"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any useful detail…"
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-status">Column</label>
              <select id="task-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.status}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
