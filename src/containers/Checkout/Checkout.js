import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Checkout.css';

import * as actionCreators from '../../store/actions/index';

import Layout from '../../hoc/Layout/Layout';
import Receipt from './Receipt/Receipt';
import ShippingInfo from './ShippingInfo/ShippingInfo';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios/axios-orders';
import {getCurrentdate} from '../../shared/utility';

class Checkout extends Component {
    state = {
        isPickUp: false,
        // Spinner
        isLoading: false,
        // Instructions
        notes: null
    }

    textareaValueChangedHandler = (event) => {
        event.preventDefault();
        const updatedNote = event.target.value;
        this.setState({
            notes: updatedNote
        })
    }

    deliverySelectedHandler = () => {
        this.setState({
            isPickUp: false
        })
    }

    pickUpSelectedHandler = () => {
        this.setState({
            isPickUp: true
        })
    }

    // submit order to server
    submitFormClickedHandler = (event, shippingInfo) => {
        event.preventDefault();
        // spinner is rotating
        this.setState({
            isLoading: true
        })

        // shorten cart
        let shortenedCart = [];
        this.props.cart.forEach(item => {
            shortenedCart.push({
                label: item.label,
                quantity: item.quantity,
                id: item.id
            })
        })

        const customerOrder = {
            order: shortenedCart, // array of JS Objects
            price: this.state.isPickUp ? this.props.totalCartPrice.toFixed(2) : (this.props.totalCartPrice + 5).toFixed(2),
            isPickUp: this.state.isPickUp,
            date: getCurrentdate(),
            shippingInfo: shippingInfo,
            userId: this.props.userId,
            notes: this.state.notes
        }

        // muốn all customer đều có thể order
        axios.post('/orders.json', customerOrder)
            .then(response => {
                // when send request successfully, spinner is off
                this.setState({isLoading: false})
                // Empty Cart trong state
                this.props.onEmptycart();
                // empty cart trong localStorage []
                localStorage.setItem('cart', JSON.stringify({cart: [], totalCartPrice: 0}))
                // xóa cart trong DB
                

                // Navigate to confirmation page/ passing response.data.name to querry param
                this.props.history.replace({pathname: '/confirmation', search: '?' + 'confirm=' + response.data.name});
            })
            // If dont have catch error, the code in then() block still be executed when
            // there is error
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let spinner = this.state.isLoading ? 
            <Modal show={this.state.isLoading}>
                <Spinner/>
                <p style={{textAlign: 'center'}}>Please wait... while we're preparing your Order</p> 
            </Modal> : null

        return (
            <Layout>
                {spinner}

                <div className={classes.Wrapper}>
                    {/* Shipping Info */}
                    <ShippingInfo 
                        isPickUp={this.state.isPickUp}
                        deliverySelected={this.deliverySelectedHandler}
                        pickUpSelected={this.pickUpSelectedHandler}
                        submitFormClicked={this.submitFormClickedHandler}
                    />

                    {/* Receipt */}
                    <Receipt
                        cart={this.props.cart}
                        totalPrice={this.state.isPickUp ? this.props.totalCartPrice.toFixed(2) : (this.props.totalCartPrice + 5).toFixed(2)}     
                        isPickUp={this.state.isPickUp}  
                        textareaValueChanged={this.textareaValueChangedHandler}
                        value={this.state.notes}
                    />
                </div>
                
            </Layout>
        )
    }
}

const mapStateToProps = state => {
   return {
        cart: state.cart.cart,
        totalCartPrice: state.cart.totalCartPrice,
        userId: state.auth.userId,
   }
}

const mapDispatchToProps = dispatch => {
    return {
        onEmptycart: () => dispatch(actionCreators.emptyCart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);