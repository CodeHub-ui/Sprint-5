import { memo, useState, useCallback } from "react";
import Column from "./Column.jsx";
import { COLUMNS } from "../utils/helpers.js";

function Board({ onEdit }) {
  const [draggingId, setDraggingId] = useState(null);

  const handleDragStart = useCallback((id) => setDraggingId(id), []);
  const handleDragEnd = useCallback(() => setDraggingId(null), []);

  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          status={column.status}
          label={column.label}
          draggingId={draggingId}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default memo(Board);
