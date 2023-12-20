import React from 'react';

const TextArea = ({className,rows,columns,onChange ,placeholder}) => {
    return (
        <>
          <textarea onChange={onChange} className={className} rows={rows} cols={columns} placeholder={placeholder}></textarea>  
        </>
    );
}

export default TextArea;
