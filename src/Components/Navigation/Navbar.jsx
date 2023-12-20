import React from 'react';
import Input from '../Common Components/Input/Input';
import Button from '../Common Components/Button/Button';
import { NotesContext } from '../../Context/notesContext';
import { useContext } from 'react';
import "./Navbar.css"
const Navbar = () => {

    // Context APi
    const {notesDispatch} = useContext(NotesContext);
    
    //Function to Add note
    function Addnote()
    {
        notesDispatch({type:"ADD",payLoad:true});
     
    }
    return (
        <div className='Navbar'>
            <div className='Navbar-container'>
                <div className='Navbar-logo'>
                    <img src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png' alt='logo' />
                    <h3 className='Navbar-brand'>Keep</h3>
                </div>
                <div className='Navbar-Search'>
                    <Button type={"button"} text={"Add notes"} className={"Add-button"} onClick={Addnote}/>
                    <Input  className={"Search-bar"} type={"text"} placeholder={"Search for a title."} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;

