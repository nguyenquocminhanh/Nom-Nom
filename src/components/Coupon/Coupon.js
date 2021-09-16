import React from 'react';
import classes from './Coupon.css';
import {logo} from '../../assets/Images/index'

const coupon = props => {
    return (
        <div className={classes.CouponContainer}>
            <div className={classes.Logo}>
                <h4>Ăn Gì Nom Nom</h4>
            </div>

            <div className={classes.CouponImage}>
                <img className={classes.CouponImg} src={props.src}/>
            </div>

            <div className={classes.CouponContain}>
                <h3>
                    {props.couponName}
                </h3>
                <p>
                    {props.couponDescription}
                </p>
            </div>

            <div className={classes.CouponUse}>
                <p>
                    Use Promo Code: <span className={classes.Code}>{props.promoCode}</span>
                </p>
                <p className={classes.Expire}>
                    Expires: {props.expireDate}  
                </p>
            </div>
        </div>
    )
};

export default coupon;
