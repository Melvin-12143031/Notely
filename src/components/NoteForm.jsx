import { useEffect, useState, forwardRef } from 'react';
import categories from '../data/categories.json';
import Button from './Button';
import { NOTE_MESSAGES } from '../constant/noteMessages';
import { MAX_NOTES } from '../hooks/useNotes';

import { getWordCount } from '../utils/noteUtils';
import ConfirmDialog from './ConfirmDialog';

const NoteForm = forwardRef(({
    onAdd,
    editingNote,
    onUpdate,
    onCancelEdit,
    isAtLimit }, ref) => {

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const [isDirty, setIsDirty] = useState(false)
    const [showCancelDialog, setShowCancelDialog] = useState(false)

    const [contentLenght, setContentLenght] = useState(editingNote?.constent?.length || 0)
    const [titleLenght, setTitleLenght] = useState(editingNote?.title?.length || 0)

    useEffect(() => {
        setTitleLenght(editingNote?.title?.length || 0)
        setContentLenght(editingNote?.content?.length || 0)
        setWordCount(
            getWordCount(editingNote?.content || '')
        )

        setIsDirty(false)

    }, [editingNote])

    useEffect(() => {
        const form = document.querySelector('.note-form');

        if (form) {
            form.reset()
        }

        setContentLenght(0);
        setTitleLenght(0);

    }, [editingNote]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return
        }

        setIsSubmitting(true)

        const form = e.target;

        const title = form.title.value.trim();
        const category = form.category.value;
        const content = form.content.value.trim();

        if (!title || !content) {
            setError('Please fill in both fields');
            setIsSubmitting(false);
            return;
        }

        if (editingNote) {
            const result = onUpdate(
                editingNote.id,
                title,
                content,
                category
            )

            if (result === 'duplicate') {
                setError(NOTE_MESSAGES.DUPLICATE_TITLE)
                setIsSubmitting(false)
                return
            }
        } else {

            const result = onAdd(
                title,
                content,
                category
            )

            if (result === 'limit') {
                setError(NOTE_MESSAGES.NOTE_LIMIT(MAX_NOTES))
                setIsSubmitting(false)
                return
            }

            if (result === 'duplicate') {
                setError(NOTE_MESSAGES.DUPLICATE_TITLE)
                setIsSubmitting(false)
                return
            }

            setError('')
            form.reset()
            setTitleLenght(0)
            setContentLenght(0)
            setIsSubmitting(false)
        }

    };



    return (
        <form onSubmit={handleSubmit} className="note-form">
            <div className="form-heading">
                <h2>
                    {editingNote ? 'Edit Note' : 'Create a new note'}
                </h2>

                <p>
                    {editingNote
                        ? 'Update the details of your note.'
                        : 'Capture an idea, task, or thought.'}
                </p>
            </div>
            <input
                ref={ref}
                type="text"
                name="title"
                placeholder="Note title"
                defaultValue={editingNote?.title || ''}
                maxLength={60}
                onChange={(e) => {
                    setError('')
                    setIsDirty(true)
                    setTitleLenght(e.target.value.length)
                }}
            />

            <p
                className={`character-count ${titleLenght >= 54
                    ? 'character-count-warning'
                    : ''
                    }`}
            >
                {titleLenght} / 60
            </p>

            <select
                name="category"
                defaultValue={editingNote?.category || categories[0]}
                onChange={() => setIsDirty(true)}>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <textarea
                name="content"
                placeholder="Write your note here..."
                defaultValue={editingNote?.content || ''}
                maxLength={500}
                onChange={(e) => {
                    setError('')
                    setIsDirty(true)
                    setContentLenght(e.target.value.length)
                    setWordCount(getWordCount(e.target.value))
                }}>
            </textarea>

            <p
                className={`character-count ${contentLenght >= 450
                    ? 'character-count-warning'
                    : ''
                    }`}
            >
                {contentLenght} / 500
            </p>

            <p className="word-count">
                {wordCount} words
            </p>

            {error &&
                (<p
                    className="form-error"
                    role='alert'
                    aria-live='polite'
                >
                    {error}</p>
                )}

            {!editingNote && isAtLimit && (
                <p className="note-limit-warning">
                    You've reached the {MAX_NOTES}-note limit.
                </p>
            )}

            <Button
                type="submit"
                variant="primary"
                disabled={
                    (!editingNote && isAtLimit) ||
                    (!editingNote && !isDirty)
                }
            >
                {editingNote
                    ? isSubmitting
                        ? 'Saving...'
                        : 'Save Changes'
                    : isAtLimit
                        ? 'Limit Reached'
                        : isSubmitting
                            ? 'Adding...'
                            : 'Add Note'}
            </Button>

            {(editingNote || onCancelEdit) && (
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        if (isDirty) {
                            setShowCancelDialog(true)
                            return
                        }

                        setError('')
                        setIsDirty(false)
                        onCancelEdit()
                    }}
                >
                    Cancel
                </Button>
            )}


            {showCancelDialog && (
                <ConfirmDialog
                    title="Discard Changes?"
                    message="You have unsaved changes. Are you sure you want to cancel?"
                    confirmText="Discard"
                    onConfirm={() => {
                        setShowCancelDialog(false)
                        setError('')
                        setIsDirty(false)
                        onCancelEdit()
                    }}
                    onCancel={() => {
                        setShowCancelDialog(false)
                    }}
                />
            )}

        </form>
    )
})

export default NoteForm
