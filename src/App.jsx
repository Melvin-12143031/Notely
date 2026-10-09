
import "./App.css";

import { useEffect, useRef, useState } from "react";

import useNotes, { MAX_NOTES } from "./hooks/useNotes";
import useLocalStorage from "./hooks/useLocalStorage";

import {
  filterNotes,
  getNoteCounts,
  sortNotes,
} from "./utils/noteUtils";

import EmptyState from "./components/EmptyState";
import NoteList from "./components/NoteList";
import Button from "./components/Button";
import NoteStats from "./components/NoteStats";
import NotesHeader from "./components/NotesHeader";
import NotesToolbar from "./components/NotesToolbar";

import ConfirmDialog from "./components/ConfirmDialog";
import DeleteNoteDialog from "./components/DeleteNoteDialog";
import CreateNoteDialog from "./components/CreateNoteDialog";
import EditNoteDialog from "./components/EditNoteDialog";
import AppFooter from "./components/AppFooter";

function App() {
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    editingNote,
    startEditing,
    cancelEditing,
    clearNotes,
    deletingNote,
    startDeleting,
    isAtLimit,
    cancelDeleting,
  } = useNotes();

  // Search, category, and sorting preferences
  const [search, setSearch] = useLocalStorage("noteSearch", "");
  const [category, setCategory] = useLocalStorage("noteCategory", "All");
  const [sort, setSort] = useLocalStorage("noteSort", "newest");

  // Dialog visibility
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Toast notification
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [savedToastMessage, setSavedToastMessage] = useState("");

  const noteTitleRef = useRef(null);

  // Display a toast notification
  const showToast = (message) => {
    setSavedToastMessage(message);
    setShowSavedToast(true);
  };

  // Focus the title field when editing a note
  useEffect(() => {
    if (editingNote) {
      noteTitleRef.current?.focus();
      noteTitleRef.current?.select();
    }
  }, [editingNote]);

  // Keyboard shortcut: Alt + N
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "n") {
        event.preventDefault();
        noteTitleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Automatically hide toast notifications
  useEffect(() => {
    if (!showSavedToast) return;

    const timeoutId = setTimeout(() => {
      setShowSavedToast(false);
    }, 2600);

    return () => clearTimeout(timeoutId);
  }, [showSavedToast]);

  // Filter and sort notes
  const filteredNotes = sortNotes(
    filterNotes(notes, search, category),
    sort
  );

  // Calculate note statistics
  const filteredStats = getNoteCounts(filteredNotes);
  const totalStats = getNoteCounts(notes);

  // Open the create-note dialog
  const handleCreateNote = () => {
    setSearch("");
    setCategory("All");
    cancelEditing();
    setShowCreateDialog(true);
  };

  // Reset search and category filters
  const handleClearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  // Save a new note
  const handleAddNote = (title, content, noteCategory) => {
    const result = addNote(title, content, noteCategory);

    if (result !== "duplicate" && result !== "limit") {
      setShowCreateDialog(false);
      showToast("Note saved successfully!");
    }

    return result;
  };

  // Update an existing note
  const handleUpdateNote = (id, title, content, noteCategory) => {
    const result = updateNote(id, title, content, noteCategory);

    if (result !== "duplicate") {
      showToast("Note updated successfully!");
    }

    return result;
  };

  // Delete a note
  const handleDeleteNote = () => {
    if (!deletingNote) return;

    deleteNote(deletingNote.id);
    cancelDeleting();
    showToast("Note deleted successfully!");
  };

  // Clear all notes
  const handleClearAllNotes = () => {
    clearNotes();
    setShowClearDialog(false);
    showToast("All notes cleared successfully!");
  };

  return (
    <div className="app">
      {showSavedToast && (
        <div
          className="saved-toast"
          role="status"
          aria-live="polite"
        >
          <span className="saved-toast-icon" aria-hidden="true">
            ✓
          </span>
          <span>{savedToastMessage}</span>
        </div>
      )}

      <NotesHeader noteCount={notes.length} />

      <div className="notes-controls">
        <NotesToolbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        <NoteStats
          stats={filteredStats}
          totalNotes={totalStats.noteCount}
          maxNotes={MAX_NOTES}
          editingNote={editingNote}
        />

        <div className="notes-controls-footer">
          <Button
            type="button"
            variant="primary"
            onClick={handleCreateNote}
          >
            + Create New
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() => setShowClearDialog(true)}
            disabled={notes.length === 0}
          >
            Clear All Notes
          </Button>
        </div>
      </div>

      {filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onEdit={startEditing}
          onDelete={startDeleting}
          onPin={togglePin}
        />
      ) : (
        <EmptyState
          search={search}
          category={category}
          onCreateNote={handleCreateNote}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Create Note Dialog */}
      {showCreateDialog && (
        <CreateNoteDialog
          onAdd={handleAddNote}
          noteTitleRef={noteTitleRef}
          onClose={() => setShowCreateDialog(false)}
          isAtLimit={isAtLimit}
        />
      )}

      {/* Edit Note Dialog */}
      {editingNote && (
        <EditNoteDialog
          editingNote={editingNote}
          onUpdate={handleUpdateNote}
          onClose={cancelEditing}
          noteTitleRef={noteTitleRef}
        />
      )}

      {/* Delete Note Dialog */}
      {deletingNote && (
        <DeleteNoteDialog
          note={deletingNote}
          onConfirm={handleDeleteNote}
          onCancel={cancelDeleting}
        />
      )}

      {/* Clear All Notes Dialog */}
      {showClearDialog && (
        <ConfirmDialog
          title="Clear All Notes?"
          message="This will permanently remove all of your notes."
          confirmText="Clear All"
          onConfirm={handleClearAllNotes}
          onCancel={() => setShowClearDialog(false)}
        />
      )}

      <AppFooter />
    </div>
  );
}

export default App;