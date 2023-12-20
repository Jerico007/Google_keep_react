import React from 'react';
import Navbar from '../Navigation/Navbar';
import { useContext } from 'react';
import { NotesContext } from '../../Context/notesContext';
import NoteCreator from '../Note Creator/NoteCreator';
const MainScreen = () => {
    const{noteState,notesDispatch} = useContext(NotesContext);
  
    return (
        <div className='MainScreen'>
            <Navbar/>  
            {
                noteState.notes.length ===0 ? <h1 className='No-notes'>No notes added</h1> : ""
            }
            {
                !noteState.addNote ?  "" : <NoteCreator/>
            }
           

        </div>
    );
}

export default MainScreen;
