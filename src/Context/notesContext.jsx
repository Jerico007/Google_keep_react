import { createContext, useReducer, useState,useEffect } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  //useState to track notes id
  const [notesId, setNotesId] = useState(1);

  //Local storage for storing the Notes data
  const [storedValue, setValue] = useLocalStorage("notesData", []);


  //UseEffect to get values from local storage on first load
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
    if (action.type === "ADD") {
      return { ...state, addNote: action.payLoad };
    }

    if (action.type === "CREATE") {
      let newArr = [...state.notes];

      //Checking if action.payLoad is array
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
      //Setting values in localStorage
      setValue(newArr);
      return { ...state, notes: newArr, addNote: false };
    }

    if(action.type === "DELETE")
    {
      const notes = [...state.notes];

      const newArr = notes.filter(val => val.id !== Number(action.payLoad));

      //Setting values in localStorage
      setValue(newArr);
      return {...state, notes: newArr};

    }

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
      //Setting values in localStorage
      setValue(newArr);
      return {...state,notes: newArr};
    }

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
      //Setting values in localStorage
      setValue(newArr);
      return {...state,notes: newArr};
    }

    if(action.type === "RESET")
    {
       //Setting values in localStorage
      setValue([]);
      return {...state,notes: []};
    }

    return state;
  }

  //Reducer for handeling notes states
  const [noteState, notesDispatch] = useReducer(notesReducer, {
    notes: [],
    addNote: false,
  });

  return (
    <NotesContext.Provider value={{ noteState, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
export default NotesProvider;
