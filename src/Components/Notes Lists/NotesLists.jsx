import { React, useContext, useEffect } from "react";
import { NotesContext } from "../../Context/notesContext";
import NoteCard from "../Note Card/NoteCard";
import "./NotesLists.css";

const NotesLists = () => {
  // Context API
  const { noteState, notesDispatch } = useContext(NotesContext);

  return (
    <div className="NotesLists-container">
      <div className="NotesLists-holder">
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
