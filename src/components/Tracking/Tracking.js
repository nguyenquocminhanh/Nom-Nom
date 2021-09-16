import React from 'react';
import classes from './Tracking.css'

import Stage from './Stage/Stage';

import {MdKeyboardArrowRight} from 'react-icons/md'

const tracking = props => {
    return (
        <div className={classes.TrackingContainer}>
            <div className={classes.Title}>
                Order  <span className={classes.OrderNumber}>#{props.trackingNumber} </span> 
                <div className={classes.Popover}>
                    <ul className={classes.PopoverContent} style={{listStyleType: 'none', padding: '0', margin: '0'}}>
                        <li className={classes.AddressTitle} style={{color: '#002F36', fontWeight: '900'}}>
                            Address info
                        </li>
                        <li className={classes.FullName}>
                            {props.fullName}
                        </li>
                        <li className={classes.AddressLine1} style={{textTransform: 'uppercase'}}>
                            {props.addressLine1}
                        </li>
                        <li className={classes.AddressLine2} style={{textTransform: 'uppercase'}}>
                            {props.addressLine2}
                        </li>
                    </ul>
                </div>
            </div>
            
            {/* Ordered ... on day ... */}
            <Stage 
                    isChecked={props.isOrdered}
                    isNextStageChecked={props.isReceived}
                    isLastStage={false}>
                Ordered Monday, August 23
            </Stage>

            {/* Order received  ... on day ...*/}
            <Stage 
                    isChecked={props.isReceived}
                    isNextStageChecked={props.isPrepared}
                    isLastStage={false}>
                Order Received Tuesday, August 24
            </Stage>
            
            {/* Order is being prepared, day ... */}
            <Stage
                    isChecked={props.isPrepared}
                    isNextStageChecked={props.isDelivered}
                    isLastStage={false}>
                Being Prepared Wednesday, August 25
            </Stage>

            {/* Order was delivered/ picked up, day... */}
            <Stage
                    isChecked={props.isDelivered}
                    isLastStage={true}>
                Delivered Wednesday, August 25
            </Stage>
        </div>
    )
};

export default tracking;
