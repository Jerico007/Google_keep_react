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

        const id = arr[arr.length - 1].id + 1;
        notesDispatch({type:"CREATE" , payLoad: arr});
    }
  },[])

  //Function for notesReducer
  function notesReducer(state, action) {
    if (action.type === "ADD") {
      return { ...state, addNote: action.payLoad };
    }
    if (action.type === "CREATE") {
      const newArr = [...state.notes];

      newArr.push({
        id: notesId,
        title: action.payLoad.title,
        content: action.payLoad.content,
        edit: false,
        delete: false,
        color: "#ffffff",
      });
       
      //Setting values in localStorage
      setValue(newArr);

      setNotesId(notesId + 1);
    //   console.log(newArr);
      return { ...state, notes: newArr, addNote: false };
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
