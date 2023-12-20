import React from 'react';

const Input = ({className,type,placeholder ,onChange}) => {
    return (
        <>
             <input className={className} type={type} placeholder={placeholder} onChange={onChange}/>   
        </>
    );
}

export default Input;
