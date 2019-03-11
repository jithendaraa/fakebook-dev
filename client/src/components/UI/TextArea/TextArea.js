import React from 'react';

const textArea = (props) => (
    <div>
        <textarea
            placeholder={props.placeholder}
            type={props.type}
            id={props.id}
            name={props.name}
            style={{ 
                width: props.width, 
                height: props.height,
                borderRadius: "10px",
                fontSize: "20px"
                }}>
        </textarea>
    </div>
);

export default textArea;