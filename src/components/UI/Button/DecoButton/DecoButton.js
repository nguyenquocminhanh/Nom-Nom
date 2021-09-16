import React from 'react';

import classes from './DecoButton.css';

const decoButton = props => {
    return (
        <button onClick={props.buttonClicked} className={classes.Btn} disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default decoButton;