import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {checked2} from '../../../../assets/Images/index';

// import action creator
import * as actionCreators from '../../../../store/actions/index';

// React-icons
import {MdKeyboardArrowDown} from 'react-icons/md'

// import utility
import {updateObject} from '../../../../shared/utility'
import {getCurrentdate} from '../../../../shared/utility';

import classes from './Order.css';

import OptionButton from '../../../../components/UI/Button/OptionButton/OptionButton';
import OrderAgainButton from '../../../../components/UI/Button/OptionButton/OrderAgainButton/OrderAgainButton';
import OrderDetails from './OrderDetails/OrderDetails';
import Modal from '../../../../components/UI/Modal/Modal';
import Rating from '../../../../components/Rating/Rating';
import Input from '../../../../components/UI/Input/Input';
import Review from './Review/Review';
import Tracking from '../../../../components/Tracking/Tracking';

import { VscOpenPreview } from 'react-icons/vsc';

class Order extends Component {
    state = {
        isTrackOrderClicked: false,
        isShowDetailsClicked: false,
        isOrderAgainClicked: false,
        isRateYourDishesClicked: false,
        isRateReviewClicked: false,
        // star from 0
        dishIsRating: 0,
        ratingArray: [],
        // id is unique id of dish
        // [{index: 0, id: 1, rate: 5}, {index: 1, id: 4, rate: 4}, {index: 2, id: 2, rate: 5}, {index: 3, id: 5, rate: 3}],

        starIsHovered: null,
        starIsPicked: null,
        tempStarIsPicked: null,

        isRated: false,
        dayRated: null,

        // Tracking - should get from database
        isOrdered: true,
        isReceived: true,
        isPrepared: false,
        isDelivered: false,
        isPickedup: false
    }

    viewOrderDetailsHandler = () => {
        this.setState(prevState => {
            return {
                isTrackOrderClicked: false,
                isShowDetailsClicked: !prevState.isShowDetailsClicked,
                isRateYourDishesClicked: false
            }
        })
    }

    closeModalHandler = () => {
        this.setState({
            isTrackOrderClicked: false,
            isShowDetailsClicked: false,
            isRateYourDishesClicked: false,
            isRateReviewClicked: false
        })
        document.body.style.overflow = 'auto'
    }

    orderAgainClickedHandler = () => {
        this.setState({
            isOrderAgainClicked: true
        })
        this.props.arrayDishes.forEach(dish => {
            this.props.onAddToCart(this.props.dishes[dish.id], dish.quantity)
        })
    }

    rateDishesHandler = () => {
        this.setState({
            isTrackOrderClicked: false,
            isRateYourDishesClicked: true,
            isRateReviewClicked: false,
            dishIsRating: 0
        })
        document.body.style.overflow = 'hidden';
        document.body.scrollTo
    }

    increaseButtonClickedHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                dishIsRating: prevState.dishIsRating + 1,
            }
        })
    }


    decreaseButtonClickedHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                dishIsRating: prevState.dishIsRating - 1,
            }
        })
    }

    onHoveredStarHandler = (star) => {
        if (this.state.starIsPicked === star) {
            this.setState({
                starIsHovered: star - 1,
            })
        }

        else if (star < this.state.starIsPicked) {
            this.setState({
                tempStarIsPicked: this.state.starIsPicked,
                starIsPicked: null
            })
        }

        this.setState({
            starIsHovered: star,
        })
    }

    onPickedStarHandler = (star) => {
        // localStorage.setItem('star', id);
        let updatedRatingArray = []
        this.state.ratingArray.forEach((ele, index) => {
            // updated array
            if (ele.id === this.props.arrayDishes[this.state.dishIsRating].id) {
                this.state.ratingArray[index].rate = star;
                updatedRatingArray = [...this.state.ratingArray];
            }
            return;
        })
        // push new ele
        if (updatedRatingArray.length === 0) {
            updatedRatingArray = [...this.state.ratingArray, {index: this.state.dishIsRating, id: this.props.arrayDishes[this.state.dishIsRating].id, rate: star}]
        }


        this.setState({
            starIsPicked: star,
            starIsHovered: null,
            tempStarIsPicked: null,
            ratingArray: updatedRatingArray
        });
    }

    onMouseOutRateHandler = () => {
        this.setState(prevState => {
            return {
                starIsHovered: null,
                starIsPicked: this.state.tempStarIsPicked !== null ? this.state.tempStarIsPicked : prevState.starIsPicked
            }
        })
    }

    submitFeedbackHandler = () => {
        // xử lý ratingArray và dayRated here...

        this.setState({
            isRateYourDishesClicked: false,
            isRated: true,
            dayRated: getCurrentdate()
        })
        document.body.style.overflow = 'auto';
    }

    onReviewRateRequestHandler = () => {
        this.setState({
            isTrackOrderClicked: false,
            isRateYourDishesClicked: false,
            isRateReviewClicked: true,
            dishIsRating: 0,
        })
        document.body.style.overflow = 'hidden'
    }

    // Track order
    trackOrderHandler = () => {
        this.setState({
            isTrackOrderClicked: true,
            isShowDetailsClicked: false,
            isRateYourDishesClicked: false
        })

        document.body.style.overflow = "hidden"
    }

    componentDidMount = () => {
        this.setState({isOrderAgainClicked: false});
    }


    // get số sao rating của mỗi món ăn đã rate
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.dishIsRating !== this.state.dishIsRating) {
            let currentStar = null;
            this.state.ratingArray.forEach(ele => {
                if (ele.id === this.props.arrayDishes[this.state.dishIsRating].id) {
                    currentStar = ele.rate
                }
            })
            this.setState({
                starIsPicked: currentStar
            })
        }
    }

    render() {
        return (
            <div className={classes.Order}>
                {/* Rating Modal */}
                <Modal 
                    modalType={"RatingModal"}
                    show={this.state.isRateYourDishesClicked}
                    backdropClicked={this.closeModalHandler}>
                        {/* {this.props.arrayDishes.map(dish => { */}
                        <div className={classes.ModalContent}>
                            {/* Description */}
                            <div className={classes.Description}>    
                                <p style={{fontWeight: '700', textAlign: 'center', marginTop: '0'}} className={classes.RateTitle}>Rate {this.props.arrayDishes[this.state.dishIsRating].label}</p>
                                
                                <div className={classes.ImageRating}>
                                    <img src={this.props.arrayDishes[this.state.dishIsRating].image}/> 
                                </div>
                            </div>
                            
                            {/* Rating */}
                            <Rating 
                                key={this.state.dishIsRating}
                                onHoveredStar={this.onHoveredStarHandler}
                                onPickedStar={this.onPickedStarHandler}
                                onMouseOutRate={this.onMouseOutRateHandler}
                                
                                starIsHovered={this.state.starIsHovered}
                                starIsPicked={this.state.starIsPicked}
                                />
                            
                            {/* Comments */}
                            <div className={classes.Comment}>
                                <Input
                                    inputType={'textarea'}
                                    placeHolder="Write a review..."
                                    rows={2}/>
                            </div>
                            
                            {/* Buttons */}
                            {this.props.arrayDishes.length === 1 ? null :
                                <div className={classes.IncDecButtons}>

                                    {/* decrease button */}
                                    {this.state.dishIsRating === 0 ?
                                    <div className={classes.IncrementButton}>
                                        <OptionButton 
                                            isDisabled={true}>
                                                Previous
                                        </OptionButton> 
                                    </div> : 
                                    <div className={classes.IncrementButton}>
                                        <OptionButton 
                                            onOptionRequest={this.decreaseButtonClickedHandler}
                                            isAvailable={true}>
                                                Previous
                                        </OptionButton> 
                                    </div>} 

                                    {/* increase button */}
                                    {this.state.dishIsRating === this.props.arrayDishes.length - 1 ?
                                    <div className={classes.IncrementButton}>
                                        <OptionButton
                                            isDisabled={true}>
                                                Next
                                        </OptionButton> 
                                    </div> : 
                                    <div className={classes.IncrementButton}>
                                        <OptionButton
                                            onOptionRequest={this.increaseButtonClickedHandler}
                                            isAvailable={true}>
                                                Next
                                        </OptionButton> 
                                    </div>}
                                </div>}
                            
                            {/* Thank you & Submit Button - handle ratingArray and edit database rate field */}
                            {this.state.ratingArray.length === this.props.arrayDishes.length ?
                            <div className={classes.Submit}>        
                                <p className={classes.Thankyou} style={{fontWeight: '700', textAlign: 'center'}}>Thank you for your feedback</p>
                                <div className={classes.SubmitButton}>
                                    <OrderAgainButton
                                        onOrderAgainRequest={this.submitFeedbackHandler}>
                                            Submit Feedback
                                    </OrderAgainButton>
                                </div>
                            </div> : 
                            <div className={classes.Submit}>
                                <p style={{fontWeight: '100', textAlign: 'center'}} className={classes.DishesLeft}>You have <span style={{fontWeight: '700'}}>{this.props.arrayDishes.length - this.state.ratingArray.length}</span> {this.props.arrayDishes.length - this.state.ratingArray.length === 1 ? 'dish' : 'dishes'} left to be rated</p>
                            </div>}
                        </div>
                </Modal>

                {/* Rating Review Modal */}
                {this.state.isRateReviewClicked ? 
                <Modal
                    modalType={"RatingReviewModal"}
                    show={this.state.isRateReviewClicked}
                    backdropClicked={this.closeModalHandler}
                    >
                        <div className={classes.ModalRatingReviewContent}>
                            <p className={classes.RateReviewTitle}>
                                Your rate was on &nbsp;{this.state.dayRated}
                            </p>

                            <div className={classes.ModalRatingReview}>
                                {this.state.ratingArray.map(ele => {
                                    return <Review
                                        img={this.props.arrayDishes[ele.index].image}
                                        label={this.props.arrayDishes[ele.index].label}
                                        stars={ele.rate}/>
                                })}
                            </div>
                        </div>
                </Modal> : null}

                {/* Tracking Order Modal */}
                <Modal
                    modalType={"TrackingModal"}
                    show={this.state.isTrackOrderClicked}
                    backdropClicked={this.closeModalHandler}
                    >
                        <Tracking
                            isOrdered={this.state.isOrdered}
                            isReceived={this.state.isReceived}
                            isPrepared={this.state.isPrepared}
                            isDelivered={this.state.isDelivered}
                            isPickedup={this.state.isPickedup}
                            trackingNumber={this.props.confirm}
                            fullName={this.props.fullName}
                            addressLine1={this.props.addressLine1}
                            addressLine2={this.props.addressLine2}/>
                </Modal>

                {/* Title */}
                <div className={classes.HeadOrder}>
                    <div className={classes.OrderInfo}>
                        <div className={classes.OrderPlaced}>
                            <p>
                                ORDER PLACED
                            </p>
                            <p>
                                {this.props.date}
                            </p>
                        </div>
                        <div className={classes.OrderTotal}>
                            <p>
                                TOTAL
                            </p>
                            <p>
                                ${this.props.price}
                            </p>
                        </div>
                        <div className={classes.ShipTo}>
                            <p>
                                SHIP TO
                            </p>
                            <p className={classes.CustomerName}>
                                <span className={classes.Name}>{this.props.fullName}</span> &nbsp; <MdKeyboardArrowDown className={classes.ArrowDown}/>
                                <div className={classes.Popover}>
                                    <ul className={classes.PopoverContent} style={{listStyleType: 'none', padding: '0', margin: '0'}}>
                                        <li className={classes.FullName}>
                                            {this.props.fullName}
                                        </li>
                                        <li className={classes.AddressLine1} style={{textTransform: 'uppercase'}}>
                                            {this.props.addressLine1}
                                        </li>
                                        <li className={classes.AddressLine2} style={{textTransform: 'uppercase'}}>
                                            {this.props.addressLine2}
                                        </li>
                                        <li className={classes.Country}>
                                            United States
                                        </li>
                                        <li className={classes.PhoneNumber}>
                                            Phone: {this.props.phone}
                                        </li>
                                    </ul>
                                </div>
                            </p>
                        </div>
                    </div>

                    <div className={classes.OrderNumber}>
                        <p>
                            ORDER #
                        </p>
                        <p>
                            {this.props.confirm}
                        </p>
                    </div>
                    
                </div>

                <div className={classes.ContentOrder} style={{borderRadius: this.state.isShowDetailsClicked ? '0 0 0 0' : '0 0 8px 8px'}}>
                    <div className={classes.Content}>
                        <span className={classes.OrderStatus}>Your order is being prepared</span>
                        {/* List of Images */}
                        <div className={classes.ListOfImages}>
                            {this.props.arrayDishes.map(dish => {
                                return <div className={classes.Image}>
                                            <img src={dish.image}/>
                                            <div className={classes.Description}>
                                                <span>{dish.label}</span>
                                                <span>x{dish.quantity}</span>
                                            </div>
                                        </div>})
                            }
                        </div>
                    </div>
                    
                    <div className={classes.Buttons}>
                        <OptionButton 
                            isOptionClicked={this.state.isTrackOrderClicked}
                            onOptionRequest={this.trackOrderHandler}>
                                Track order
                        </OptionButton>

                        <OptionButton 
                            isOptionClicked={this.state.isShowDetailsClicked}
                            onOptionRequest={this.viewOrderDetailsHandler}>
                                View order details 
                        </OptionButton>

                        <OrderAgainButton 
                            onOrderAgainRequest={this.orderAgainClickedHandler} 
                            isOrderAgainClicked={this.state.isOrderAgainClicked}
                            >
                                {this.state.isOrderAgainClicked ? <p className={classes.Added}><img src={checked2}/> &nbsp; Added to your cart</p> : 'Order again'} 
                        </OrderAgainButton>
                        
                        {/* Each User only rate once */}
                        {this.state.isRated? 
                        <OptionButton
                            isOptionClicked={this.state.isRateReviewClicked}
                            onOptionRequest={this.onReviewRateRequestHandler}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><VscOpenPreview/>&nbsp; Review your rate</span>
                        </OptionButton>
                        : <OptionButton 
                            isOptionClicked={this.state.isRateYourDishesClicked}
                            onOptionRequest={this.rateDishesHandler}>
                                Rate your dishes
                        </OptionButton>}
                    </div>
                </div>

                {/* Order Details */}
                {this.state.isShowDetailsClicked ? 
                    <OrderDetails
                        fullname={this.props.fullName}
                        confirm={this.props.confirm}
                        date={this.props.date}
                        isPickUp={this.props.isPickUp}
                        items={this.props.numberOfItem}
                        price={this.props.price}
                        addressLine1={this.props.addressLine1}
                        addressLine2={this.props.addressLine2}
                        phone={this.props.phone}
                        email={this.props.email}
                        arrayDishes={this.props.arrayDishes}
                        expectedTime={this.props.expectedTime}
                    /> 
                    : 
                    null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.menuBuilder.dishes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (dish, amount) => dispatch(actionCreators.addToCart(dish, amount)),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));