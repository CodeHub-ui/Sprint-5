import { useCallback } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import { toggleTheme } from "../reducer/actions.js";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7.2 7.2 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export default function Header() {
  const { state, dispatch } = useTaskContext();

  const handleToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const taskCount = state.tasks.length;

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-text">
            <h1>Kanban Task Board</h1>
            <p>{taskCount} task{taskCount === 1 ? "" : "s"} on the board</p>
          </div>
        </div>

        <div className="theme-toggle" role="group" aria-label="Theme">
          <button
            type="button"
            className={state.theme === "light" ? "active" : ""}
            onClick={state.theme === "dark" ? handleToggle : undefined}
            aria-pressed={state.theme === "light"}
            aria-label="Light theme"
          >
            <SunIcon />
          </button>
          <button
            type="button"
            className={state.theme === "dark" ? "active" : ""}
            onClick={state.theme === "light" ? handleToggle : undefined}
            aria-pressed={state.theme === "dark"}
            aria-label="Dark theme"
          >
            <MoonIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
