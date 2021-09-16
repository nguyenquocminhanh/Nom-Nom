import React from 'react';

import classes from './OptionButton.css';

const optionButton = props => {
    let attachedClasses = [classes.OptionButton, ''];
    if (props.isAvailable) {
        attachedClasses = [classes.OptionButton, classes.IsAvailable];
    }

    if (props.isOptionClicked) {
        attachedClasses = [classes.OptionButton, classes.IsClicked];
    }

    if (props.isDisabled) {
        attachedClasses = [classes.OptionButton, classes.Disabled]
    }

    let element = <button
            className={attachedClasses.join(' ')}
            onClick={props.onOptionRequest}
            disabled={props.isDisabled}>
            {props.children}
        </button>

    return (
        element    
    )
}

export default optionButton;