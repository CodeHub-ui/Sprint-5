# ProDesk IT — Kanban Task Board

A drag-and-drop Kanban task board built for IT helpdesk and sysadmin teams to track work across **To Do**, **In Progress**, and **Done** — with instant localStorage persistence, light/dark theming, and a performance-tuned React architecture. 


---
                    
## Features

- **Drag & drop** tasks between columns using the native HTML5 Drag and Drop API, with a live drop indicator and instant UI + localStorage updates
- **useReducer + Context API** architecture — no scattered `useState` calls for task data
- **Full CRUD**: add, edit, delete, and move tasks
- **Search** across task title and description
- **Priority filter** (High / Medium / Low / All), with color-coded badges (Red / Orange / Green)
- **Light & dark theme**, persisted and toggled from the header
- **Toast notifications** after add, edit, delete, and move actions
- **Empty state illustration** per column (and for empty filter results)
- **Floating "Add Task" button** and modal form
- **Glassmorphism UI** with rounded corners, smooth transitions, and a fully responsive layout (columns stack on mobile)
- **Performance optimizations**: `React.memo`, `useMemo`, and `useCallback` throughout, so moving one card doesn't re-render unrelated cards

---

## Tech stack

| Layer            | Choice                          |
|-------------------|----------------------------------|
| UI library        | React 19                        |
| Build tool         | Vite                            |
| Language           | JavaScript (no TypeScript)      |
| Styling            | Plain CSS with CSS variables    |
| State management   | Context API + `useReducer`      |
| Persistence        | `localStorage` (custom hook)    |
| Drag & drop         | HTML5 Drag and Drop API         |

No UI kits, drag-and-drop libraries, or state-management libraries were added — everything required is implemented directly with React primitives.

---

## Folder structure

```text
src/
│
├── components/
│   ├── Header.jsx          # Brand + theme toggle
│   ├── Board.jsx            # Renders the 3 columns, tracks the dragged task id
│   ├── Column.jsx           # Droppable column: filtering, drop handling, empty state
│   ├── TaskCard.jsx         # Memoized, draggable task card
│   ├── AddTaskModal.jsx     # Add/edit task form
│   ├── SearchBar.jsx        # Search input
│   ├── FilterBar.jsx        # Priority filter chips
│   └── EmptyState.jsx       # Empty-column illustration
│
├── context/
│   └── TaskContext.jsx      # useReducer + localStorage + toast wiring
│
├── reducer/
│   ├── taskReducer.js       # Pure reducer
│   ├── actions.js           # Action types + action creators
│   └── initialState.js      # Default/seed state
│
├── hooks/
│   └── useLocalStorage.js   # Generic localStorage-backed state hook
│
├── utils/
│   └── helpers.js           # id generation, filtering, formatting, constants
│
├── styles/
│   └── global.css           # Design tokens, themes, layout, components
│
├── App.jsx
└── main.jsx
```

---

## Installation

```bash
npm install
```

## Running the app

```bash
npm run dev
```

Opens the app with hot module reloading (default: `http://localhost:5173`).

## Building for production

```bash
npm run build
```

Outputs an optimized, production-ready bundle to `dist/`. Preview it locally with:

```bash
npm run preview
```

---

## Drag & drop explanation

Each `TaskCard` is a native `draggable` element. On `dragstart`, the task's `id` is written into the event's `dataTransfer` payload (`text/plain`) and the `Board` records which task is being dragged (purely to dim the source card).

Each `Column` listens for:
- `onDragOver` — calls `preventDefault()` so the column becomes a valid drop target, and flags the column as the active drop target for the visual indicator
- `onDragLeave` — clears that flag once the pointer actually leaves the column
- `onDrop` — reads the task id back out of `dataTransfer`, and dispatches `MOVE_TASK` with the new column status

The reducer updates the matching task's `status` field immutably, the UI re-renders instantly, and a `useEffect` in `TaskContext` writes the new state to `localStorage` on every change — so a moved card survives a page reload.

---

## useReducer architecture explanation

All task/board state (`tasks`, `theme`, `search`, `priorityFilter`) lives in a single `useReducer` inside `TaskContext`, instead of being split across multiple `useState` calls. This keeps every state transition:

- **Centralized** — every possible change to the board goes through one of eight actions: `LOAD_TASKS`, `ADD_TASK`, `UPDATE_TASK`, `DELETE_TASK`, `MOVE_TASK`, `TOGGLE_THEME`, `SET_SEARCH`, `SET_PRIORITY_FILTER`.
- **Pure** — `taskReducer` never mutates its input; every branch returns a new state object, and array/object spreads are used instead of in-place edits.
- **Predictable** — because updates are pure and centralized, only the specific task object that changed gets a new identity; every other task object keeps its original reference (see the next section for why that matters).

`TaskContext` wraps the reducer, hydrates its initial value from `localStorage` (via `useLocalStorage`), and re-persists the whole state on every change — so the reducer is the single source of truth for both the UI and storage.

---

## Performance optimization explanation

- **`React.memo(TaskCard)`** — `TaskCard` only re-renders when its own `task` prop (or drag state) changes. Because `taskReducer` never mutates tasks in place, moving or editing one task only creates a new object reference for *that* task; every sibling task object keeps its old reference, so `React.memo`'s shallow prop comparison lets `React.memo` skip re-rendering every other card.
- **`useMemo` for filtered lists** — each `Column` derives its visible tasks with `useMemo(() => filterTasksForColumn(...), [tasks, status, search, priorityFilter])`, so filtering only re-runs when one of those actual inputs changes, not on every render (e.g. a theme toggle).
- **`useCallback` for event handlers** — drag handlers, form submit handlers, delete/edit handlers, and the theme/search/filter dispatch wrappers are all wrapped in `useCallback` so their identity stays stable across renders, avoiding unnecessary downstream re-renders and re-subscriptions.
- **Context value memoization** — the value object provided by `TaskContext` is itself wrapped in `useMemo`, so components consuming the context don't re-render from an unrelated parent re-render alone.

Net effect: dragging a card from one column to another re-renders the two affected `Column`s and the one moved `TaskCard` — not the entire board.

---

## Local storage

The following are persisted under a single `prodesk-kanban-state` key and restored automatically on reload:

- Tasks
- Theme (light/dark)
- Search query
- Priority filter

---

## Author

**Harshit Gupta**
