import { useState, useEffect, useCallback } from "react";
import { TaskProvider, useTaskContext } from "./context/TaskContext.jsx";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import Board from "./components/Board.jsx";
import AddTaskModal from "./components/AddTaskModal.jsx";

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AppShell() {
  const { state, toast } = useTaskContext();

  useEffect(() => {
    document.body.dataset.theme = state.theme;
  }, [state.theme]);

  const [modal, setModal] = useState({ open: false, mode: "add", task: null });

  const openAddModal = useCallback(() => {
    setModal({ open: true, mode: "add", task: null });
  }, []);

  const openEditModal = useCallback((task) => {
    setModal({ open: true, mode: "edit", task });
  }, []);

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <div className="toolbar">
          <SearchBar />
          <FilterBar />
        </div>

        <Board onEdit={openEditModal} />
      </main>

      <button type="button" className="fab" onClick={openAddModal} aria-label="Add task">
        <PlusIcon />
      </button>

      {modal.open && (
        <AddTaskModal
          mode={modal.mode}
          task={modal.task}
          defaultStatus="To Do"
          onClose={closeModal}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <CheckIcon />
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <AppShell />
    </TaskProvider>
  );
}
