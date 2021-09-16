import React from 'react';

import classes from './UpArrowButton.css';
import * as img from '../../../../assets/Images/index.js';

const upArrowButton = props => {
    return (
        <div className={classes.UpArrowButton} onClick={props.UpArrowButtonClicked}>
            <img src={img.uparrow}/>
        </div>
    )
}

export default upArrowButton;