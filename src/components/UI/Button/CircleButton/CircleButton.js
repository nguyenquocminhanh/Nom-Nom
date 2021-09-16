import React from 'react';

import classes from './CircleButton.css';

const circleButon = props => {
    return (
        <div className={classes.CircleButton} onClick={props.circleButtonClicked}>
            {props.children}
        </div>
    )
}

export default circleButon;