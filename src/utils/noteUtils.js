export const filterNotes = (notes, search, category) => {
    return notes.filter((note) => {
        const matchesSearch =
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase());      

        const matchesCategory =
            category === 'All' || note.category === category;

        return matchesSearch && matchesCategory;
    })
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));   
}

    export const getNoteCounts = (notes) => {
        const totalNotes = notes.length;
        const pinnedNotes = notes.filter((note) => note.pinned).length;
        const unpinnedNotes = totalNotes - pinnedNotes;     
        
         return {
            noteCount: totalNotes,
            pinnedCount: pinnedNotes,
            unpinnedCount: unpinnedNotes,
            };
    }


export const sortNotes = (notes, sort) => {
    return [...notes].sort((a, b) => {
        switch (sort) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt)

            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt)

            case 'updated':
                return (
                    new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
                )

            case 'title':
                    return a.title.localeCompare(b.title)

            default:
                return 0

        }
    })
}

export const getWordCount = (content) => {
    if(!content.trim()) {
        return 0
    }
    return content.trim().split(/\s+/).length
}

export const getCharacterCount = (content) => {
    return content.length
}

export const getNotePreview = (content, maxLength = 150) => {
 if (content.length <= maxLength) {
    return content
  }

  return content.slice(0, maxLength) + '...'
}

export const isDuplicate = (
notes,
  title,
  excludeId = null
) => {
  return notes.some(
    (note) =>
      note.id !== excludeId &&
      note.title.trim().toLowerCase() === title.trim().toLowerCase()
  )
}