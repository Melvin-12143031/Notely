import {useEffect, useReducer, useState} from 'react'
import notesReducer from '../reducers/notesReducer'
import initialNotes from '../reducers/notesInitialState'



import {
    ADD_NOTE, 
    UPDATE_NOTE, 
    DELETE_NOTE, 
    TOGGLE_PIN,
    CLEAR_NOTES} from '../reducers/notesActions'

import {saveNotes} from '../utils/notesStorage'
import { isDuplicate } from '../utils/noteUtils'

export const MAX_NOTES = 50

const useNotes = () => {
    const [notes, dispatch] = 
    useReducer(
        notesReducer, 
        initialNotes);

const [editingNote, setEditingNote] = useState(null);
const [deletingNote, setDeletingNote] = useState(null);

const startDeleting = (note) => {
    setDeletingNote(note);
}

const cancelDeleting = () => {
    setDeletingNote(null)
}

const startEditing = (note) => {
    setEditingNote(note);
}

const cancelEditing = () => {
    setEditingNote(null);
}

    useEffect(() => {
        saveNotes(notes);
    }, [notes]);

   const addNote = (title, content, category) => {
    if (notes.length >= MAX_NOTES) {
        return 'limit'
    }

    if (isDuplicate(notes, title)) {

        return 'duplicate'
    }

    dispatch({
        type: ADD_NOTE,
        payload: {
            title,
            content,
            category,
        },
    })

    return 'success'
}

    const updateNote = (id, title, content, category) => {

        if (isDuplicate(notes,title, id)) {
            return 'duplicate'
        }

        dispatch({
            type: UPDATE_NOTE,
            payload: {
                id,
                title,
                content,
                category,
            },
        });

        setEditingNote(null);

        return 'success'
    }

    const deleteNote = (id) => {
        dispatch({
            type: DELETE_NOTE,
            payload: id,
        });
    }

    const togglePin = (id) => {
        dispatch({
            type: TOGGLE_PIN,
            payload: id,
        });
    }

    const clearNotes = () => {
       
        if(notes.length === 0){
            return
        }

        dispatch({
            type: CLEAR_NOTES,
        });
    }

    return { 
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
        cancelDeleting,
        isAtLimit: notes.length  >= MAX_NOTES,
    };
};

export default useNotes
