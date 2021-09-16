import React from 'react';
import {cancel} from '../../../../assets/Images/index';

import classes from './CloseButton.css';

const closeButton = props => {
    let btn = props.show ? 
        <button
            className={classes.CloseButton}
            onClick={props.onCancelRequest}
        >
            <img src={cancel} alt=""/>
        </button>
    :   null
    return (
        btn
    )
}

export default closeButton;