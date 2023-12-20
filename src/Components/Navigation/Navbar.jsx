
import Input from '../Common Components/Input/Input';
import Button from '../Common Components/Button/Button';
import { NotesContext } from '../../Context/notesContext';
import { useContext ,useState } from 'react';
import "./Navbar.css"
const Navbar = () => {

    // Context APi
    const {noteState,notesDispatch} = useContext(NotesContext);


   
    
    //Function to Add note
    function Addnote()
    {
        notesDispatch({type:"ADD",payLoad:true});
     
    }

    //Function to Search for notes by it's title
    function SearchNotesByTitle(e)
    {
        if(e.target.value === "")
        {
            notesDispatch({type:"SEARCH",payLoad:""});
        }
        notesDispatch({type:"SEARCH",payLoad:e.target.value.toLowerCase()});
        
    }
    return (
        <div className='Navbar'>
            <div className='Navbar-container'>
                <div className='Navbar-logo'>
                    <img src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png' alt='logo' />
                    <h3 className='Navbar-brand'>Keep</h3>
                </div>
                <div className='Navbar-Search'>
                    <Button type={"button"} text={"Add notes"}  className={"Add-button"} onClick={Addnote}/>
                    <Input  className={"Search-bar"}  type={"text"} onChange={SearchNotesByTitle} placeholder={"Search for a title."} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;

