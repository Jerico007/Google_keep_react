import { React, useContext,useEffect } from "react";
import { NotesContext } from "../../Context/notesContext";
import NoteCard from "../Note Card/NoteCard";
import "./NotesLists.css";

import Aos from "aos";
import 'aos/dist/aos.css';

const NotesLists = () => {
  // Context API
  const { noteState, notesDispatch } = useContext(NotesContext);


  useEffect(()=>{
    Aos.init({
        duration:2000
    })
    Aos.refreshHard();
},[])

  return (
    <div className="NotesLists-container">
      <div className="NotesLists-holder" data-aos="slide-right">
        {noteState.searchNotes.length > 0
          ? noteState.searchNotes.map((val) => (
              <NoteCard key={val.id} noteData={val} />
            ))
          : noteState.notes.length > 0 &&
            noteState.notes.map((val) => (
              <NoteCard key={val.id} noteData={val} />
            ))}
      </div>
    </div>
  );
};

export default NotesLists;
