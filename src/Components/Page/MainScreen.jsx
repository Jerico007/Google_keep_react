import React from 'react';
import Navbar from '../Navigation/Navbar';
import { useContext } from 'react';
import { NotesContext } from '../../Context/notesContext';
import NoteCreator from '../Note Creator/NoteCreator';
import NotesLists from '../Notes Lists/NotesLists';
import Button from '../Common Components/Button/Button';
const MainScreen = () => {
    const{noteState,notesDispatch} = useContext(NotesContext);
  
    //Function to reset notes
    function resetNotes() {
        if(confirm("Are you sure you want to reset"))
        {
            notesDispatch({type:"RESET"});
        }
    }

    return (
        <div className='MainScreen'>
            <Navbar/>  
            <div className='Reset-holder'>
            {
                noteState.notes.length === 0 ? "" : <Button text={"RESET"} onClick={resetNotes} className={"Reset-button"}/>
            }
            </div>
           
            {
                noteState.notes.length ===0 ? <h1 className='No-notes'>No notes added</h1> :  <NotesLists/>
            }
            {
                !noteState.addNote ?  "" : <NoteCreator/>
            }
           

        </div>
    );
}

export default MainScreen;
