import React from 'react';

import classes from './OrderAgainButton.css';

const orderAgainButton = props => {
    let attachedClasses = [classes.OrderAgainButton, ''];
    if (props.isOrderAgainClicked) {
        attachedClasses = [classes.OptionButton, classes.Active];
    }

    let element = 
        <button
            className={attachedClasses.join(' ')}
            onClick={props.onOrderAgainRequest}
        >
            {props.children}
        </button>

    return (
        element
    )
}

export default orderAgainButton;