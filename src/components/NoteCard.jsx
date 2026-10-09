
import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import {
    getWordCount,
    getCharacterCount,
    getNotePreview
} from "../utils/noteUtils";

const NoteCard = ({
    title,
    content,
    category,
    pinned,
    createdAt,
    updatedAt,
    onEdit,
    onCancelEdit,
    onDelete,
    onPin }) => {

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setExpanded(false)
    },[content])

    return (
        <div className={`note-card ${pinned ? 'note-card-pinned' : ''}`}>
            <h2>{title}</h2>

            <p className="note-category">
                {category}
            </p>

            <p>{expanded ? content
                : getNotePreview(content)}
            </p>

            {content.length > 150 && (
                <button
                    type="button"
                    className="note-preview-button"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'Show Less' : 'Read More'}
                </button>
            )}

            <p className="note-word-count">
                {getWordCount(content)} words
            </p>
            <p className="note-word-count">
                {getCharacterCount(content)} characters
            </p>

            <p className="note-date">
                Created:
                {createdAt
                    ? new Date(createdAt).toLocaleString()
                    : 'No date'}
            </p>

            <p className="note-date">
                Updated:
                {updatedAt
                    ? new Date(updatedAt).toLocaleString()
                    : 'No date'}
            </p>


            <div className="note-actions">

                <IconButton
                    onClick={onEdit}
                    label="Edit note"
                >
                    ✏️
                </IconButton>

                <IconButton
                    onClick={onDelete}
                    label="Delete note"
                    className="icon-button-danger"
                >
                    🗑️
                </IconButton>

                <IconButton
                    onClick={onPin}
                    label={pinned ? 'Unpin note' : 'Pin note'}
                >
                    {pinned ? '📌' : '📍'}
                </IconButton>

            </div>
        </div>
    )
}

export default NoteCard
