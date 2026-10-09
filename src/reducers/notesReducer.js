
import { 
    ADD_NOTE, 
    UPDATE_NOTE, 
    DELETE_NOTE, 
    TOGGLE_PIN, 
    CLEAR_NOTES } from './notesActions';

const notesReducer = (state, action) => {
    switch (action.type) {

        case ADD_NOTE:
            return [...state,
    {
      id: Date.now(),
      title: action.payload.title,
      content: action.payload.content,
      category: action.payload.category,
      pinned: false,
      createdAt: new Date().toISOString(),
    },]  
            
    case UPDATE_NOTE:
  return state.map((note) =>
    note.id === action.payload.id
      ? {
          ...note,
          title: action.payload.title,
          content: action.payload.content,
          category: action.payload.category,
          updatedAt: new Date().toISOString(),
        }
      : note
  );

        case DELETE_NOTE:
  return state.filter(
    (note) => note.id !== action.payload
  );

       case TOGGLE_PIN:
  return state.map((note) =>
    note.id === action.payload
      ? {
          ...note,
          pinned: !note.pinned,
        }
      : note
  );

        case CLEAR_NOTES:
            return [];                
        
       

    
    default:
        return state;
    }

}

export default notesReducer
