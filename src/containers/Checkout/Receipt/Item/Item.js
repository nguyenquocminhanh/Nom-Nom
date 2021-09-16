import React from 'react';

import classes from './Item.css'

const item = props => {
    return (
        <div className={classes.Item}>
            <span className={classes.Description}>{props.label} <span></span> x{props.quantity}</span>
            <span className={classes.Price}>${(props.price * props.quantity).toFixed(2)}</span>
        </div>
    )
}

export default item;