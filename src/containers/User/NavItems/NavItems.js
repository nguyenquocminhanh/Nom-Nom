import React from 'react';
import classes from './NavItems.css'
import { withRouter } from 'react-router-dom';

import NavItem from './NavItem/NavItem';

import {FaHistory} from 'react-icons/fa';
import {ImProfile} from 'react-icons/im';
import {MdSecurity} from 'react-icons/md';
import {FiLogOut} from 'react-icons/fi';

const navItems = props => {
    console.log(props.match.url)
    return (
        <ul className={classes.NavItems}>
            {/* Order History*/} 
            <NavItem targetLink='/my-account/order-history' type='Order History'>  
                {/* <FaHome className={classes.Icon}/> */}
                <FaHistory className={classes.Icon}/>
            </NavItem>

            {/* User Profile */}
            <NavItem targetLink='/my-account/profile' type='Profile'>  
                {/* <FaUtensils className={classes.Icon}/> */}
                <ImProfile className={classes.Icon}/>
            </NavItem>
                
            {/* Security */}
            <NavItem targetLink={'/my-account/security'} type='Security'>  
                {/* <FaHeart className={classes.Icon}/>
                <div className={classes.NumberOfItem} style={{top: '30%', left: '65%'}}>
                    <span>{this.numberOfItemLovedtHandler(this.props.dishes)}</span>
                </div> */}
                <MdSecurity className={classes.Icon}/>
            </NavItem>
                
            {/* Log out */}
            {/* should create a component SignOut & redirect from sign-out to sign-in*/}
            <NavItem targetLink='/sign-in' type='Log Out' clicked={() => props.logout()}>
                {/* <BiShoppingBag className={classes.Icon}/>
                <div className={classes.NumberOfItem}>
                    <span>{this.numberOfItemAddedToCartHandler(this.props.cart)}</span>
                </div> */}
                <FiLogOut className={classes.Icons}/>
            </NavItem>
        </ul>
    )
}

export default withRouter(navItems);