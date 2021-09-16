import React from 'react';

import classes from './OrderItem.css';

import * as img from '../../assets/Images/index';

const orderItem = props => {
    
    let attachedClasses = [classes.LikeButton, ''];
    if (props.isLoved) {
        attachedClasses = [classes.LikeButton, classes.Active];
    }

    return(
        <div className={classes.OrderItem}>
            {/* 2 Buttons */}
            <div className={classes.Buttons}>
                <span className={classes.DeleteButton} onClick={props.removeItem}></span>
                <span className={attachedClasses.join(' ')} onClick={props.loveIconClicked}></span>
            </div>

            {/* Images */}
            <div className={classes.Image}>
                <img src={props.image} alt=""/>
            </div>

            {/* Description */}
            <div className={classes.Description}>
                <span>{props.label}</span>
            </div>

            {/* Quantity */}
            <div className={classes.Quantity}>
                {/* Decrease number of an Item */}
                <button className={classes.MinusButton} onClick={props.decreaseNumberItem}>
                    <img src={img.minus} alt="minus"/>
                </button>

                <span>{props.quantity}</span>

                {/* Increase number of an Item */}
                <button className={classes.PlusButton} onClick={props.increaseNumberItem}>
                    <img src={img.plus} alt="plus"/>
                </button>
            </div>

            {/* Total Price */}
            <div className={classes.TotalPrice}>
                <span>${(props.price * props.quantity).toFixed(2)}</span>
            </div>
        </div>
    )   
}

export default orderItem;