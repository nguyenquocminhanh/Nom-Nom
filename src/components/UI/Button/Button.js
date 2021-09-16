import React from 'react';

import classes from './Button.css'

const button = props => {
    return (
        <button 
        // 2 conditions Success or Danger in CSS class
            className={[classes.Button, props.condition ? '' : classes[props.btnType]].join(' ')}  
            onClick={props.clicked}
            disabled={props.condition ? true : false}>
                {props.children}
    
        </button>
    )
} 

export default button;