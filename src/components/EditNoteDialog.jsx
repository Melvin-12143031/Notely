
import { useEffect } from "react";
import NoteForm from "./NoteForm";

function EditNoteDialog({
    editingNote,
    onUpdate,
    onClose,
    noteTitleRef
}) {
    useEffect(() => {
        noteTitleRef.current?.focus();
        noteTitleRef.current?.select();
    }, [editingNote, noteTitleRef]);

    return (
        <div
            className="dialog-backdrop"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    e.preventDefault();
                }
            }}
        >
            <div
                className="dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-note-title"
            >
                <h2 id="edit-note-title">Edit Note</h2>

                <NoteForm
                    key={editingNote.id}
                    ref={noteTitleRef}
                    editingNote={editingNote}
                    onAdd={() => { }}
                    onUpdate={onUpdate}
                    onCancelEdit={onClose}
                    isAtLimit={false}
                />
            </div>
        </div>
    );
}

export default EditNoteDialog;