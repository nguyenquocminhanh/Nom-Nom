import React, {Component} from 'react';
import classes from './ShoppingCart.css';
import axios from '../../axios/axios-orders';

import * as actionCreators from '../../store/actions/index';

import {BiShoppingBag} from 'react-icons/bi';
import {FaMoneyCheckAlt} from 'react-icons/fa'

import Layout from '../../hoc/Layout/Layout';
import OrderItem from '../../components/OrderItem/OrderItem';
import Modal from '../../components/UI/Modal/Modal';
import RemoveItemConfirmation from '../../components/OrderItem/RemoveItemConfirmation/RemoveItemConfirmation';
import DecoButton from '../../components/UI/Button/DecoButton/DecoButton';

import {connect} from 'react-redux';
// Ko cần withRouter vì ShoppingCart connected directly to <Route/>
// import {withRouter} from 'react-router-dom';

class ShoppingCart extends Component {
    state = {
        isWarning: false,
        removeItemRequestId: 0,
    }

    // UPDATE_CART_PRICE after INCREASE_NUMBER_OF_ITEM
    // Ngay sau khi cart có sự thay đổi về item bên trong thì
    // update total price cart liền!!
    componentDidUpdate = (prevProps) => {
        if (prevProps.cart !== this.props.cart) {
            this.props.onUpdateCartPrice();
        }
    }
    // Check minimum number of Item when decreasing the quantity
    checkMinimumItem = (orderItemQuantity, orderItemId) => {
        // If quantity > 1 -> allowed to continue decrease
        if (orderItemQuantity > 1) {
            this.props.onDecreaseNumberItem(orderItemId)
        }
        // Otherwise, Request remove Item
        else {
            this.removeItemRequest(orderItemId);
        }
    }

    // Close Modal
    closeWarningHandler = () => {
        this.setState({
            isWarning:false,
            removeItemRequestId: null
        })
    }
    
    // Show Modal when isWarning is TRUE
    // Request to Remove Item
    removeItemRequest = (id) => {
        this.setState(
            {
                isWarning: true,
                removeItemRequestId: id
            }
        )
    }

    // Find Label of Food to be removed in Remove Confirmation
    findLabelOfRemovedItem = (id) => {
        // if id is null, removed dish's label is undefined
        if (id === null) {
            return undefined
        }
        // otherwise, find label
        else 
            return this.props.dishes[id]['label'];
    }

    //  Accept the request to Remove Item
    acceptRemoveItemHandler = (removedItemId) => {
        this.closeWarningHandler();
        this.props.onRemoveItem(removedItemId);
    }

    render () {      
        return (
            <Layout>
                <Modal 
                    // Modal shown when isWarning is TRUE
                    show={this.state.isWarning}
                    // Handler click close X button and backdrop
                    backdropClicked={this.closeWarningHandler}
                    closeOrderRequest={this.closeWarningHandler}
                > 
                    <RemoveItemConfirmation 
                        refusedRemoveItem={this.closeWarningHandler}
                        acceptRemoveItem={() => this.acceptRemoveItemHandler(this.state.removeItemRequestId)}
                        removedDish={this.findLabelOfRemovedItem(this.state.removeItemRequestId)}
                    />
                </Modal>
                
                {/* ShoppingCartWrapper includes ShoppingCart and TotalPrice */}
                <div className={classes.ShoppingCartWrapper}>

                    {/* ShoppingCart */}
                    <div className={classes.ShoppingCart}>
                        {/* Title */}
                        <div className={classes.Title}>
                            <p>Shopping Cart  <BiShoppingBag style={{marginTop: '1px'}}/></p>
                        </div>

                        {/* Check Empty Cart  */}
                        <div 
                            className={classes.Empty}
                            style={{display: this.props.cart ? (this.props.cart.length > 0? 'none' : 'flex') : 'flex'}}
                        >
                            <p>Ooops... Your Cart is Empty!</p>
                        </div>

                        {/* Items in Cart */}
                        {this.props.cart? 
                            this.props.cart.map(orderItem => {
                                return <OrderItem
                                    key={orderItem.id}
                                    label={orderItem.label}
                                    price={orderItem.price}
                                    image={orderItem.image}
                                    isLoved={this.props.dishes[orderItem.id].isLoved}

                                    quantity={orderItem.quantity}
                                    
                                    loveIconClicked={() => this.props.onClickLoveIcon(orderItem.id)}
                                    removeItem={() => this.removeItemRequest(orderItem.id)}
                                    increaseNumberItem={() => this.props.onIncreaseNumberItem(orderItem.id)}
                                    decreaseNumberItem={() => this.checkMinimumItem(orderItem.quantity, orderItem.id)}
                                />
                            })
                        : null}
                    </div>

                    {/* TotalPrice */}
                    <div className={classes.TotalPrice}>
                        {/* Title */}
                        <div className={classes.Title}>
                            <p>Total Price <FaMoneyCheckAlt style={{marginTop: '1px'}}/></p>
                        </div>

                        {/* Total Price */}
                        <div className={classes.Price}>
                            <p>Your total price is <span style={{fontWeight: '1000'}}>${this.props.totalCartPrice.toFixed(2)}</span></p>
                        </div>
                        <p>&nbsp;</p>
                        
                        {/* Two Direction Buttons */}
                        <div className={classes.Buttons}>
                            {/* GoBack Button */}
                                {/* Go Back to previous page in Pages stack */}
                            <DecoButton buttonClicked={() => this.props.history.goBack()}><span>Go Back</span></DecoButton>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>

                            {/* CheckOut Button */}
                            <div className={classes.CheckoutButton}
                                // If Cart is not emppty => checkout button appear
                                style={{display: this.props.cart ? (this.props.cart.length > 0? 'grid' : 'none') : 'none'}}
                            >   
                                {/*If isAuthenticated -> Checkout. Otherwise -> Login */}
                                {this.props.isAuthenticated ? 
                                    <DecoButton buttonClicked={() => this.props.history.push('/checkout')}><span>Checkout</span></DecoButton> 
                                    : 
                                    <div>
                                        {/* pass query to Sign In */}
                                        <DecoButton buttonClicked={() => this.props.history.push({pathname:'/sign-in', search:'?forwarding=true'})}><span>Login To Checkout</span></DecoButton>
                                        <p>&nbsp;</p>
                                        <div style={{textAlign: 'center'}}><span style={{color: 'rgba(0, 0, 0, 0.9)'}}>Or</span></div>
                                        <p>&nbsp;</p>
                                        <DecoButton buttonClicked={() => this.props.history.push('/checkout')}><span>Checkout As Guest</span></DecoButton>
                                    </div>
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.menuBuilder.dishes,
        cart: state.cart.cart,
        totalCartPrice: state.cart.totalCartPrice,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveItem: (id) => dispatch(actionCreators.removeItem(id)),
        onIncreaseNumberItem: (id) => dispatch(actionCreators.increaseNumberItem(id)),
        onDecreaseNumberItem: (id) => dispatch(actionCreators.decreaseNumberItem(id)),
        onUpdateCartPrice: () => dispatch(actionCreators.updateCartPrice()),
        onGetCartSuccess: (cart, totalCartPrice) => dispatch(actionCreators.getCartSuccess(cart, totalCartPrice)),
        onClickLoveIcon: (id) => dispatch(actionCreators.updateLovedItem(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);