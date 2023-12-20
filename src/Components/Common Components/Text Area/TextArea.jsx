import React from 'react';

const TextArea = ({className,rows,columns,onChange ,placeholder,value ,id}) => {
    return (
        <>
          <textarea onChange={onChange} id={id} className={className} value={value} rows={rows} cols={columns} placeholder={placeholder}></textarea>  
        </>
    );
}

export default TextArea;
