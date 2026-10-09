import notesData from '../data/notes.json'
import { getSavedNotes } from '../utils/notesStorage'

const initialNotes = getSavedNotes() || notesData

export default initialNotes