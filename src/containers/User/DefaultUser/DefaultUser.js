import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import axios from '../../../axios/axios-orders';

import classes from './DefaultUser.css';

import * as img from '../.../../../../assets/Images/index';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import DecoButton from '../../../components/UI/Button/DecoButton/DecoButton';
import AwardProgress from '../../../components/AwardProgress/AwardProgress';
import Coupon from '../../../components/Coupon/Coupon';

import {FaRegSmileBeam} from 'react-icons/fa';
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import {GiShoppingCart} from 'react-icons/gi'

import {getCurrentdate} from '../../../shared/utility'
import {coupon_5_bucks_off, coupon_5_bucks_off_150, coupon_15_bucks_off, coupon_free_delivery} from '../../../assets/Images/index';

class DefaultUser extends Component {
    state = {
        userName: 'User',
        yourCoupons: [
            {src: coupon_5_bucks_off_150,
            couponName:'$10 off with 100 points you get',
            couponDescription:'Get $10 credit for your next order when you reach 100 points. Coupon is automatically applied at checkout. This offer valid for member only.',
            promoCode:'Automatically applied at checkout',
            expireDate: 'Jan 01, 2023'}
        ],

        otherCoupons: [
            {src: coupon_free_delivery,
            couponName:'Free shipping orders of $100+',
            couponDescription:'Free express shipping on all purchases of $100 or more. Coupon is automatically applied at checkout. This offer valid for every customer.',
            promoCode:'Automatically applied at checkout',
            expireDate: 'Jan 01, 2023'},

            {src: coupon_5_bucks_off,
            couponName:'$5 off orders of $100+',
            couponDescription:'Save an extra $5 Off when using code on orders of $100 or more. Coupon is automatically applied at checkout. This offer valid for member only.',
            promoCode:'Automatically applied at checkout',
            expireDate: 'Jan 01, 2023'},

            {src: coupon_15_bucks_off,
            couponName:'$15 off orders of $250+',
            couponDescription:'Save an extra $15 Off when using code on orders of $250 or more. Coupon is automatically applied at checkout. This offer valid for member only.',
            promoCode:'Automatically applied at checkout',
            expireDate: 'Jan 01, 2023'}
        ]
    }

    // Generate number of Items in cart
    numberOfItemsInCartHandler = (cart) => {
        let numberOfItems = 0;

        // Cart is hiddened in database
        if(!cart) {
            return 0;
        }
        else {
            cart.forEach(item => {
                numberOfItems = numberOfItems + item['quantity']
            })
            return numberOfItems;
        }
    }

    componentDidMount = () => {
        // Get user name
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo=' + '"' + userId + '"';
        axios.get('/users.json' + queryParams)
            .then(response => {
                console.log(Object.values(response.data));
                // Object.values return array of value, in this situation, array has length 1
                this.setState({
                    userName: Object.values(response.data)[0].about.firstName
                    //  + ' ' + Object.values(response.data)[0].details.lastName
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let latestUpdate = getCurrentdate();

        return (
            <div className={classes.DefaultUser}>
                <div className={classes.Greating}>
                    {/* Greating */}
                    <h2>Hello {this.state.userName}!! Nice to see you today &nbsp;<FaRegSmileBeam/></h2>
                </div>


                {this.numberOfItemsInCartHandler(this.props.cart) > 0 ?                     
                <Aux>
                    <h3>In your shopping bag</h3>

                    {/* Number of Items in cart */}
                     <div>{this.numberOfItemsInCartHandler(this.props.cart)} {this.numberOfItemsInCartHandler(this.props.cart) > 1 ? 'ITEMS' : 'ITEM'}</div>
                    
                    {/* Items in cart */}
                    <div className={classes.ShoppingCart}>
                        {this.props.cart.map(dish => {
                            return <div className={classes.Image}>
                                        <img src={dish.image}/>
                                        <div className={classes.Description}>
                                            <span>{dish.label}</span>
                                            <span>x{dish.quantity}</span>
                                        </div>
                                    </div>})}
                    </div>

                    {/* Button navigate to Shopping Bag */}
                    
                    <div className={classes.NavButton}>
                        {/* <button onClick={() => this.props.history.push('/shopping-cart')}>
                            <span>View my shopping bag <GiShoppingCart/></span>
                        </button> */}
                        <DecoButton buttonClicked={() => this.props.history.push('/shopping-cart')}>
                            <span>Visit cart <GiShoppingCart/></span>
                        </DecoButton>
                    </div>
                </Aux> 
                : null }

                <div className={classes.Promotion}>
                    <div className={classes.CurrentPoint}>
                        <h3>Your points:</h3>
                        <p className={classes.Score}>50</p>
                        <p>(Earn <span style={{fontWeight: 'bold'}}>1 point</span> per <span style={{fontWeight: 'bold'}}>$2</span> you spent)</p>
                        <p>Last updated: {latestUpdate}</p>
                        <p> </p>
                        <AwardProgress/>
                    </div>

                    {/* Your Coupons */}
                    <div className={classes.YourCoupons}>
                        <h3>Your coupons:</h3>         
                        {this.state.yourCoupons.map((coupon, index) => {
                            return <div className={classes.CouponWrapper}> 
                                <Coupon
                                    key={index}
                                    src={coupon.src}
                                    couponName={coupon.couponName}
                                    couponDescription={coupon.couponDescription}
                                    promoCode={coupon.promoCode}
                                    couponDescription={coupon.couponDescription}
                                    expireDate={coupon.expireDate}
                                />
                            </div>})}
                    </div>

                    {/* Promotions */}
                    <div className={classes.OtherCouponsContainer}>
                        <h3>Other Promotions:</h3>
                        <div className={classes.OtherCoupons}>      
                        {this.state.otherCoupons.map((coupon, index) => {
                            return <div className={classes.CouponWrapper}> 
                                <Coupon
                                    key={index}
                                    src={coupon.src}
                                    couponName={coupon.couponName}
                                    couponDescription={coupon.couponDescription}
                                    promoCode={coupon.promoCode}
                                    expireDate={coupon.expireDate}
                                />
                            </div>})}  
                        </div>
                    </div>
                </div>

                {/* <div style={{fontWeight: '600', marginTop: '300px', height: '50px', textAlign: 'center', fontSize:'20px'}}>Buy $100 get FREE SHIPPING</div>
                <div className={classes.Slogan}>
                    <img src={img.slogan}/>
                </div>
                <div style={{fontWeight: '600', marginTop: '20px', height: '50px', textAlign: 'center', fontSize:'16px'}}>Did you know?? <AiOutlineQuestionCircle/></div>
                <div style={{fontWeight: '600', marginTop: '15px', height: '50px', textAlign: 'center', fontSize:'16px'}}>Enjoying delicious food is the best way to Relax...</div>    */}
            </div>
        )
    }   
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps, null)(withRouter(DefaultUser));