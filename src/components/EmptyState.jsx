export default function EmptyState({ message = "No tasks here yet." }) {
  return (
    <div className="empty-state">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="32" height="22" rx="3" />
        <path d="M8 22h32" />
        <path d="M16 30h8" />
        <path d="M16 8v8M32 8v8" />
      </svg>
      <p>{message}</p>
    </div>
  );
}
