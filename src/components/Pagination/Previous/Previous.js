import React from 'react';
import classes from './Previous.css';

const previous = props => {
    let attachedClasses = [classes.Previous, ''];

    if (props.isDisabled) {
        attachedClasses = [classes.Previous, classes.IsDisabled];
    }

    return (
        <li className={attachedClasses.join(' ')} 
            onClick={props.previousIsClicked}>
            {props.children}
        </li>
    )
};

export default previous;
