
import { useEffect } from "react";
import NoteForm from "./NoteForm";

function CreateNoteDialog({
    onAdd,
    noteTitleRef,
    onClose,
    isAtLimit
}) {
    useEffect(() => {
        noteTitleRef.current?.focus();
    }, [noteTitleRef]);

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
                aria-labelledby="create-note-title"
            >
                <h2 id="create-note-title">Create a New Note</h2>

                <NoteForm
                    ref={noteTitleRef}
                    onAdd={(title, content, category) => {
                        const result = onAdd(title, content, category);

                        if (result !== 'duplicate' && result !== 'limit') {
                            onClose();
                        }

                        return result;
                    }}
                    editingNote={null}
                    onUpdate={() => { }}
                    onCancelEdit={onClose}
                    isAtLimit={isAtLimit}
                />
            </div>
        </div>
    );
}

export default CreateNoteDialog;