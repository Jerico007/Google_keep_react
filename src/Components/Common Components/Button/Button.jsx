import React from 'react';

const Button = ({className,onClick,type,text}) => {
    return (
        <>
         <button type={type} className={className} onClick={onClick}>{text}</button>   
        </>
    );
}

export default Button;
