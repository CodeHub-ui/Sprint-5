export const COLUMNS = [
  { id: "todo", status: "To Do", label: "To Do" },
  { id: "in-progress", status: "In Progress", label: "In Progress" },
  { id: "done", status: "Done", label: "Done" },
];

export const PRIORITIES = ["High", "Medium", "Low"];

export function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getPriorityColor(priority) {
  switch (priority) {
    case "High":
      return "var(--priority-high)";
    case "Medium":
      return "var(--priority-medium)";
    case "Low":
      return "var(--priority-low)";
    default:
      return "var(--text-muted)";
  }
}

export function formatDate(isoString) {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  } catch {
    return "";
  }
}

export function filterTasksForColumn(tasks, status, search, priorityFilter) {
  const query = search.trim().toLowerCase();

  return tasks.filter((task) => {
    if (task.status !== status) return false;

    if (priorityFilter !== "all" && task.priority !== priorityFilter) {
      return false;
    }

    if (query) {
      const haystack = `${task.title} ${task.description}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}
