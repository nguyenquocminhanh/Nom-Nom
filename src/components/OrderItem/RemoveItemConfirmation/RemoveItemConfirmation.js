import React from 'react';

import classes from './RemoveItemConfirmation.css'

import Button from '../../UI/Button/Button';

const RemoveItemConfirmation = props => {
    return (
        <div className={classes.RemoveItemConfirmation}> 
            <p>Do you really want to remove {props.removedDish}?</p>
            <div className={classes.Buttons}>
            <Button btnType='Danger' clicked={props.refusedRemoveItem}>NO</Button>
            <Button btnType='Success' clicked={props.acceptRemoveItem}>YES</Button>
            </div>
        </div> 
    )
}  

export default RemoveItemConfirmation;