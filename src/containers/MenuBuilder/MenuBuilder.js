import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './MenuBuilder.css';

// Import withRouter
// Ko cần withRouter vì MenuBuilder connected directly to <Route/>
// import {withRouter} from 'react-router-dom';

// import action creator
import * as actionCreators from '../../store/actions/index';

// import Utility Function 'cacheImages'
import {cacheImages} from '../../shared/utility';

// import components
import Dishes from '../../components/Dishes/Dishes';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Dishes/OrderSummary/OrderSummary';
import Layout from '../../hoc/Layout/Layout';
import CircleButton from '../../components/UI/Button/CircleButton/CircleButton';
import Loading from '../../components/Loading/Loading';

class MenuBuilder extends Component {
    state = {
        isPicking: false,
        pickedDishId: null,
        currenTotalPrice: 0,
        numberOfPickedDish: 0,

        isLoaded: false
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
                currenTotalPrice: 0,
                numberOfPickedDish: 0
            }
        )
    }

    // Click add to cart button, the modal will disappear and cart updated
    addToCartHandler = async (pickedDish, amount) => {
        this.props.onAddToCart(pickedDish, amount);
        this.closeOrderHandler();
        return;
    }


    // Async Function, when finished addToCartHandler mới tới chuyển link /checkout
    proceedToCheckOutHandler = async(pickedDish, amount) => {
        // Add that Item and previous added items 
        // to Cart and then redirect to checkout
        try {
            await this.addToCartHandler(pickedDish, amount);
            this.props.history.push('/checkout');
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

    cacheImagesHandler = async (srcArray) => {
        // Utility
        await cacheImages(srcArray);

        setTimeout(() => {
            this.setState({
                isLoaded: true
            })
        }, 2000)
    }

    componentDidMount = () => {
        const imgs = [...this.props.dishes];
        this.cacheImagesHandler(imgs);
    }


    render() {
        // prevent error when clicking backdrop, selectedDish is NULL
        // and orderSummary couldn't rad READ dish with null id
        let orderSummary =
            this.state.pickedDishId !== null ? 
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
                {/* Appear Loading interface while images of dishes are loading */}
                {this.state.isLoaded ?
                    <div className={classes.MenuBuilder}>    
                    {/* Circle Button     */}
                        <CircleButton circleButtonClicked={() => {this.props.history.push('/checkout')}}>Checkout</CircleButton>
                  
                    {/* When isPicking is TRUE, the Modal is visible by css */}
                        <Modal 
                            closeButtonExist={true}
                            show={this.state.isPicking}
                            // Handler click close X button and backdrop
                            backdropClicked={this.closeOrderHandler}
                            closeOrderRequest={this.closeOrderHandler}
                            > 
                                <div className={classes.ModalContent}>
                                    {orderSummary}
                                </div>
                        </Modal>

                    {/* Ads */}
                        <div className={classes.Ads} onClick={() => {this.props.history.push('/menu')}}>
                            <span>Buy $50 get free shipping / Buy $100 get $10 discount</span>
                        </div>
                    
                    {/* Dishes */}
                        <Dishes
                            dishes={this.props.dishes}
                            isPicking={this.isPickingHandler}
                            loveIconClicked={this.props.onClickLoveIcon}
                        />
                    </div> 
                : <Loading/>}
            </Layout>
        );
    }
}

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


export default connect(mapStateToProps, mapDispatchToProps)(MenuBuilder);