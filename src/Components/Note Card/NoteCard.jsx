import { React, useContext, useState, useEffect } from "react";
// Common component
import Input from "../Common Components/Input/Input";
import TextArea from "../Common Components/Text Area/TextArea";
import Button from "../Common Components/Button/Button";

// Material icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import Aos from "aos";
import 'aos/dist/aos.css';

//NotesContext
import { NotesContext } from "../../Context/notesContext";
import "./NoteCard.css";
const NoteCard = ({ noteData }) => {
 
  useEffect(()=>{
    Aos.init({
      duration:700,
      easing:"ease-in-out-back"
    })
  },[])

  // Context API
  const { notesDispatch } = useContext(NotesContext);

  //useState for Edit Inputs
  const [editedData, setEditData] = useState("");

  // Note style
  const noteStyle = {
    backgroundColor: noteData.color,
  };

  //function to change note color
  function changeNoteColor(e) {
    const str = e.target.id;
    const id = str.split("-");
    const color = e.target.value;
    notesDispatch({
      type: "COLORCHANGE",
      payLoad: { id: id[1], color: color },
    });
  }

  //function to save note
  function saveNote(e) {
    if (editedData.title === "" || editedData.content === "") {
      return;
    }

    const id = e.target.parentElement.id;
    notesDispatch({
      type: "SAVE",
      payLoad: { id: id, title: editedData.title, content: editedData.content },
    });
    setEditData("");
  }

  //function to edit note
  function editNote(e) {
    setEditData({ title: noteData.title, content: noteData.content });
    notesDispatch({ type: "EDIT", payLoad: e.target.parentElement.id });
  }

  //funtion to Delete note
  function deleteNote(e) {
    if (confirm("Title (" + noteData.title + ") will be deleted")) {
      notesDispatch({ type: "DELETE", payLoad: e.target.parentElement.id });
    }

    e.stopPropagation();
  }

  return (
    <div className="NoteCard-container" data-aos="fade-down">
      <div
        className="NoteCard-module"
        style={{ backgroundColor: noteStyle.backgroundColor }}
      >
        {noteData.edit ? (
          <Input
            className={"NoteCard-title-Input"}
            type={"text"}
            value={editedData.title}
            onChange={(e) => {
              setEditData({ ...editedData, title: e.target.value });
            }}
          />
        ) : (
          <h3 className="NoteCard-title">{noteData.title}</h3>
        )}
        {noteData.edit ? (
          <TextArea
            className={"NoteCard-content-Input"}
            rows={5}
            columns={22}
            value={editedData.content}
            onChange={(e) => {
              setEditData({ ...editedData, content: e.target.value });
            }}
          />
        ) : (
          <pre className="NoteCard-content"> {noteData.content}</pre>
        )}

        <div className="NoteCard-button">
          {noteData.edit ? (
            <Button
              onClick={saveNote}
              id={noteData.id}
              className={"NoteCard-save"}
              text={
                <SaveIcon
                  id={noteData.id}
                  fontSize="small"
                  sx={{ color: "white" }}
                />
              }
            ></Button>
          ) : (
            <Button
              className={"NoteCard-edit"}
              onClick={editNote}
              id={noteData.id}
              text={
                <EditIcon
                  id={noteData.id}
                  fontSize="small"
                  sx={{ color: "white" }}
                />
              }
            />
          )}

          <Button
            className={"NoteCard-delete"}
            id={noteData.id}
            onClick={deleteNote}
            text={
              <DeleteIcon
                id={noteData.id}
                fontSize="small"
                sx={{ color: "white" }}
              />
            }
          />
          <div className="NoteCard-color-holder">
            <label
              htmlFor={`favcolor-${noteData.id}`}
              className="NoteCard-color-button"
            >
              <ColorLensIcon fontSize="small" sx={{ color: "white" }} />
            </label>
            <Input
              id={`favcolor-${noteData.id}`}
              onChange={changeNoteColor}
              className={"NoteCard-color"}
              value={noteData.color}
              type={"color"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
