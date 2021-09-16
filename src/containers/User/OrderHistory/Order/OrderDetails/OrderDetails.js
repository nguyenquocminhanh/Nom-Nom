import React from 'react';
import {connect} from 'react-redux';

import classes from './OrderDetails.css';

import {MdLocalShipping} from 'react-icons/md';
import {FaStore} from 'react-icons/fa';

const orderDetails = props => {
    return (
        <div className={classes.OrderDetails}>
            {/* Details */}
            <span className={classes.Title}>Order Details</span>
            <div className={classes.DetailsContent}>
                <div className={classes.ShippingAddress}>
                    <div className={classes.Head}>
                        {props.isPickUp ? 'Pick Up Address' : 'Shipping Address'}
                    </div>

                    {props.isPickUp ? 
                    <ul className={classes.ShippingAddressList} style={{listStyleType: 'none', padding: '0', margin: '0'}}>
                        <li className={classes.AddressLine1} style={{textTransform: 'uppercase'}}>
                            9 Lonsdale St Apt 3
                        </li>
                        <li className={classes.AddressLine2} style={{textTransform: 'uppercase'}}>
                            Boston
                        </li>
                        <li className={classes.Country}>
                            United States
                        </li>
                    </ul>
                    
                    : <ul className={classes.ShippingAddressList} style={{listStyleType: 'none', padding: '0', margin: '0'}}>
                        <li className={classes.FullName}>
                            {props.fullname}
                        </li> 
                        <li className={classes.AddressLine1} style={{textTransform: 'uppercase'}}>
                            {props.addressLine1}
                        </li>
                        <li className={classes.AddressLine2} style={{textTransform: 'uppercase'}}>
                            {props.addressLine2}
                        </li>
                        <li className={classes.Country}>
                            United States
                        </li>
                        {/* <li className={classes.PhoneNumber}>
                            Phone: {props.phone}
                        </li> */}
                    </ul>}
                </div>
                
                <div className={classes.DeliveryOption}>
                    <div className={classes.Head}>
                        Delivery Option
                    </div>
                    
                    {props.isPickUp ? <p><FaStore/> &nbsp; Pick up</p> : <p><MdLocalShipping/> &nbsp; Standard delivery</p>}
                    
                </div>

                <div className={classes.PaymentMethod}>
                    <div className={classes.Head}>
                        Payment Method
                    </div>
                </div>

                <div className={classes.OrderSummary}>
                    <div className={classes.Head}>
                        Order Summary
                    </div>
                    <ul className={classes.OrderSummaryList} style={{listStyleType: 'none', padding: '0', margin: '0'}}>
                        {props.arrayDishes.map(dish => {
                            return <li className={classes.PricePerDish}>
                                        <span className={classes.DishLabel}>
                                            {dish.label} x{dish.quantity}
                                        </span>
                                        <span className={classes.DishPrice}>
                                            ${(props.dishes[dish.id].price * parseFloat(dish.quantity)).toFixed(2)}
                                        </span>
                                    </li>
                        })}
                        {props.isPickUp ? 
                        null :
                        <li className={classes.PricePerDish}>
                            <span className={classes.DishLabel}>
                                Shipping & Handling
                            </span>
                            <span className={classes.DishPrice}>
                                $5.00
                            </span>
                        </li>}

                        <li className={classes.TotalPrice}>
                            <span className={classes.TotalPriceTitle}>
                                Grand Total:
                            </span>
                            <span className={classes.Price}>
                                ${props.price}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <h5>Order</h5>
            <div>#{props.confirm}</div>
            <div>{props.date}</div>
            
            <h5>Shipment Method</h5>
            <div>{props.isPickUp ? 'Pick Up' : 'Delivery'}</div>

            <h5>Payment</h5>
            <div>Cash</div> 
            
            Address
            <h4>Address</h4>
            <div>{props.isPickUp ? '9 Lonsdale St, Dorchester, MA 02124' : props.address}</div>
            <div>{props.isPickUp ? '8572694891' : props.phone}</div>
            <div>{props.isPickUp ? null : props.email}</div>

            <h4>Order Total</h4>
            <div>
                <span className={classes.NumberOfItems}>{props.items} {props.items > 1? 'items' : 'item'}</span>
                <span className={classes.Price}>${props.price}</span>
            </div> */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        dishes: state.menuBuilder.dishes,
    }
}

export default connect(mapStateToProps, null)(orderDetails);