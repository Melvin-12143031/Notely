
const NotesHeader = ({ noteCount }) => {
  return (
    <header className="notes-header">
      <div className="header-brand">
        <div className="header-brand-text">
          <h1>📝Notely</h1>
          <p>Capture your ideas, tasks, and thoughts.</p>
        </div>
      </div>

      <span className="header-note-count">
        {noteCount} {noteCount === 1 ? "note" : "notes"}
      </span>
    </header>
  );
};

export default NotesHeader;