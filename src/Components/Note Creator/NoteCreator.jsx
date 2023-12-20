import React, { useContext, useState } from "react";
import Input from "../Common Components/Input/Input";
import Button from "../Common Components/Button/Button";
import TextArea from "../Common Components/Text Area/TextArea";
import { NotesContext } from "../../Context/notesContext";
import "./NoteCreator.css";
const NoteCreator = () => {

    // Context API
  const { noteState, notesDispatch } = useContext(NotesContext);

  //useState to handel form inputs
  const [data,setData] = useState({title:"",content:""});

  //Function to handle submit
  function handelSubmit(e) {
    e.preventDefault();   
    if(data.title==="" || data.content=="")
    {
        return;
    }
    notesDispatch({ type: "CREATE", payLoad: data });
    setData({title:"",content:""});
  }

  //Funtion to close modal
  function closeModal(e) {
    if (e.target.className === "Note-container") {
      notesDispatch({ type: "ADD", payLoad: false });
    }
  }

  return (
    <div className="Note-container" onClick={closeModal}>
      <div className="Note-model">
        <form onSubmit={handelSubmit}>
          <Input type={"text"} placeholder={"Title..."} onChange={(e)=>{setData({...data,title:e.target.value})}}/>
          <TextArea
            rows={5}
            columns={32}
            placeholder={"Enter Content..."}
            className={"Content-field"}
            onChange={(e)=>{setData({...data,content:e.target.value})}}
          />
          <Button
            type={"submit"}
            className={"Modal-button"}
            text={"Create note"}
          />
        </form>
      </div>
    </div>
  );
};

export default NoteCreator;
