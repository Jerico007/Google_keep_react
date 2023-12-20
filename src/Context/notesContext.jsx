import { createContext, useReducer, useState,useEffect } from "react";

// Imported from custom Hooks
import useLocalStorage from "../Hooks/useLocalStorage";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  //useState to track notes id
  const [notesId, setNotesId] = useState(1);

  //Local storage for storing the Notes data
  const [storedValue, setValue] = useLocalStorage("notesData", []);


  //UseEffect to get notes from local storage if present on first load
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("notesData")))
    {
        const arr = JSON.parse(localStorage.getItem("notesData"));
        if(arr.length > 0)
        {
          const id = arr[arr.length - 1].id + 1;
          setNotesId(id);
          notesDispatch({type:"CREATE" , payLoad: arr});
        }
    }
  },[])

  //Function for notesReducer
  function notesReducer(state, action) {
    
    // To Add note when clicked on add button
    if (action.type === "ADD") {
      return { ...state, addNote: action.payLoad };
    }

    // To Create a new note when clicked on Create button
    if (action.type === "CREATE") {
      let newArr = [...state.notes];

      if(Array.isArray(action.payLoad)) {
          newArr = [...action.payLoad];
        }
      else{
        newArr.push({
          id: notesId,
          title: action.payLoad.title,
          content: action.payLoad.content,
          edit: false,
          color: "#ffffff",
        });
        
        setNotesId(notesId + 1);
      }
      setValue(newArr);
      return { ...state, notes: newArr, addNote: false };
    }

    //To Delete a note when clicked on delete button
    if(action.type === "DELETE")
    {
      const notes = [...state.notes];

      const newArr = notes.filter(val => val.id !== Number(action.payLoad));

      setValue(newArr);
      return {...state, notes: newArr};

    }

    //To edit the note when clicked on edit button
    if(action.type === "EDIT")
    {
      const newArr = [...state.notes];
      for(let i = 0 ; i < newArr.length; i++)
      {
        if(newArr[i].id === Number(action.payLoad))
        {
            newArr[i].edit = true;
            break;
        }
      }
      return {...state,notes: newArr};
    }

    //To save the note when clicked on save button
    if(action.type === "SAVE")
    {
      const newArr = [...state.notes];
      for(let i = 0 ; i < newArr.length; i++)
      {
        if(newArr[i].id === Number(action.payLoad.id))
        {
            newArr[i].edit = false;
            newArr[i].title = action.payLoad.title;
            newArr[i].content = action.payLoad.content;
            break;
        }
      }
    
      setValue(newArr);
      return {...state,notes: newArr};
    }

    //To change the color of the note when clicked on the color button
    if(action.type === "COLORCHANGE")
    {
      const newArr = [...state.notes];
      for(let i = 0 ; i < newArr.length; i++)
      {
        if(newArr[i].id === Number(action.payLoad.id))
        {
            newArr[i].color = action.payLoad.color;
            break;
        }
      }
    
      setValue(newArr);
      return {...state,notes: newArr};
    }


    //To reset created notes when clicked on reset button
    if(action.type === "RESET")
    {
    
      setValue([]);
      return {...state,notes: []};
    }

    //To search for notes by title when searched in the search box
    if(action.type === "SEARCH")
    {
      const notes = [...state.notes];
      let newArr = [];
      
      if(action.payLoad === "")
      {
        return {...state,searchNotes:[]};
      }
      

      newArr = notes.filter((val)=> val.title.substring(0,action.payLoad.length).toLowerCase() === action.payLoad);
      console.log(newArr);
      return {...state, searchNotes: newArr};
    }

    return state;
  }

  //Reducer for handeling notes states
  const [noteState, notesDispatch] = useReducer(notesReducer, {
    notes: [],
    addNote: false,
    searchNotes: []
  });

  return (
    <NotesContext.Provider value={{ noteState, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
export default NotesProvider;
