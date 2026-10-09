const NoteStats = ({
    stats,
    totalNotes,
    maxNotes,
    editingNote,
}) => {
    return (
        <div className="note-stats">
            <p>
                {stats.noteCount}
                {stats.noteCount === 1 ? ' note' : ' notes'}
                {' found'}
            </p>

            <p>
                {stats.pinnedCount}
                {stats.pinnedCount === 1
                    ? ' pinned note'
                    : ' pinned notes'}
            </p>

            <p>
                {stats.unpinnedCount}
                {stats.unpinnedCount === 1
                    ? ' unpinned note'
                    : ' unpinned notes'}
            </p>


            <p>
                {totalNotes} / {maxNotes} notes
            </p>

            {!editingNote && totalNotes >= maxNotes && (
                <p className="note-limit-warning">
                    ⚠️ You've reached the {maxNotes}-note limit.
                </p>
            )}

            {!editingNote &&
                totalNotes >= Math.max(1, maxNotes - 10) &&
                totalNotes < maxNotes && (
                    <p className="note-limit-warning">
                        ⚠️ You're getting close to the {maxNotes}-note limit.
                    </p>
                )}
        </div>
    )
}

export default NoteStats