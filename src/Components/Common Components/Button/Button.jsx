import React from 'react';

const Button = ({className,onClick,type,text,id}) => {
  
    return (
        <>
         <button type={type} id={id} className={className} onClick={onClick}>{text}</button>   
        </>
    );
}

export default Button;
