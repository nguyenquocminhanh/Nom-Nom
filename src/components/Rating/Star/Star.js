import React from 'react';
import classes from './Star.css'

const star = props => {
    let attachedClasses = [classes.Star, ''];

    if (props.isGolden) {
        attachedClasses = [classes.Star, classes.IsGolden];
    }

    if (props.isBlue) {
        attachedClasses = [classes.Star, classes.IsBlue];
    }

    return (
        <div className={attachedClasses.join(' ')}>

        </div>
    )
};

export default star;
