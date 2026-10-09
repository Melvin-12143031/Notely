export const getSavedNotes = () => {
  const savedNotes = localStorage.getItem('notes')

  if (!savedNotes) {
    return null
  }

  try {
    const parsedNotes = JSON.parse(savedNotes)

    if (Array.isArray(parsedNotes)) {
      return parsedNotes
    }

    return null
  } catch (error) {
    console.error('Invalid notes data:', error)
    return null
  }
}

export const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes))
}