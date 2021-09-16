import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './LovedItems.css';

import * as actionCreators from '../../store/actions/index';

import Layout from '../../hoc/Layout/Layout';
import Dish from '../../components/Dishes/Dish/Dish';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Dishes/OrderSummary/OrderSummary';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import {AttentionSeeker} from 'react-awesome-reveal';

class LovedItems extends Component {

// From here to Render() Same As MenuBuilder    
    state = {
        isPicking: false,
        pickedDishId: null,
        currenTotalPrice: 0,
        numberOfPickedDish: 0
    }

    isPickingHandler = id => {
        this.setState(
            {
                isPicking: true,
                pickedDishId: id
            }
        )
    }

    updateCurrentPriceHandler = (quantity) => {
        const updatedTotalPrice = this.props.dishes[this.state.pickedDishId].price * quantity;
        this.setState({
            currenTotalPrice: updatedTotalPrice,
            numberOfPickedDish: quantity,
        })
    }

    closeOrderHandler = () => {
        this.setState(
            {
                isPicking: false,
                pickedDishId: null,
                currenTotalPrice: 0,
                numberOfPickedDish: 0
            }
        )
    }

    // Click add to cart button, the modal will disappear and cart updated
    addToCartHandler = async (dish, amount) => {
        this.props.onAddToCart(dish, amount);
        this.closeOrderHandler();
    }

    // Async Function, when finished addToCartHandler mới tới chuyển link /checkout
    proceedToCheckOutHandler = async(pickedDish, amount) => {
        // Add that Item and previous added items 
        // to Cart and then redirect to checkout
        try {
            await this.addToCartHandler(pickedDish, amount);
            return this.props.history.push('/checkout');
        }
        catch (e) {
            console.log(e)
        };
    }

    // UPDATE_CART_PRICE after ADD_TO_CART
    // cart có sự thay đổi thì update total price cart sau đó liền
    componentDidUpdate = (prevProps) => {
        if (prevProps.cart !== this.props.cart) {
            this.props.onUpdateCartPrice();
        }
    }

    render() {
        // Check if there is any lovedDishes
        let lovedDishes;
        if (this.props.dishes.filter(dish => dish.isLoved == true).length > 0) {
        lovedDishes = 
            (<div className={classes.LovedDishes}>
                {this.props.dishes.filter(dish => 
                    dish.isLoved === true).map(lovedDish => {
                        return <Dish 
                            key={lovedDish.id}
                            id={lovedDish.id}
                            name={lovedDish.label} 
                            price={lovedDish.price}
                            imgSrc={lovedDish.image}
                            stars={lovedDish.stars}
                            addToCart={() => this.isPickingHandler(lovedDish.id)}
                            isLoved={lovedDish.isLoved}
                            // Users can not click love Icon in Loved-items
                            loveIconClicked={() => this.props.onClickLoveIcon(lovedDish.id)}
                        />
                })}
            </div>)
        }

        else {
            lovedDishes = 
                (<div className={classes.NoLovedDishes}>
                    <span>You haven't loved any Dishes yet...</span>
                </div>) 
        }

        // Order Summary
        let orderSummary =
            this.state.isPicking ? 
            <OrderSummary 
                // Information of CHOSEN DISH
                chosenDish={this.props.dishes[this.state.pickedDishId]}
                // Handler for ADD CART BUTTON
                addCartClicked={() => this.addToCartHandler(this.props.dishes[this.state.pickedDishId], this.state.numberOfPickedDish)}
                // Handler Check Out
                checkoutClicked={() => this.proceedToCheckOutHandler(this.props.dishes[this.state.pickedDishId], this.state.numberOfPickedDish)}
                // Update temporary price when incresase quantity
                updateCurrentPrice={this.updateCurrentPriceHandler}
                currentPrice={this.state.currenTotalPrice}
                numberOfPickedDish={this.state.numberOfPickedDish}
            /> : null;

        return (
            <Layout>
                <div className={classes.LovedItems}>
                    {/* Modal */}
                    <Modal 
                        show={this.state.isPicking}
                        // Handler click close X button and backdrop
                        backdropClicked={this.closeOrderHandler}
                        closeOrderRequest={this.closeOrderHandler}
                    > 
                        <div className={classes.ModalContent}>
                            {orderSummary}
                        </div>
                    </Modal>

                    {/* Title */}
                    <div className={classes.Title}>
                        <p>Dishes You Have Loved</p>
                    </div>
                    
                    {/* Loved Dishes */}
                    {lovedDishes}
                    
                    <AttentionSeeker style={{position: 'absolute', bottom: '0', paddingBottom: '50px', width: '100%'}}>
                        <div className={classes.Title}><p style={{fontStyle: 'italic'}}>We are so glad you loved our dishes!</p></div>   
                    </AttentionSeeker>
                </div>
            </Layout>
        )
    }
}

// From here to Underneath Same As MenuBuilder   
const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        dishes: state.menuBuilder.dishes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (dish, amount) => dispatch(actionCreators.addToCart(dish, amount)),
        onUpdateCartPrice: () => dispatch(actionCreators.updateCartPrice()),
        onClickLoveIcon: (id) => dispatch(actionCreators.updateLovedItem(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LovedItems);