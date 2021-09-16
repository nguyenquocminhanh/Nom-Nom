import React from 'react';
import classes from './Backdrop.css';

const backdrop = props => {
    return (
        // When show-isPicking is TRUE, Backdrop appears
        // When Backdrop is clicked -> isPicking-show is set to FALSE and 
        // Backdrop becomes null, Modal disappear
        props.show ?  <div className={classes.Backdrop} onClick={props.backdropClicked}></div> : null
    )
}

export default backdrop;