import NoteCard from './NoteCard'

const NoteList = ({
  notes,
  onEdit,
  onDelete,
  onPin,
}) => {
  const pinnedNotes = notes.filter((note) => note.pinned)
  const otherNotes = notes.filter((note) => !note.pinned)

  return (
    <div className="notes-list">

      {pinnedNotes.length > 0 && (
        <section>
          <h2>Pinned Notes</h2>

          {pinnedNotes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.content}
              category={note.category}
              pinned={note.pinned}
              createdAt={note.createdAt}
              updatedAt={note.updatedAt}
              onEdit={() => onEdit(note)}
              onDelete={() => onDelete(note)}
              onPin={() => onPin(note.id)}
            />
          ))}
        </section>
      )}

      {otherNotes.length > 0 && (
        <section>
          <h2>All Notes</h2>

          {otherNotes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.content}
              category={note.category}
              pinned={note.pinned}
              createdAt={note.createdAt}
              updatedAt={note.updatedAt}
              onEdit={() => onEdit(note)}
              onDelete={() => onDelete(note)}
              onPin={() => onPin(note.id)}
            />
          ))}
        </section>
      )}

    </div>
  )
}

export default NoteList