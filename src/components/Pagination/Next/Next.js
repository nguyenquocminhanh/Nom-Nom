import React from 'react';
import classes from './Next.css';

const next = props => {
    let attachedClasses = [classes.Next, ''];

    if (props.isDisabled) {
        attachedClasses = [classes.Next, classes.IsDisabled];
    }

    return (
        <li className={attachedClasses.join(' ')}
            onClick={props.nextIsClicked}>
            {props.children}
        </li>
    )
};

export default next;
