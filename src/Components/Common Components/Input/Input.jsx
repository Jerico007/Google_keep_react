import React from 'react';

const Input = ({className,type,placeholder,id ,onChange ,value}) => {
    return (
        <>
             <input className={className} id={id} value={value} type={type} placeholder={placeholder} onChange={onChange}/>   
        </>
    );
}

export default Input;
