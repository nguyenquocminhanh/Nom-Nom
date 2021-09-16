import React, {Component} from 'react';

import classes from './Receipt.css'

import Item from './Item/Item';
import Input from '../../../components/UI/Input/Input';

class Receipt extends Component {
    render() {
        
        return (
            <div className={classes.ReceiptWrapper}>
                <div className={classes.StickyDiv}>
                    <div className={classes.Receipt}>
                        {/* Title */}
                        <div className={classes.Title}>
                            <p>Order Summary</p>
                        </div>
                        {/* Test */}
                        {/* Items */}
                        {/* fetch items from Cart in Redux store */}
                        {this.props.cart.map(item => {
                            // last item without symbol +
                            if (item.id === this.props.cart[this.props.cart.length - 1]['id']) {
                                return (<Item
                                    label={item.label}
                                    quantity={item.quantity}
                                    price={item.price}
                                />)
                            }
                            else {
                                return (
                                    <div>
                                        <Item
                                            label={item.label}
                                            quantity={item.quantity}
                                            price={item.price}
                                        />
                                        <div style={{fontSize: '20px'}}>+</div>
                                    </div>
                                )
                            }
                        })} 

                        {/* Shipping Fee */}
                        {this.props.isPickUp ? null: 
                            <div className={classes.Line}>
                                <p>+</p>
                                <Item
                                    label='Shipping Fee'
                                    quantity='1'
                                    price='5'
                                />
                            </div>
                        }
                        
                        {/* Total Checkout Price */}
                        <div className={classes.TotalPrice}>
                            <span className={classes.Description}>Total:</span>
                            <span className={classes.Price}>${this.props.totalPrice}</span>
                        </div>
                    </div>

                    <div className={classes.Instruction}>
                        <Input
                            inputType='textarea'
                            textareaValueChanged={(e) => this.props.textareaValueChanged(e)}
                            value={this.props.value}
                            placeHolder="Add your instructions here..."
                            rows={8}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Receipt;