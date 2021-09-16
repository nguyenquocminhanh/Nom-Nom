import React from 'react';
import classes from './Node.css';

const node = props => {
    let attachedClasses = [classes.Node, ''];

    if (props.isSelected) {
        attachedClasses = [classes.Node, classes.IsSelected];
    }

    return (
        <li className={attachedClasses.join(' ')}
            onClick={props.nodeIsClicked}>
                {props.children}
        </li>
    )
};

export default node;
